interface pageData {
    title: string,
    date: string,
    permalink: string,
    content: string,
    matchCount: number,
    preview: string
}

interface match {
    start: number,
    end: number
}

const tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '…': '&hellip;'
};

function replaceHTMLEnt(str) {
    // false || any  返回any
    // true || any  返回true
    return str.replace(/[&<>"]/g, tagsToReplace[str] || str);
}

class Search {
    private data: pageData[];
    private input: HTMLInputElement;
    private list: HTMLDivElement;
    private resultTitle: HTMLHeadElement;
    private resultTitleTemplate: string;

    constructor({ input, list, resultTitle, resultTitleTemplate }) {
        this.input = input;
        this.list = list;
        this.resultTitle = resultTitle;
        this.resultTitleTemplate = resultTitleTemplate;

        // 初始化数据
        this.initData().then(r => {
            // 根据当前url后关键字进行搜索，并将关键字绑定到输入框
            this.handleQueryString();

            // 绑定页面前进后退时，进行搜索
            this.bindQueryStringChange();

            // 绑定input输入框输入时 进行搜索
            this.bindSearchForm();
        })
    }

    private static processMatches(str: string, matches: match[], ellipsis: boolean = true, charLimit = 140, offset = 20): string {
        // 按照start值从小到大排序
        matches.sort((a, b) => {
            return a.start - b.start;
        });

        let i = 0
        let lastIndex = 0
        let charCount = 0

        const resultArray: string[] = [];

        while (i < matches.length) {
            const item = matches[i];

            /// item.start >= lastIndex (只对第一次迭代是相等的)
            /// 因为后面有while循环，迭代变量j

            if (ellipsis && item.start - offset > lastIndex) {
                resultArray.push(`${replaceHTMLEnt(str.substring(lastIndex, lastIndex + offset))} [...] `);
                resultArray.push(`${replaceHTMLEnt(str.substring(item.start - offset, item.start))}`);
                charCount += offset * 2;
            } else {
                // 如果匹配太接近最后一个匹配的结尾，不要添加省略号
                resultArray.push(replaceHTMLEnt(str.substring(lastIndex, item.start)));
                charCount += item.start - lastIndex;
            }

            let j = i + 1
            let end = item.end

            /// Include as many matches as possible
            /// [item.start, end] is the range of the match
            while (j < matches.length && matches[j].start <= end) {
                end = Math.max(matches[j].end, end);
                ++j;
            }

            resultArray.push(`<mark>${replaceHTMLEnt(str.substring(item.start, end))}</mark>`);
            charCount += end - item.start;

            i = j;
            lastIndex = end;

            if (ellipsis && charCount > charLimit) break;
        }

        /// Add the rest of the string
        if (lastIndex < str.length) {
            let end = str.length;
            if (ellipsis) end = Math.min(end, lastIndex + offset);

            resultArray.push(`${replaceHTMLEnt(str.substring(lastIndex, end))}`);

            if (ellipsis && end != str.length) {
                resultArray.push(` [...]`);
            }
        }

        return resultArray.join('');
    }

    // 根据关键字搜索
    private async searchKeywords(keywords: string[]) {
        const rawData = await this.getData();
        const results: pageData[] = [];

        // 格式：new RegExp( 'key1|key2' ,'gi')  g:全局 i:大小写不敏感
        const regex = new RegExp(keywords.filter((v, index, arr) => {
            // 将特殊字符转义
            arr[index] = v.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
            return v.trim() !== '';
        }).join('|'), 'gi');

        for (const item of rawData) {
            const titleMatches: match[] = []
            const contentMatches: match[] = []

            let result = {
                ...item,
                preview: '',
                matchCount: 0
            }
            // matchAll 返回一个包含所有匹配正则表达式的结果及其分组捕获组的迭代器
            const contentMatchAll = item.content.matchAll(regex);
            const titleMatchAll = item.title.matchAll(regex);

            for (const match of contentMatchAll) {
                // 匹配的 startIndex -- > startIndex + keyword.length
                contentMatches.push({
                    start: match.index,
                    end: match.index + match[0].length
                });
            }

            for (const match of titleMatchAll) {
                titleMatches.push({
                    start: match.index,
                    end: match.index + match[0].length
                });
            }

            if (titleMatches.length > 0) {
                result.title = Search.processMatches(result.title, titleMatches, false)
            }

            if (contentMatches.length > 0) {
                result.preview = Search.processMatches(result.content, contentMatches);
            } else {
                result.preview = replaceHTMLEnt(result.content.substring(0, 140));
            }

            result.matchCount = titleMatches.length + contentMatches.length;
            if (result.matchCount > 0) results.push(result);
        }

        /// Result with more matches appears first
        return results.sort((a, b) => {
            return b.matchCount - a.matchCount;
        });
    }

    // 搜索
    private async doSearch(keywords: string[]) {
        // 返回精确到毫秒的时间戳
        const startTime = performance.now();

        const results = await this.searchKeywords(keywords);
        this.clear();

        for (const item of results) {
            this.list.append(Search.render(item));
        }

        const endTime = performance.now();

        this.resultTitle.innerText = this.generateResultTitle(results.length, ((endTime - startTime) / 1000).toPrecision(1));
    }

    // 将resultTitle中的对应字符串替换
    private generateResultTitle(resultLen, time) {
        return this.resultTitleTemplate.replace("#PAGES_COUNT", resultLen).replace("#TIME_SECONDS", time);
    }

    private async initData() {
        const jsonURL = this.input.dataset.json;
        this.data = await fetch(jsonURL).then(res => res.json());
        const parser = new DOMParser();
        for (const item of this.data) {
            item.content = parser.parseFromString(item.content, 'text/html').body.innerText;
        }
    }

    // 获取搜索的json文件
    public async getData() {
        if (!this.data) {

            const jsonURL = this.input.dataset.json;

            this.data = await fetch(jsonURL).then(res => res.json());
            const parser = new DOMParser();

            for (const item of this.data) {
                item.content = parser.parseFromString(item.content, 'text/html').body.innerText;
            }
        }

        return this.data;
    }

    private bindSearchForm() {
        let lastSearch = '';

        const eventHandler = (e) => {
            // 取消一个目标元素的默认行为
            e.preventDefault();
            const keywords = this.input.value.trim();

            Search.updateQueryString(keywords, true);

            if (keywords === '') {
                return this.clear();
            }

            if (lastSearch === keywords) return;
            lastSearch = keywords;

            // 根据空格拆分关键字
            this.doSearch(keywords.split(' '));
        }

        // 用户输入时触发
        this.input.addEventListener('input', eventHandler);
        // 中文输入法输入完成时触发
        // this.input.addEventListener('compositionend', eventHandler);
    }

    // 清除搜索结果内容
    private clear() {
        this.list.innerHTML = '';
        this.resultTitle.innerText = '';
    }

    private bindQueryStringChange() {
        window.addEventListener('popstate', (e) => {
            this.handleQueryString()
        })
    }

    private handleQueryString() {
        const keywords = new URLSearchParams(window.location.search).get("keyword");
        this.input.value = keywords;
        if (keywords) {
            this.doSearch(keywords.split(' '));
        } else {
            this.clear()
        }
    }

    // 更新页面url地址
    private static updateQueryString(keywords: string, replaceState = false) {
        const pageURL = new URL(window.location.toString());

        if (keywords === '') {
            pageURL.searchParams.delete('keyword')
        } else {
            pageURL.searchParams.set('keyword', keywords);
        }
        if (replaceState) {
            // replaceState()方法是将当前的历史记录给替换掉 不可返回
            // 状态对象、页面标题、可选url
            window.history.replaceState('', '', pageURL.toString());
        } else {
            // pushState()方法是在历史记录中增加一条新的记录 可返回
            window.history.pushState('', '', pageURL.toString());
        }
    }

    public static render(item: pageData) {
        let article = document.createElement('article')
        article.setAttribute("class","my-2 p-3")
        article.innerHTML = `<a href=${item.permalink}>
                                <div class="article-details">
                                    <h2 class="text-2xl ">${item.title}</h2>
                                    <section class="text-xl">${item.preview}</section>
                                </div>
                            </a>`
        return article
    }
}

declare global {
    interface Window {
        searchResultTitleTemplate: string;
    }
}

export const search = () => {
    const searchInput = document.querySelector('#searchInput') as HTMLInputElement
    const searchResultList = document.querySelector('#search-result-list') as HTMLDivElement
    const searchResultTitle = document.querySelector('#search-result-title') as HTMLHeadingElement
    if (searchInput && searchResultList && searchResultTitle){
        // setTimeout(fn,0)的含义是，指定某个任务在主线程最早可得的空闲时间执行，也就是说，尽可能早得执行
        setTimeout(function () {
            new Search({
                input: searchInput,
                list: searchResultList,
                resultTitle: searchResultTitle,
                resultTitleTemplate: window.searchResultTitleTemplate
            });
        }, 0);
    }
}