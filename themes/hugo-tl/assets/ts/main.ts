import {fun_top} from "./base";
import { setupScrollspy } from "./toc";

const  STACK={

    init:()=>{

        fun_top()

        const articleContent = document.querySelector('#content') as HTMLElement;
        if (articleContent) {
            setupScrollspy();
        }

    }

}

window.addEventListener('load', () => {
    STACK.init();
})





