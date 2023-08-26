import {appName} from "../common/Constant";

let rootEle:HTMLElement=document.getElementById(appName)

class Index{
    domEle:HTMLElement
    constructor({type,message}) {
        this.domEle = document.createElement('div')
        this.domEle.innerHTML = message
        this.setCssByType(type)
        rootEle.append(this.domEle)
    }
    setCssByType(type){
        let domStyle = this.domEle.style
        domStyle.position="fixed"
        domStyle.top = "15%"
        domStyle.left = "50%"
        domStyle.borderRadius = ".2em"
        domStyle.padding = "0.5em 1em"
        domStyle.width = "fit-content"
        domStyle.transform = "translate(-20%, -50%);"
        domStyle.backgroundColor = "rgba(127,114,246,0.55)"
        switch (type){
            case "success":
                break
        }
    }
}
const removeDom = (ele:HTMLElement) =>{
    setTimeout(()=>{
        ele.remove()
    },2000)
}
export default {
    success: (message: string)=> {
        let Message=new Index({type:'success',message})
        removeDom(Message.domEle)
    },
    warn:(message: String)=>{
        let Message=new Index({type:'success',message})
        removeDom(Message.domEle)
    },
    error:(message: String)=>{
        let Message=new Index({type:'success',message})
        removeDom(Message.domEle)
    }
}
