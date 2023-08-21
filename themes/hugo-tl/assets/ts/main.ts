import {fun_top,fun_copy,fun_collapse_code} from "./base";
import initToc from "./initToc";

const  STACK={

    init:()=>{
        fun_top()
        initToc()
        fun_copy()
        fun_collapse_code()
    }

}

window.addEventListener('load', () => {
    STACK.init();
})





