import React, { Children, cloneElement, useEffect, useRef,useState } from 'react'
import { createPortal } from 'react-dom';
import getTooltipPosition from '../util/getTooltipPosition'
import './index.css'

/**
 * children: 将 带有提示 的元素
 * position: top, right, bottom, left
 * gap: 间距
 * tooltipContent: 提示的样式组件
 * 在body外新增一个带有tooltipContent的div
 * 将tooltipContent的显隐事件控制放在children的事件中
 * 获取children的位置，设置tooltip的位置
 * tooltip组件卸载时
 */
export const Tooltip = ({children,position,gap,tooltipContent}) =>{
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

    useEffect(()=>{
        const el = childRef.current  //获取child
        if(!el) return;
        
        const handleMouseEnter = async(e) =>{
            e.preventDefault();
            //await重要，需要等待tooltip被渲染后才能得到tooltipRef，否则tooltipRef是undefined
            await setIsVisible(true)

            const tooltip = tooltipRef.current
            if(!tooltip) return

            const {left,top} = getTooltipPosition(el,tooltip,position,gap)
            tooltip.style.left = `${left}px`
            tooltip.style.top = `${top}px`
        }

        const handleMouseLeave = () =>{
            setIsVisible(false)
        }

        el.addEventListener('contextmenu',handleMouseEnter);
        el.addEventListener('click',handleMouseLeave);

        return () =>{
            el.removeEventListener('contextmenu',handleMouseEnter);
            el.removeEventListener('click',handleMouseLeave);
        }
    },[childRef.current,tooltipRef.current,position,gap])

    return <>
        {/* 新增ref的新child,用childRef标识该子元素 */}
        {cloneElement(child,{ref:setRef})}

        {/** React.createPortal 的方式，能让嵌套在 root 下的 jsx 子元素脱离出去 */}
        {isVisible && createPortal(
            <div ref={tooltipRef} className="tooltip">
                {tooltipContent}
            </div>,
            document.getElementsByTagName('body')[0]
        )}
    </>
}
