import {appName, messageOpacity} from "../common/Constant";

let rootEle:HTMLElement=document.getElementById(appName)

class Index{
    domEle:HTMLElement
    static messageContainer:HTMLElement
    constructor({type,message}) {
        // 创建消息容器
        if (!Index.messageContainer){
            Index.messageContainer=document.getElementById('messageContainer')
            Index.messageContainer = document.createElement('div')
            let style = Index.messageContainer.style
            style.position="fixed"
            style.top = "12%"
            style.left = "50%"
            rootEle.append(Index.messageContainer)
        }
        this.domEle = document.createElement('div')
        this.domEle.innerHTML = message
        this.domEle.setAttribute("class",'messageDom')
        this.setCssByType(type)
        Index.messageContainer.append(this.domEle)
    }
    setCssByType(type){
        let domStyle = this.domEle.style
        // domStyle.position="fixed"
        // domStyle.top = "15%"
        // domStyle.left = "50%"
        domStyle.borderRadius = ".2em"
        domStyle.padding = "0.5em 1em"
        domStyle.margin = ".5em auto"
        domStyle.width = "fit-content"
        domStyle.color = "#fff"
        domStyle.transform = "translate(-20%, -50%);"
        domStyle.transition='all .5s'
        domStyle.opacity = `${messageOpacity}`
        switch (type){
            case "success":
                // #139167
                domStyle.backgroundColor = `#18b681`
                break
            case "info":
                // #4670ba
                domStyle.backgroundColor = `#588ce9`
                break
            case "warn":
                // #cc8400
                domStyle.backgroundColor = `#ffa600`
                break
            case "error":
                // #cc452a
                domStyle.backgroundColor = `#ff5735`
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
