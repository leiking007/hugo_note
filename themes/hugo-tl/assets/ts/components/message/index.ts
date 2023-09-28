interface MessageConfig{
    type:'info'|'success'|'warning'|'error'
    content:string
    icon?:string
    destroy?:number
    close?:boolean
}
class Message{
    static info:Function;
    static success:Function;
    static warning:Function;
    static error:Function;

    constructor(config:MessageConfig) {
        let msgContainer:HTMLElement=this.getMsgContainer()

        let msgElement:HTMLElement=this.createMsgElement(config)

        msgContainer.append(msgElement)

        document.body.append(msgContainer)
    }

    createMsgElement(config: MessageConfig):HTMLElement {
        let msgElement:HTMLElement=document.createElement('div')
        let style:any={
            position:'relative',
            padding:'0.5em 1em',
            width:'fit-content',
            transition:'all .5s',
            marginTop:'.4em',
            border:'1px solid',
            borderRadius:'4px',
            boxShadow:'0 4px 10px 0 rgba(0,0,0,.15)',
            lineHeight:'1.5',
            fontSize:'1.25rem'
        }
        const icon:HTMLElement = document.createElement("i")
        let iconStyle:any={
            marginRight:'0.4em'
        }
        switch (config.type){
            case "info":
                style={
                    ...style,
                    borderColor:'#588ce9',
                    backgroundColor:'#edf4ff'
                }
                iconStyle={
                    ...iconStyle,
                    color:'#588ce9'
                }
                icon.setAttribute("class",config.icon || "bi bi-info-circle")
                break
            case "warning":
                style={
                    ...style,
                    borderColor:'#ffa600',
                    backgroundColor:'#fff7e8'
                }
                iconStyle={
                    ...iconStyle,
                    color:'#ffa600'
                }
                icon.setAttribute("class",config.icon ||"bi bi-exclamation-circle")
                break
            case "success":
                style={
                    ...style,
                    borderColor:'#18b681',
                    backgroundColor:'#eef9f5'
                }
                iconStyle={
                    ...iconStyle,
                    color:'#18b681'
                }
                icon.setAttribute("class",config.icon ||"bi bi-check-circle")
                break
            case "error":
                style={
                    ...style,
                    borderColor:'#ff5735',
                    backgroundColor:'#fff4f2'
                }
                iconStyle={
                    ...iconStyle,
                    color:'#ff5735'
                }
                icon.setAttribute("class",config.icon || "bi bi-x-circle")
                break
        }

        // 关闭按钮
        const close = document.createElement("i")
        close.setAttribute('class','bi bi-x')
        let closeStyle={
            color:'#999',
            fontSize: '1.25rem',
            fontWeight:'700',
            lineHeight:'1',
            outline:'none',
            marginLeft:'1.5rem',
            cursor:'pointer'
        }
        close.addEventListener("mouseover",()=>{
            close.style.color='#666'
            close.style.fontWeight='1200'
        })
        close.addEventListener("mouseout",()=>{
            close.style.color='#999'
            close.style.fontWeight='700'
        })
        close.addEventListener("click",()=>{
            msgElement.remove()
        })
        for (let key in style) {
            msgElement.style[key]=style[key]
        }
        for (let key in iconStyle) {
            icon.style[key]=iconStyle[key]
        }

        for (let key in closeStyle) {
            close.style[key]=closeStyle[key]
        }

        msgElement.append(icon)
        msgElement.append(config.content)
        if (config.close){
            msgElement.append(close)
        }
        setTimeout(()=>{
            msgElement.remove()
        },config.destroy || 3000)
        return msgElement
    }

    private getMsgContainer():HTMLElement {
        let msgContainer:HTMLElement=document.getElementById('messageContainer')
        if (!msgContainer){
            msgContainer = document.createElement('div')
            msgContainer.setAttribute("id","messageContainer")
            let style = {
                position:'fixed',
                top:'100px',
                left:'50%',
                transform:'translateX(-50%)'
            }
            for (let key in style) {
                msgContainer.style[key]=style[key]
            }
        }
        return msgContainer
    }
}
Message.info = (message:string)=>{
    new Message({
        type:"info",
        content:message,
        close:true
    })
}

Message.success = (message:string)=>{
    new Message({
        type:"success",
        content:message,
        close:true
    })
}

Message.warning = (message:string)=>{
    new Message({
        type:"warning",
        content:message,
        close:true
    })
}

Message.error = (message:string)=>{
    new Message({
        type:"error",
        content:message,
        close:true
    })
}
export default Message
