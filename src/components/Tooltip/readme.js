import React, { Children, cloneElement, useEffect, useRef,useState } from 'react'
import { createPortal } from 'react-dom';
import { getTooltipPosition,isN } from './util'
import './index.css'

/**
/** 带注释版说明
 * children: 将 带有提示 的元素
 * position: top, right, bottom, left
 * gap: 间距
 * tooltipContent: 提示的样式组件
 * pid :父元素
 * trigger: 触发事件 click、mouseenter、contextmenu...
 * closeEvent: 关闭触发事件 click、mouseenter、contextmenu...
 * open: 外部一同控制
 * setOpen: 控制open
 * 在body外新增一个带有tooltipContent的div
 * 将tooltipContent的显隐事件控制放在children的事件中
 * 获取children的位置，设置tooltip的位置
 */
export const Tooltip = ({
    children,
    position="top",
    gap=5,
    content="Text",
    trigger="contextmenu",
    closeEvent="click",
    pid = 'body',
    open = true,
    setOpen = ()=>{}
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
    }

    const closeTooltip = () =>{
        setIsVisible(false);
    }

    useEffect(()=>{
        const el = childRef.current 
        if(!el) return;

        el.addEventListener(trigger,e=>showTooltip(e,el));
        el.addEventListener(closeEvent,closeTooltip);
        // console.log('style',childRef.current,childRef.current? (childRef.current).getBoundingClientRect():'222')
        // console.log('222',(childRef.current)?.getBoundingClientRect().top)

        return () =>{
            el.removeEventListener(trigger,e=>showTooltip(e,el));
            el.removeEventListener(closeEvent,closeTooltip);
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
