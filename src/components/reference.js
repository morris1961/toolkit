import { useState } from 'react';
import { message, Radio, Button, Form } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { formItemLayout } from './formitems';
import Book from './book';
import Translation from './translation';
import Paper from './paper';
import Journal from './journal';
import { getBook, getJournal, getPaper, getTranslation } from '../utils';
import Result from './result';


function Footnote({ histories, setHistories }) {
  const [type, setType] = useState("book");
  const [note, setNote] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const onChange = (e) => {
    setType(e.target.value);
  }
  const onFinish = (values) => {
    console.log('Received values of form:', values);
    let p = "";
    switch (type) {
      case "book":
        p = getBook(values, "reference");
        break;
      case "translation":
        p = getTranslation(values, "reference");
        break;
      case "paper":
        p = getPaper(values, "reference");
        break;
      case "journal":
        p = getJournal(values, "reference");
        break;
      default:
        break;
    }
    messageApi.open({
      icon: <CheckCircleFilled style={{ color: "green", fontSize: 20 }} />,
      duration: 3,
      content: '參考書目已產生！點擊文字即可複製！',
      style: {
        fontSize: 20,
      },
    });
    setNote(p);
    setHistories([
      ...histories,
      { content: p }
    ]);
  };

  const getForm = (type) => {
    switch (type) {
      case "book":
        return <Book type={"reference"}></Book>;
      case "translation":
        return <Translation type={"reference"}></Translation>;
      case "paper":
        return <Paper type={"reference"}></Paper>;
      case "journal":
        return <Journal type={"reference"}></Journal>;
      default:
        return null;
    }
  }

  return (
    <div >
      {contextHolder}
      <Form
        name="reference_form"
        onFinish={onFinish}
        style={{ maxWidth: 1000 }}
        initialValues={{ contributors: [{}], }}
      >
        <Form.Item name="type" label="書類" {...formItemLayout} required={false} initialValue={"book"}>
          <Radio.Group size='large' onChange={onChange} >
            <Radio.Button value="book">專書</Radio.Button>
            <Radio.Button value="translation">譯著</Radio.Button>
            <Radio.Button value="paper">專書論文</Radio.Button>
            <Radio.Button value="journal">期刊論文</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {getForm(type)}
        <Form.Item style={{display:"flex", justifyContent:"center"}}>
          <Button size='large' type="primary" htmlType="submit">
            產生
          </Button>
        </Form.Item>
        <Result r={note}></Result>
      </Form>
    </div>
  );
}

export default Footnote;
