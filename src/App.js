import './App.css';
import { useState } from 'react';
import { Radio } from 'antd';
import Footnote from './components/footnote';
import Reference from './components/reference';
import Output from './components/output';


function App() {
  const [type, setType] = useState("footnote");
  const [histories, setHistories] = useState([]);
  const onChange = (e) => {
    setType(e.target.value);
  }
  return (
    <div>
        <h1 style={{display:"flex", justifyContent:"center", marginBottom:0}}>至堡（wen-burg）：註腳產生器</h1>
        <h2 style={{display:"flex", justifyContent:"center", marginTop:0}}>（新史學的格式）</h2>
        <Radio.Group size='large' style={{display:"flex", justifyContent:"center", marginBottom:24}} onChange={onChange} defaultValue="footnote">
          <Radio.Button value="footnote">註腳</Radio.Button>
          <Radio.Button value="reference">參考書目</Radio.Button>
        </Radio.Group>
      {type === "footnote" ?
       <Footnote histories={histories} setHistories={setHistories}></Footnote> :
       <Reference histories={histories} setHistories={setHistories}></Reference>}
      <Output histories={histories}></Output>
    </div>
  );
}

export default App;
