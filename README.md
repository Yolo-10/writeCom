## 手写组件
### Tooltip:提示文字框

使用案例如下：
```jsx
/**
 * position: top, right, bottom, left
 * gap: 间距
 * tooltipContent: 提示的样式组件
 * children: 将 带有提示 的元素
 */
 
<Tooltip gap={8} position="left" tooltipContent="Text">    
    <p className="example-block">Left</p>
</Tooltip>
```
