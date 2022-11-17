import {Tooltip} from './Tooltip'
import './style.css'
import { useRef } from 'react';



function App() {

  const myRef = useRef();

  return (
    <div className="container">
      <Tooltip gap={8} position="left" tooltipContent={<p>Component</p>} 
        trigger="contentMenu" closeEvent='click'>    
        <p className="example-block" ref={myRef} >Left</p>
      </Tooltip>
    </div>
  );
}

export default App;
