// scorll 返回顶部
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
    let copyBtnList:NodeList = document.querySelectorAll("[data-type=\"copy-btn\"]")
    copyBtnList.forEach(copyBtn=>{
        copyBtn.addEventListener("click",(e)=>{
            let highlightEle=copyBtn.parentElement.nextElementSibling
            let codeEle  = highlightEle.firstChild?.firstChild
            if (codeEle instanceof HTMLElement){
                let text = ''
                for (let child of codeEle.children) {
                    text+=child.lastElementChild.textContent
                }
                console.log(text)
            }
        })
    })
}

export {fun_top,fun_copy}