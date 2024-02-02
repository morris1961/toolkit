import { message } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

function Result({ r }) {
  const [messageApi, contextHolder] = message.useMessage();
  const copy = () => {
    navigator.clipboard.writeText(r);
    messageApi.open({
      icon: <CheckCircleFilled style={{ color: "green", fontSize: 20 }} />,
      duration: 0.5,
      // type: 'success',
      content: '已複製！',
      style: {
        fontSize: 20,
      },
    });
  }
  return (
    <>
      {contextHolder}
      <div style={{ display: "flex", justifyContent: "center" }} >
        <h1 onClick={copy}>{r}</h1>
      </div>

    </>
  );
}

export default Result;