// scorll 返回顶部
import message from "./components/message";

function fun_top(): void {
    let a: HTMLElement = document.getElementById("return-top")
    window.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop + document.body.scrollTop > 150) {
            a.style.display = "block";
        } else {
            a.style.display = "none";
        }
    })
    a.addEventListener("click", () => {
        window.scroll({top: 0, behavior: "smooth"})
        let toc = document.querySelector("#postTocOuter") as HTMLElement | undefined;
        if (!toc) {
            return;
        }
        toc.scrollTo({top: 0, behavior: "smooth"})
    })
}

function fun_copy(): void {
    let copyBtnList: NodeList = document.querySelectorAll("[data-type=\"copy-btn\"]")
    copyBtnList.forEach(copyBtn => {
        copyBtn.addEventListener("click", (e) => {
            let highlightEle = getTargetEle(copyBtn, 'highlight')
            let codeEle = highlightEle.firstChild?.firstChild
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
 * @param clasName
 */
function getTargetEle(curEle: Node, clasName: string): HTMLElement {
    let parEle = curEle.parentElement
    if (!parEle) {
        return null
    }
    for (let child of parEle.children) {
        if (child instanceof HTMLElement && child.classList.contains(clasName)) {
            return child
        }
    }
    return getTargetEle(parEle, clasName)
}

function fun_collapse_code(): void {
    let collapseBtnList: NodeList = document.querySelectorAll("[data-type=\"collapse-btn\"]")
    collapseBtnList.forEach(collapseBtn => {
        collapseBtn.addEventListener("click", (e) => {
            let highlightEle = getTargetEle(collapseBtn, 'highlight')
            if (highlightEle.classList.contains("hide")) {
                highlightEle.classList.remove("hide")
            } else {
                highlightEle.classList.add("hide")
            }
        })
    })
}

export {fun_top, fun_copy, fun_collapse_code}