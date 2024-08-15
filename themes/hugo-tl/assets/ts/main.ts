import {fun_collapse_code, fun_copy, fun_top, post_toc_init} from "./base";
import initToc from "./initToc";
import {search} from "./search";

const  STACK={

    init:()=>{
        fun_top()
        initToc()
        fun_copy()
        fun_collapse_code()
        search()
        post_toc_init()
    }

}

window.addEventListener('load', () => {
    STACK.init();
})





