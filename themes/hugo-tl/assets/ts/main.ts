import {fun_top,fun_copy,fun_collapse_code} from "./base";
import initToc from "./initToc";
import {search} from "./search";

const  STACK={

    init:()=>{
        fun_top()
        initToc()
        fun_copy()
        fun_collapse_code()
        search()
    }

}

window.addEventListener('load', () => {
    STACK.init();
})





