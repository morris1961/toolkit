import { Form, Input} from 'antd';
import { Contributors, formItemLayout } from './formitems';

function Newspaper() {
  return <>
    <Form.Item
      name="name"
      label="報紙名稱"
      {...formItemLayout}
      rules={[{ required: true, message: '請輸入報紙名稱' }]}
    >
      <Input placeholder="報紙名稱" />
    </Form.Item>
    <Form.Item
      name="title"
      label="標題"
      {...formItemLayout}
      rules={[{ required: true, message: '請輸入標題' }]}
    >
      <Input placeholder="標題" />
    </Form.Item>
    <Contributors author noAuthor></Contributors>
    <Form.Item
      name="place"
      label="出版地"
      {...formItemLayout}
      rules={[{ required: true, message: '請輸入出版地' }]}
    >
      <Input placeholder="出版地" />
    </Form.Item>
    <Form.Item
      name="publishDate"
      label="出版時間"
      {...formItemLayout}
      rules={[{ required: true, message: '請輸入時間（年月日）' }]}
    >
      <Input placeholder="出版時間" />
    </Form.Item>
    <Form.Item
      name="page"
      label="版頁"
      {...formItemLayout}
      rules={[{ required: true, message: '請輸入版頁' }]}
    >
      <Input placeholder="版頁" />
    </Form.Item>
  </>
}


export default Newspaper;