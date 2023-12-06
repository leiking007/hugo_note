// scorll 返回顶部
import message from "./components/message";

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
        console.log()
        if (toc && toc.offsetParent) {
            toc.scrollTo({top: 0, behavior: "smooth"})
        }
    })
}

function fun_copy(): void {
    let copyBtnList: NodeList = document.querySelectorAll("[data-type=\"copy-btn\"]")
    copyBtnList.forEach(copyBtn => {
        copyBtn.addEventListener("click", (e) => {
            let codeBlock = getTargetEle(copyBtn, 'code-block')
            let codeEle = codeBlock.firstElementChild?.firstElementChild?.firstElementChild
            if (codeEle instanceof HTMLElement) {
                let text = ''
                for (let child of codeEle.children) {
                    text += child.lastElementChild.textContent
                }
                try{
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
                }catch (e){
                    message.warning("暂不支持复制")
                }
            }
        })
    })
}

/**
 * 从兄弟节点，父节点，父节点的兄弟节点，返回第一个满足条件的元素
 * @param curEle
 * @param dataType
 */
function getTargetEle(curEle: Node, dataType: string): HTMLElement {
    let parEle = curEle.parentElement
    if (!parEle) {
        return null
    }
    for (let child of parEle.children) {
        if (child instanceof HTMLElement && child.getAttribute("data-type") ===dataType) {
            return child
        }
    }
    return getTargetEle(parEle, dataType)
}

function fun_collapse_code(): void {
    let collapseBtnList: NodeList = document.querySelectorAll("[data-type=\"collapse-btn-hidde\"]")
    collapseBtnList.forEach(collapseBtn => {
        collapseBtn.addEventListener("click", (e) => {
            if (collapseBtn instanceof HTMLElement){
                let highlightEle:HTMLElement = getTargetEle(collapseBtn, 'code-block')
                highlightEle.classList.add("hidden")
                collapseBtn.classList.add("hidden")
                collapseBtn.nextElementSibling.classList.remove("hidden")
            }
        })
    })
    collapseBtnList = document.querySelectorAll("[data-type=\"collapse-btn-open\"]")
    collapseBtnList.forEach(collapseBtn => {
        collapseBtn.addEventListener("click", (e) => {
            if (collapseBtn instanceof HTMLElement){
                let highlightEle:HTMLElement = getTargetEle(collapseBtn, 'code-block')
                highlightEle.classList.remove("hidden")
                collapseBtn.classList.add("hidden")
                collapseBtn.previousElementSibling.classList.remove("hidden")
            }
        })
    })
}

export {fun_top, fun_copy, fun_collapse_code}