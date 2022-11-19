import React,{useRef} from 'react'
import { Tooltip } from "../../components/Tooltip";
import './index.css'

export default function DemoTooltip() {
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  )

  return (
      <div className="container">
        <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>1</div>
        </Tooltip>
        <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>2</div>
        </Tooltip>
        <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>3</div>
        </Tooltip>
        <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>4</div>
        </Tooltip>
        <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>5</div>
        </Tooltip>
        <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>6</div>
        </Tooltip>
        <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>7</div>
        </Tooltip>
        <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>8</div>
        </Tooltip>
        <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>9</div>
        </Tooltip>
        <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>10</div>
        </Tooltip>
        <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>11</div>
        </Tooltip>
        <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>12</div>
        </Tooltip>
        <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>13</div>
        </Tooltip>
        <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>14</div>
        </Tooltip>
    </div>
  )
}

