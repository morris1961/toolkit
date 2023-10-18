import { Form, Input, InputNumber, Space } from 'antd';
import { formItemLayout } from './formitems';

function Website() {
  return <>
    <Form.Item
      name="title"
      label="網站名稱"
      {...formItemLayout}
      rules={[{ required: true, message: '請輸入網站名稱' }]}
    >
      <Input placeholder="網站名稱" />
    </Form.Item>
    <Form.Item
      name="URL"
      label="網址"
      {...formItemLayout}
      rules={[{ required: true, message: '請輸入網址' }]}
    >
      <Input placeholder="網址" />
    </Form.Item>
    <Form.Item
      {...formItemLayout}
      label="檢索時間"
      required={true}
    >
      <Space
        style={{
          display: 'flex',
        }}
        align="baseline"
      >
        <Form.Item
          name="year"
          rules={[{ required: true, message: '請輸入年' }]}
          noStyle
        >
          <InputNumber min={1} />
        </Form.Item>
        <span>年</span>
        <Form.Item
          name="month"
          rules={[{ required: true, message: '請輸入月' }]}
          noStyle
        >
          <InputNumber min={1} max={12} />
        </Form.Item>
        <span>月</span>
        <Form.Item
          name="day"
          rules={[{ required: true, message: '請輸入日' }]}
          noStyle
        >
          <InputNumber min={1} max={31} />
        </Form.Item>
        <span>日</span>
      </Space>
    </Form.Item>
  </>
}


export default Website;