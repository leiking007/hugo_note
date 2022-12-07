window.onscroll = function () {
    fun_top()
}

window.onload = function () {
    addSearchEvent()
}

// 返回顶部
function fun_top() {
    let a = document.getElementById("return-top")
    if (a) {
        if (document.documentElement.scrollTop + document.body.scrollTop > 100) {
            a.style.display = "block";
        }
        else {
            a.style.display = "none";
        }
    }
}

//搜索功能实现
function addSearchEvent() {
    document.getElementById("searchInput").addEventListener('keydown', (event) => {
        if (event.code === 'NumpadEnter' || event.code === 'Enter') {
            //执行搜索逻辑
            search()
        }
    })
}
// 主函数
function search() {
    clearPosts();
    var key = document.getElementById("searchInput").value;
    var postCount = 0;
    if (!key) {
        //直接返回
        return;
    }

    for (let i = 0; i < window.postsCount; i++) {
        let postTitle = window.arrPosts[i].title;
        let postPubDate = window.arrPosts[i].pubDate;
        let postPlain = window.arrPosts[i].plain;
        let link = window.arrPosts[i].link;

        if (postPlain.indexOf(key) > 1 || postTitle.indexOf(key) > 1) {
            let postMark = toMark(postPlain, key);
            postCount++;
            if (postMark) {
                addItem(postTitle, postPubDate, postMark, link);
            }
        }
    }
}

// 截取文字
function toMark(oPlain, key) {
    var kIdx = oPlain.indexOf(key);
    var kLen = key.length;
    var beginIdx = kIdx;
    var postMark_l = '';
    var postMark_r = oPlain.slice(kIdx + kLen, kIdx + kLen + 20);

    while ((beginIdx > 0) && (oPlain[beginIdx - 1] != ',') && (oPlain[beginIdx - 1] != '.') && (oPlain[beginIdx - 1] != '，') && (oPlain[beginIdx - 1] != '。')) {
        beginIdx -= 1;
        postMark_l = oPlain[beginIdx] + postMark_l;
    }

    if (postMark_l == key) {
        return;
    }
    return postMark_l + key + postMark_r;
}

// 向页面添加元素
function addItem(title, pubDate, mark, link) {
    let pHtml = `
    <a class="d-block w-100 p-1 mb-2 fw-light border-bottom" href="${link}">
        <div class="post-header">
            <h5>${title} <small>${pubDate}</small></h5>
        </div>
        <div class="text-body" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">${mark}</div>
    </a>`
    var div = document.createElement("div");
    div.innerHTML = pHtml;
    div.setAttribute("class", "post-root");
    document.getElementById("searchBody").appendChild(div);
}

// 初始化搜索框
function clearPosts() {
    document.getElementById("searchBody").innerHTML = '';
}



