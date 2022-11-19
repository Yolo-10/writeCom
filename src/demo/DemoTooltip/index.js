import React,{useRef, useState} from 'react'
import { Tooltip } from "../../components/Tooltip";
import './index.css'

export default function DemoTooltip() {
  const list = [0,1,2,3,4,5,6,7,8,9,10,11,12,13]
  const [sel,setSel] = useState(-1);

  const clickEvent = (i) =>{
    console.log('buttonClick')
    setSel(-1)
  }

  const itemClick = (i) =>{
    console.log('itemClick');
    setSel(-1)
  }

  const content = (i)=>{
    return (
    <div>
      <div style={{display:'inline'}}>{i}</div>
      <button onClick={()=>clickEvent(i)}>click</button>
    </div>)
  }

  return (
      <div className="container">
        {list.map((item,i)=>{
          return (
            <Tooltip position={(i==0 || i==1)? "bottom":"top"} content={content(i)} 
              pid={'.container'} key={i} open={sel==i} setOpen={()=>setSel(i)}>     
              <div className='item' onClick={()=>itemClick(i)}>{item}</div>
            </Tooltip>
          )
        })}
    </div>
  )
}

