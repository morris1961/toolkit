import './App.css';
import { useState } from 'react';
import { Radio } from 'antd';
import Footnote from './components/footnote';
import Reference from './components/reference';


function App() {
  const [type, setType] = useState("footnote");
  const onChange = (e) => {
    setType(e.target.value);
  }
  return (
    <div >
      <Radio.Group onChange={onChange} defaultValue="footnote">
        <Radio.Button value="footnote">註腳</Radio.Button>
        <Radio.Button value="reference">參考書目</Radio.Button>
      </Radio.Group>
      {type === "footnote" ? <Footnote></Footnote> : <Reference></Reference>}
    </div>
  );
}

export default App;
