import message from "./components/message";

// 手机端文章页菜单显示或隐藏
function post_toc_init():void {
    let container:HTMLElement = document.getElementById("smTableOfContentContainer");
    if (container){
        let title:HTMLElement=container.querySelector('[data-type="tableTitle"]')
        let tableDetail:HTMLElement=container.querySelector('[data-type="tableDetail"]')
        title.addEventListener("click",()=>{
            tableDetail.hidden=!tableDetail.hidden
        })
    }
}

// 回到顶部
function fun_top(): void {
    let a: HTMLElement = document.getElementById("return-top")
    const app = document.body
    window.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop + app.scrollTop > 150) {
            a.style.display = "block";
        } else {
            a.style.display = "none";
        }
    })
    a.addEventListener("click", () => {
        window.scroll({top: 0, behavior: "smooth"})
        let toc = document.querySelector("#postTocOuter") as HTMLElement
        if (!toc) {
            return;
        }
        toc.scrollTo({top: 0, behavior: "smooth"})
    })
}

// 代码 copy 按钮
function fun_copy(): void {
    let copyBtnList: NodeList = document.querySelectorAll("[data-type=\"copy-btn\"]")
    copyBtnList.forEach(copyBtn => {
        copyBtn.addEventListener("click", (e) => {
            let codeBlock = getTargetEle(copyBtn, 'highlight')
            let codeEle = codeBlock.firstElementChild?.firstElementChild
            if (codeEle instanceof HTMLElement) {
                let text = ''
                for (let child of codeEle.children) {
                    text += child.lastElementChild.textContent
                }
                try {
                    Promise.all([navigator.clipboard.writeText(text)])
                        .then(() => {
                            if (copyBtn instanceof HTMLElement) {
                                copyBtn.classList.add('bi-clipboard-check')
                                copyBtn.classList.remove('bi-clipboard')
                                setTimeout(() => {
                                    copyBtn.classList.add('bi-clipboard')
                                    copyBtn.classList.remove('bi-clipboard-check')
                                }, 1000)
                            }
                            message.success("复制成功")
                        })
                } catch (e) {
                    message.warning("暂不支持复制")
                }
            }
        })
    })
}

/**
 * 从兄弟节点，父节点，父节点的兄弟节点，返回第一个满足条件的元素
 * @param curEle
 * @param className
 */
function getTargetEle(curEle: Node, className: string): HTMLElement {
    let parEle = curEle.parentElement
    if (!parEle) {
        return null
    }
    for (let child of parEle.children) {
        if (child instanceof HTMLElement && child.classList.contains(className)) {
            return child
        }
    }
    return getTargetEle(parEle, className)
}

// 代码隐藏按钮
function fun_collapse_code(): void {
    let collapseBtnList: NodeList = document.querySelectorAll("[data-type=\"collapse-btn-hidde\"]")
    collapseBtnList.forEach(collapseBtn => {
        collapseBtn.addEventListener("click", (e) => {
            if (collapseBtn instanceof HTMLElement) {
                let highlightEle: HTMLElement = getTargetEle(collapseBtn, 'highlight')
                highlightEle.classList.add("hidden")
                collapseBtn.classList.add("hidden")
                collapseBtn.nextElementSibling.classList.remove("hidden")
            }
        })
    })
    collapseBtnList = document.querySelectorAll("[data-type=\"collapse-btn-open\"]")
    collapseBtnList.forEach(collapseBtn => {
        collapseBtn.addEventListener("click", (e) => {
            if (collapseBtn instanceof HTMLElement) {
                let highlightEle: HTMLElement = getTargetEle(collapseBtn, 'highlight')
                highlightEle.classList.remove("hidden")
                collapseBtn.classList.add("hidden")
                collapseBtn.previousElementSibling.classList.remove("hidden")
            }
        })
    })
}

export {fun_top, fun_copy, fun_collapse_code,post_toc_init}