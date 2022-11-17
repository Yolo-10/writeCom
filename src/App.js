import {Tooltip} from './Tooltip'
import './style.css'


function App() {
  return (
    <div className="container">
      <Tooltip gap={8} position="left" tooltipContent="Text">    
        <p className="example-block">Left</p>
      </Tooltip>
      <Tooltip gap={8} position="top" tooltipContent={<p>Component</p>}>
          <p className="example-block">Top</p>
      </Tooltip>
      <Tooltip gap={8} position="right" tooltipContent="Text">
          <p className="example-block">Right</p>
      </Tooltip>
      <Tooltip gap={8} position="bottom" tooltipContent={<p>Component</p>}>
          <p className="example-block">Bottom</p>
      </Tooltip>
    </div>
  );
}

export default App;
