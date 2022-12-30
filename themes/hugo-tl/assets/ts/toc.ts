// Implements a scroll spy system for the ToC, displaying the current section with an indicator and scrolling to it when needed.

// Inspired from https://gomakethings.com/debouncing-your-javascript-events/
function debounced(func: Function) {
    let timeout;
    return () => {
        if (timeout) {
            // 取消回调函数
            window.cancelAnimationFrame(timeout);
        }
        // 浏览器其实一直在刷新，当给window.requestAnimationFrame传入一个回调函数的时候
        // 那么就是告诉浏览器在渲染前执行一下这个回调函数
        timeout = window.requestAnimationFrame(() => func());
    }
}

const headersQuery = "#content h1[id], #content h2[id], #content h3[id], #content h4[id], #content h5[id], #content h6[id]";
const tocQuery = "#postTocOuter";
const tocLiQuery = "#postTocOuter li";
const activeClass = "toc-active";

function scrollToTocElement(tocElement: HTMLElement, scrollableNavigation: HTMLElement) {
    let textHeight = tocElement.querySelector("a").offsetHeight;
    let scrollTop = tocElement.offsetTop - scrollableNavigation.offsetHeight / 2 + textHeight / 2 - scrollableNavigation.offsetTop;
    if (scrollTop < 0) {
        scrollTop = 0;
    }
    // 平滑滚动
    scrollableNavigation.scrollTo({ top: scrollTop, behavior: "smooth" });
}

type IdToElementMap = { [key: string]: HTMLElement };

function buildIdToNavigationElementMap(navigation: NodeListOf<Element>): IdToElementMap {
    const sectionLinkRef: IdToElementMap = {};
    navigation.forEach((navigationElement: HTMLElement) => {
        const link = navigationElement.querySelector("a");
        const href = link.getAttribute("href");
        if (href.startsWith("#")) {
            sectionLinkRef[href.slice(1)] = navigationElement;
        }
    });
    return sectionLinkRef;
}

// 获取所有的文章标题到顶部的距离，并存入数组
function computeOffsets(headers: NodeListOf<Element>) {
    let sectionsOffsets = [];
    headers.forEach((header: HTMLElement) => { sectionsOffsets.push({ id: header.id, offset: header.offsetTop }) });
    sectionsOffsets.sort((a, b) => a.offset - b.offset);
    return sectionsOffsets;
}

function setupScrollspy() {
    // 查询文章标题
    let headers = document.querySelectorAll(headersQuery);
    if (!headers) {
        console.warn("No header matched query", headers);
        return;
    }

    // 查询目录整体
    let toc = document.querySelector(tocQuery) as HTMLElement | undefined;
    if (!toc) {
        console.warn("No toc matched query", tocQuery);
        return;
    }

    // 查询目录明细 li
    let tocLi = document.querySelectorAll(tocLiQuery);
    if (!tocLi) {
        console.warn("No navigation matched query", tocLiQuery);
        return;
    }

    let sectionsOffsets = computeOffsets(headers);

    let tocHovered: boolean = false;

    // 当鼠标移入 目录整体时 时触发
    toc.addEventListener("mouseenter", debounced(() => tocHovered = true));
    // 当鼠标移出 目录整体时 时触发
    toc.addEventListener("mouseleave", debounced(() => tocHovered = false));

    let activeSectionLink: Element;

    // 目录明细map构建
    let tocElementMap: IdToElementMap = buildIdToNavigationElementMap(tocLi);

    function scrollHandler() {
        let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

        let newActiveSection: HTMLElement | undefined;

        sectionsOffsets.forEach((section) => {
            if (scrollPosition >= section.offset - 100) {
                newActiveSection = document.getElementById(section.id);
            }
        });

        let newActiveSectionLink: HTMLElement | undefined
        if (newActiveSection) {
            newActiveSectionLink = tocElementMap[newActiveSection.id];
        }

        if (newActiveSection && !newActiveSectionLink) {
            console.debug("No link found for section", newActiveSection);
        } else if (newActiveSectionLink !== activeSectionLink) {
            if (activeSectionLink)
                activeSectionLink.classList.remove(activeClass);
            if (newActiveSectionLink) {
                newActiveSectionLink.classList.add(activeClass);
                if (!tocHovered) {
                    scrollToTocElement(newActiveSectionLink, toc);
                }
            }
            activeSectionLink = newActiveSectionLink;
        }
    }

    window.addEventListener("scroll", debounced(scrollHandler));
    
    // Resizing may cause the offset values to change: recompute them.
    function resizeHandler() {
        sectionsOffsets = computeOffsets(headers);
        scrollHandler();
    }

    window.addEventListener("resize", debounced(resizeHandler));
}

export { setupScrollspy };