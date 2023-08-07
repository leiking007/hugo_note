import {fun_top} from "./base";
import initToc from "./initToc";

const  STACK={

    init:()=>{

        fun_top()
        initToc()
    }

}

window.addEventListener('load', () => {
    STACK.init();
})





