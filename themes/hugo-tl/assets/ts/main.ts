import {fun_top,fun_copy} from "./base";
import initToc from "./initToc";

const  STACK={

    init:()=>{
        fun_top()
        initToc()
        fun_copy()
    }

}

window.addEventListener('load', () => {
    STACK.init();
})





