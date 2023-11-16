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
    <div>
        <h1 style={{display:"flex", justifyContent:"center", marginBottom:24}}>文獻格式產生器</h1>
        <Radio.Group style={{display:"flex", justifyContent:"center", marginBottom:24}} onChange={onChange} defaultValue="footnote">
          <Radio.Button value="footnote">註腳</Radio.Button>
          <Radio.Button value="reference">參考書目</Radio.Button>
        </Radio.Group>
      {type === "footnote" ? <Footnote></Footnote> : <Reference></Reference>}
    </div>
  );
}

export default App;
