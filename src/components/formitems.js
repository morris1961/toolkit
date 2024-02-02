import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Select, Radio, InputNumber } from 'antd';
const { Option } = Select;


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
  marginbottom: 8,
};

function Title() {
  return (
    <Form.Item
      name="title"
      label="標題"
      {...formItemLayout}
      rules={[{ required: true, message: '請輸入標題' }]}
    >
      <Input style={{ maxWidth: 500 }} placeholder="標題" />
    </Form.Item>
  )
}

function Contributors({ author, translator, editor, author2, noAuthor }) {
  return (
    <Form.List name="contributors" >
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }, index) => (
            <Form.Item
              {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
              label={index === 0 ? '貢獻者' : ''}
              required={true}
              key={key}
            >
              <Space
                key={key}
                style={{
                  display: 'flex',
                }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'type']}
                  initialValue={"author"}
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: '請選擇貢獻者',
                    },
                  ]}
                >
                  <Select style={{
                    width: 120,
                  }}>
                    {author ? <Option value="author">作者</Option> : null}
                    {translator ? <Option value="translator">譯者</Option> : null}
                    {editor ? <Option value="editor">編輯</Option> : null}
                    {author2 ? <Option value="author2">篇章作者</Option> : null}
                  </Select>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'name']}
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: '請輸入名字',
                    },
                  ]}
                >
                  <Input placeholder="名字" />
                </Form.Item>
                {fields.length > 1 || noAuthor ? (
                  <MinusCircleOutlined
                    // className="dynamic-delete-button"
                    onClick={() => remove(name)}
                  />
                ) : null}
                {index === 0 ? <span>（包含作者、譯者、編者，順序任意）</span> : ""}
              </Space>
            </Form.Item>
          ))}
          <Form.Item
            {...formItemLayoutWithOutLabel}
          >
            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
              加入新貢獻者
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  )
}

Contributors.defaultProps = {
  author: false,
  translator: false,
  editor: false,
  author2: false,
  noAuthor: false,
}

function Publisher() {
  return (
    <Form.Item
      {...formItemLayout}
      label="出版"
      required={true}
    >
      <Space
        style={{
          display: 'flex',
        }}
        align="baseline"
      >
        <Form.Item
          name="publisher"
          rules={[{ required: true, message: '請輸入出版社' }]}
          noStyle
        >
          <Input placeholder="出版社" />
        </Form.Item>
        <span style={{ fontSize: "16px" }} >：</span>
        <Form.Item
          name="place"
          rules={[{ required: true, message: '請輸入出版地' }]}
          noStyle
        >
          <Input placeholder="出版地" />
        </Form.Item>
      </Space>
    </Form.Item>
  )
}

function PublishDate({ type }) {
  return (
    <Form.Item
      name="publishDate"
      label={type === "thesis" ? "畢業年份" : "出版日期（西元年）"}
      rules={[{ required: true, message: type === "thesis" ? "請輸入畢業年份" : "請輸入出版日期" }]}
      {...formItemLayout}>
      <InputNumber min={1} />
    </Form.Item>
  )
}

function Pages() {
  return (
    <Form.Item
      {...formItemLayout}
      label="頁碼"
      required={true}
    >
      <Space
        style={{
          display: 'flex',
        }}
        align="baseline"
      >
        <Form.Item
          name="page1"
          rules={[{ required: true, message: '請輸入起始頁碼' }]}
          noStyle
        >
          <InputNumber min={1} />
        </Form.Item>
        <span style={{ fontSize: "16px" }} >-</span>
        <Form.Item
          name="page2"
          rules={[{ required: true, message: '請輸入結束頁碼' }]}
          noStyle>
          <InputNumber min={1} />
        </Form.Item>
      </Space>
    </Form.Item>
  )
}

function Paragraph() {
  return (
    <Form.Item
      {...formItemLayout}
      label="篇名"
      required={true}
    >
      <Space
        style={{
          display: 'flex',
        }}
        align="baseline"
      >
        <Form.Item
          name="paraNum"
          rules={[{ required: true, message: '請輸入第幾章' }]}
          noStyle
        >
          <Input placeholder='第幾章' />
        </Form.Item>
        <Form.Item
          name="paraName"
          rules={[{ required: true, message: '請輸入篇名' }]}
          noStyle>
          <Input placeholder='篇名' />
        </Form.Item>
      </Space>
    </Form.Item>
  )
}

function Family() {
  return (
    <Form.Item name="family" label="是否收入氏著" {...formItemLayout} required={true} initialValue={true}>
      <Radio.Group size='large'>
        <Radio.Button value={true}>是</Radio.Button>
        <Radio.Button value={false}>否</Radio.Button>
      </Radio.Group>
    </Form.Item>
  )
}

function JournalInfo() {
  return (
    <Form.Item
      {...formItemLayout}
      label="期刊資訊"
      required={true}
    >
      <Space
        style={{
          display: 'flex',
        }}
        align="baseline"
      >
        <Form.Item
          name="journalName"
          rules={[{ required: true, message: '請輸入期刊名' }]}
          noStyle
        >
          <Input placeholder='期刊名' />
        </Form.Item>
        <Form.Item
          name="journalVolume"
          rules={[{ required: true, message: '請輸入卷號' }]}
          noStyle
        >
          <Input placeholder='卷號' />
        </Form.Item>
        <Form.Item
          name="journalIssue"
          rules={[{ required: true, message: '請輸入篇期號' }]}
          noStyle>
          <Input placeholder='期號' />
        </Form.Item>
      </Space>
    </Form.Item>
  )
}

function Source({ type }) {
  return (
    <Form.Item
      name="source"
      label={type === "file" ? "館藏地" : "來源"}
      {...formItemLayout}
      rules={[{ required: true, message: type === "file" ? "請輸入館藏地" : '請輸入學校系所碩/博士論文' }]}
    >
      <Input placeholder={type === "file" ? "館藏地" : '學校系所碩/博士論文'} />
    </Form.Item>
  )
}

function Collection() {
  return (
    <Form.Item
      name="collection"
      label="叢書名"
      {...formItemLayout}
    // rules={[{ required: true, message: '請輸入叢書名' }]}
    >
      <Input placeholder="叢書名" />
    </Form.Item>
  )
}

function VolumeNum() {
  return (
    <Form.Item
      name="volumeNum"
      label="冊數"
      {...formItemLayout}
    // rules={[{ required: true, message: "請輸入冊數" }]}
    >
      <Input placeholder='冊數' />
    </Form.Item>
  )
}

function HistoryInfo() {
  return (
    <Form.Item
      {...formItemLayout}
      label="史料資訊"
      required={true}
    >
      <Space
        style={{
          display: 'flex',
        }}
        align="baseline"
      >
        <Form.Item
          name="historyVersion"
          rules={[{ required: true, message: '請輸入版本' }]}
          noStyle
        >
          <Input placeholder='版本' />
        </Form.Item>
        <Form.Item
          name="historyRoll"
          rules={[{ required: true, message: '請輸入卷數' }]}
          noStyle>
          <Input placeholder='卷數' />
        </Form.Item>
        <Form.Item
          name="historyParaName"
          rules={[{ required: true, message: '請輸入篇名' }]}
          noStyle>
          <Input placeholder='篇名' />
        </Form.Item>
      </Space>
    </Form.Item>
  )
}


export {
  formItemLayout,
  Title,
  Contributors,
  Publisher,
  PublishDate,
  Pages,
  Paragraph,
  Family,
  JournalInfo,
  Source,
  Collection,
  VolumeNum,
  HistoryInfo,
}