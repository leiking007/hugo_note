import {appName, messageOpacity} from "../common/Constant";

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
        switch (type){
            case "success":
                domStyle.backgroundColor = `rgba(25,135,84,${messageOpacity})`
                break
            case "info":
                domStyle.backgroundColor = `rgba(13,202,240,${messageOpacity})`
                break
            case "warn":
                domStyle.backgroundColor = `rgba(255,193,7,${messageOpacity})`
                break
            case "error":
                domStyle.backgroundColor = `rgba(220,53,69,${messageOpacity})`
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
    info: (message: string)=> {
        let Message=new Index({type:'info',message})
        removeDom(Message.domEle)
    },
    warn:(message: String)=>{
        let Message=new Index({type:'warn',message})
        removeDom(Message.domEle)
    },
    error:(message: String)=>{
        let Message=new Index({type:'error',message})
        removeDom(Message.domEle)
    }
}
