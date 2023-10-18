import { useState } from 'react';
import { Radio, Button, Form } from 'antd';
import { formItemLayout } from './formitems';
import Book from './book';
import Translation from './translation';
import Chapter from './chapter';
import Paper from './paper';
import Journal from './journal';
import Review from './review';
import Thesis from './thesis';
import History from './history';
import File from './file';
import Newspaper from './newspaper';
import Website from './website';
import { getBook, getChapter, getFile, getHistory, getJournal, getNewspaper, getPaper, getReview, getThesis, getTranslation, getWebsite } from '../utils';


function Footnote() {
  const [type, setType] = useState("book");
  const [note, setNote] = useState("")

  const onChange = (e) => {
    setType(e.target.value);
  }
  const onFinish = (values) => {
    console.log('Received values of form:', values);
    let p = "";
    switch (type) {
      case "book":
        p = getBook(values);
        break;
      case "translation":
        p = getTranslation(values);
        break;
      case "chapter":
        p = getChapter(values);
        break;
      case "paper":
        p = getPaper(values);
        break;
      case "journal":
        p = getJournal(values);
        break;
      case "review":
        p = getReview(values);
        break;
      case "thesis":
        p = getThesis(values)
        break;
      case "history":
        p = getHistory(values)
        break;
      case "file":
        p = getFile(values);
        break;
      case "newspaper":
        p = getNewspaper(values);
        break;
      case "website":
        p = getWebsite(values);
        break;
      default:
        break;
      // return null;
    }
    setNote(p);
  };

  const getForm = (type) => {
    switch (type) {
      case "book":
        return <Book></Book>;
      case "translation":
        return <Translation></Translation>;
      case "chapter":
        return <Chapter></Chapter>;
      case "paper":
        return <Paper></Paper>;
      case "journal":
        return <Journal></Journal>;
      case "review":
        return <Review></Review>;
      case "thesis":
        return <Thesis></Thesis>;
      case "history":
        return <History></History>
      case "file":
        return <File></File>;
      case "newspaper":
        return <Newspaper></Newspaper>;
      case "website":
        return <Website></Website>;
      default:
        return null;
    }
  }

  return (
    <div >
      <Form
        name="footnote_form"
        onFinish={onFinish}
        style={{ maxWidth: 1000 }}
        initialValues={{ contributors: [{}], }}
      >
        <Form.Item name="type" label="書類" {...formItemLayout} required={false} initialValue={"book"}>
          <Radio.Group onChange={onChange} >
            <Radio.Button value="book">專書</Radio.Button>
            <Radio.Button value="translation">譯著</Radio.Button>
            <Radio.Button value="chapter">書中篇章</Radio.Button>
            <Radio.Button value="paper">專書論文</Radio.Button>
            <Radio.Button value="journal">期刊論文</Radio.Button>
            <Radio.Button value="review">書評</Radio.Button>
            <Radio.Button value="thesis">學位論文</Radio.Button>
            <Radio.Button value="history">史料</Radio.Button>
            <Radio.Button value="file">檔案</Radio.Button>
            <Radio.Button value="newspaper">報紙</Radio.Button>
            <Radio.Button value="website">網頁</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {getForm(type)}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <h1>{note}</h1>
    </div>
  );
}

export default Footnote;
