/**
 * Table of Content
 */
function createTocObserver() {
    const headings = document.querySelectorAll("article h1[id], article h2[id], article h3[id], article h4[id], article h5[id], article h6[id]")
    const setCurrentActive = () => {
        const allActive = document.querySelectorAll(`#TableOfContents .active`)
        if (allActive.length === 0) {
            return
        } else {
            // let r=a?.b 等同于 let r=a && a.b
            document.querySelector(`#TableOfContents .current`)?.classList.remove('current');
            document.querySelectorAll(`#TableOfContents .active`)[0]?.classList.add('current')
        }
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
        // time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
        // target：被观察的目标元素，是一个 DOM 节点对象
        // rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回null
        // boundingClientRect：目标元素的矩形区域的信息
        // intersectionRect：目标元素与视口（或根元素）的交叉区域的信息
        // intersectionRatio：目标元素的可见比例，即intersectionRect占boundingClientRect的比例，完全可见时为1，完全不可见时小于等于0
            const id = entry.target.getAttribute('id');
            if (entry.intersectionRatio > 0) {
                let activeElement:HTMLElement = document.querySelector(`#TableOfContents li a[href="#${id}"]`)
                activeElement.parentElement.classList.add('active');
            } else {
                document.querySelector(`#TableOfContents li a[href="#${id}"]`).parentElement.classList.remove('active');
            }
            setCurrentActive()
        });
    })

    // Track all sections that have an `id` applied
    headings.forEach((section) => {
        observer.observe(section);
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
