import {fun_top} from "./base";
import { setupScrollspy } from "./toc";

const  STACK={

    init:()=>{
        fun_top()
        setupScrollspy()
    }

}

window.addEventListener('load', () => {
    STACK.init();
})





