import {Tooltip} from './Tooltip'
import './style.css'
import { useRef } from 'react';



function App() {

  const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
  )

  const showPosition =(e)=>{
    const first =e.nativeEvent.target.children[0];
    console.log('pos',first.getBoundingClientRect())
  }

  return (
    <div className="container" onScroll={showPosition} >
      <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>1</div>
      </Tooltip>
      <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>1</div>
      </Tooltip>
      <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>1</div>
      </Tooltip>
      <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>1</div>
      </Tooltip>
      <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>1</div>
      </Tooltip>
      <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>1</div>
      </Tooltip>
      <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>1</div>
      </Tooltip>
      <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>1</div>
      </Tooltip>
      <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>1</div>
      </Tooltip>
      <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>1</div>
      </Tooltip>
      <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>1</div>
      </Tooltip>
      <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>1</div>
      </Tooltip>
      <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>1</div>
      </Tooltip>
      <Tooltip position="top" tooltipContent={content} pid={'.container'}>    
        <div className='item'>1</div>
      </Tooltip>
    </div>
  );
}

export default App;
