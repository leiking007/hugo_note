/**
 * Table of Content
 */
function createTocObserver() {
    const headings = document.querySelectorAll("article h1[id], article h2[id], article h3[id], article h4[id], article h5[id], article h6[id]")
    let timer
    window.addEventListener("scroll",()=>{
        if (timer){
            clearTimeout(timer)
        }
        timer=setTimeout(()=>{
            // 滚动条到顶部距离
            let windowScrollY = window.scrollY+80;

            // 判断高亮哪一个目录
            let target:HTMLElement
            let min:number= 999999999
            headings.forEach(item=>{
                if (item instanceof HTMLElement){
                    let diff:number=Math.abs(item.offsetTop - windowScrollY)
                    if ( diff < Math.abs(min)){
                        min=diff
                        target=item
                    }
                }
            })
            console.log(target)
            headings.forEach(item=>{
                const id:string= item.getAttribute("id")
                let tocEle:HTMLElement=document.querySelector(`#postTocOuter li a[href="#${id}"]`)
                if (tocEle && target){
                    if (target.getAttribute("id")===id){
                        tocEle.parentElement.classList.add('toc-active');
                    }else {
                        tocEle.parentElement.classList.remove('toc-active');
                    }
                }
            })
        },200)
    })
}

const initToc = () => {
    const tocContainer = document.getElementById('postTocOuter');
    if (tocContainer !== null) {
        const toc = document.getElementById('TableOfContents');
        if (toc === null) {
            // if global config 'toc = true', but there are no headings
            tocContainer.parentNode.removeChild(tocContainer);
        } else {
            createTocObserver();
        }
    }
}

export default initToc
