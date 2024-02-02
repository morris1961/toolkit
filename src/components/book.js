import { useState } from 'react';
import { Radio, Form } from 'antd';
import { formItemLayout, Title, Contributors, Publisher, PublishDate, Pages } from './formitems';

function Book({ type }) {
  const [isFirst, setIsFirst] = useState(true);
  const ret_footnote = <>
    <Form.Item name="isFirst" label="引用次數" {...formItemLayout} required={true} initialValue={true}>
      <Radio.Group size='large' onChange={(e) => setIsFirst(e.target.value)}>
        <Radio.Button value={true}>首次</Radio.Button>
        <Radio.Button value={false}>二次以上</Radio.Button>
      </Radio.Group>
    </Form.Item>
    {
      isFirst ?
        <>
          <Title></Title>
          <Contributors author translator editor></Contributors>
          <Publisher></Publisher>
          <PublishDate></PublishDate>
          <Pages></Pages>
        </>
        :
        <>
          <Title></Title>
          <Contributors author></Contributors>
          <Pages></Pages>
        </>
    }
  </>;
  const ret_reference = <>
    <Title></Title>
    <Contributors author></Contributors>
    <Publisher></Publisher>
    <PublishDate></PublishDate>
  </>;

  return <>
    {
      type === "reference" ?
        ret_reference :
        ret_footnote
    }
  </>;

}


export default Book;