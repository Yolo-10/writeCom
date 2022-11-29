import React, { Children, cloneElement, useEffect, useRef,useState } from 'react'
import { createPortal } from 'react-dom';
import { getTooltipPosition,isN } from './util'
import './index.css'

/**
/** 带注释版说明
 * children: 将 带有提示 的元素
 * pid :父元素
 * position: top, right, bottom, left
 * content: 提示的样式组件
 * trigger: 触发事件 click、mouseenter、contextmenu...
 * closeEvent: 关闭触发事件 click、mouseenter、contextmenu...
 * enterable：鼠标是否能够进入content内,content的mouseenter|mouseleave事件也能控制tooltip的显隐
 * open: 外部传入，能与isVisible一同控制tooltip的显示
 * setOpen: 外部函数指针，能控制open
 * gap: 间距
 * timeout: 关闭tooltip的延迟时间毫秒数
 * 在body外新增一个带有tooltipContent的div
 * 将tooltipContent的显隐事件控制放在children的事件中
 * 获取children的位置，设置tooltip的位置
 */
export const Tooltip = ({
    children,
    pid='body',
    position="top",
    content="Text",
    trigger="contextmenu",
    closeEvent="click",
    enterable=false,
    open = false,
    setOpen = ()=>{},
    gap = 8,
    timeout = 15000,
}) =>{
    //Children.onLy(children)保证children中只有一个React element child,不是则报错
    const child = Children.only(children)
    const childRef = useRef()
    const tooltipRef = useRef();
    const [isVisible, setIsVisible] = useState(false);

    const setRef = (el) =>{
        //el就是child
        childRef.current = el
        // console.log('ref',childRef); //ref {current: p.example-block}

        //本已经有ref了
        const {ref} = child
        if(ref){
            ref.current = el 
        }
    }

    const showTooltip = async(e,el) =>{
        e.preventDefault();
        //await重要，需要等待tooltip被渲染后才能得到tooltipRef，否则tooltipRef是undefined
        await setIsVisible(true)
        //visible与open同时更改，一同控制
        setOpen();

        const tooltip = tooltipRef.current
        if(!tooltip) return

        const {left,top} = getTooltipPosition(el,tooltip,document.querySelector(pid),position,gap)
        tooltip.style.left = `${left}px`
        tooltip.style.top = `${top}px`

        //tooltip的移入显示、移出消失事件
        if(enterable){
            //用tooltip身上的一个属性enterable标志移入移出
            tooltip.addEventListener('mouseenter',()=>tooltip.enterable=1);
            tooltip.addEventListener('mouseleave',()=>{
              tooltip.enterable=0;
              closeTooltip()
            })
          }
    }

    const closeTooltip = () =>{
        //tooltip身上的事件不设置---tooltipRef.current.enterable == undefined   false
        //tooltip身上的事件设置-----tooltipRef.current.enterable == 0           false
        if(tooltipRef.current && !tooltipRef.current.enterable){
        //   console.log('close')
          setTimeout(()=>setIsVisible(false),timeout);
        }
    }

    useEffect(()=>{
        const el = childRef.current 
        if(!el) return;

        const handleTrigger = (e) => {
            showTooltip(e,el)
        }
        const handleCloseEvent = (e) =>{
            setTimeout(()=>closeTooltip(e),0)
        }

        //需要声明处理函数，在addEventListener、removeEventListener中再调用
        //这样才能保证是同一个内存地址，不然移除的不是对应增加的那个
        el.addEventListener(trigger,handleTrigger);
        el.addEventListener(closeEvent,handleCloseEvent);

        return () =>{
            el.removeEventListener(trigger,handleTrigger);
            el.removeEventListener(closeEvent,handleCloseEvent);
        }
    },[childRef.current,tooltipRef.current,position,gap])

    //visible与open同时更改，一同控制
    useEffect(()=>{
        setIsVisible(open);
    },[open])

    return <>
        {/** React.cloneElement()
         * 第一个参数接收一个ReactElement
         * 第二个参数接收旧元素的props、key、ref,可以添加
         * 第三个参数是props.children，不指定默认展示我们调用时添加的子元素,指定则会覆盖原有的*/}
        {/** 此处获取child, 并设置ref标识一下 */}
        {cloneElement(child,{ref:setRef})}

        {/** React.createPortal() 的方式，能让嵌套在 root 下的 jsx 子元素脱离出去 */}
        {isVisible && createPortal(
            <div ref={tooltipRef} className="tooltip">
                <div>{content}</div>
                <span></span>
            </div>,
            //加在父元素下面
            document.querySelector(pid)
        )}
    </>
}
