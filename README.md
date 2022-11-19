## 手写组件
### Tooltip:提示文字框

使用案例如下：
```jsx
/**
 * position: top(默认), right, bottom, left
 * gap: 间距(默认0)
 * tooltipContent: 提示的样式组件(默认"Text")
 * children: 将 带有提示 的元素
 * pid: 父元素(默认body)
 * trigger: 触发事件 click、mouseenter、contextmenu(默认)...
 * closeEvent: 关闭触发事件 click(默认)、mouseenter、contextmenu...
 * open: 外部一同控制(默认false)
 * setOpen: 控制open的事件(默认空)
 */
 
<Tooltip pid={'.container'}>     
    <div className='left'>Left</div>
</Tooltip>
```
