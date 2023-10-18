import { useState } from 'react';
import { Radio, Form } from 'antd';
import { formItemLayout, Title, Contributors, Publisher, PublishDate, Pages, Family, Paragraph } from './formitems';

function Paper() {
  const [isFirst, setIsFirst] = useState(true);
  return <>
    <Form.Item name="isFirst" label="引用次數" {...formItemLayout} required={true} initialValue={true}>
      <Radio.Group onChange={(e) => setIsFirst(e.target.value)} >
        <Radio.Button value={true}>首次</Radio.Button>
        <Radio.Button value={false}>二次以上</Radio.Button>
      </Radio.Group>
    </Form.Item>
    {isFirst ?
      <>
        <Title></Title>
        <Family></Family>
        <Contributors author translator ></Contributors>
        <Paragraph></Paragraph>
        <Publisher></Publisher>
        <PublishDate></PublishDate>
        <Pages></Pages>
      </>
      :
      <>
        <Title></Title>
        <Family></Family>
        <Contributors author ></Contributors>
        <Pages></Pages>
      </>}
  </>

}


export default Paper;