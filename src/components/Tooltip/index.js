import React, { Children, cloneElement, useEffect, useRef,useState } from 'react'
import { createPortal } from 'react-dom';
import { getTooltipPosition,isN } from './util'
import './index.css'

/**
 * children: 将 带有提示 的元素
 * position: top, right, bottom, left
 * gap: 间距
 * tooltipContent: 提示的样式组件
 * pid :父元素
 * trigger: 触发事件 click、mouseenter、contextmenu...
 * closeEvent: 关闭触发事件 click、mouseenter、contextmenu...
 */
export const Tooltip = ({
    children,
    position="top",
    gap=5,
    tooltipContent="Text",
    trigger="contextmenu",
    closeEvent="click",
    pid = 'body'
}) =>{
    const child = Children.only(children)
    const childRef = useRef()
    const tooltipRef = useRef();
    const [isVisible, setIsVisible] = useState(false);

    const setRef = (el) =>{
        childRef.current = el
        const {ref} = child
        if(ref){
            ref.current = el 
        }
    }

    const showTooltip = async(e,el) =>{
        e.preventDefault();
        await setIsVisible(true)

        const tooltip = tooltipRef.current
        if(!tooltip) return

        const {left,top} = getTooltipPosition(el,tooltip,position,gap)
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

        return () =>{
            el.removeEventListener(trigger,e=>showTooltip(e,el));
            el.removeEventListener(closeEvent,closeTooltip);
        }
    },[childRef.current,tooltipRef.current,position,gap])

    return <>
        {cloneElement(child,{ref:setRef})}

        {isVisible && createPortal(
            <div ref={tooltipRef} className="tooltip">
                <div>{tooltipContent}</div>
                <span></span>
            </div>,
            document.querySelector(pid)
        )}
    </>
}
