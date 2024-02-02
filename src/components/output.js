import { Button, message, Table } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';



/**
 * @param {Array} histories
 */
function Output({ histories }) {
  const [messageApi, contextHolder] = message.useMessage();

  const columns = [
    {
      title: <div>
        <span>歷史紀錄</span>
        <Button size="middle" type="primary" onClick={exportHistories}>
          下載
        </Button>
      </div>,
      align: "center",
      dataIndex: "content",
      key: '0',
    },
  ]

  function exportHistories() {
    let res = "";
    histories.forEach(e => {
      res += e.content;
      res += "\n";
    });
    // const fileData = JSON.stringify(res);
    const blob = new Blob([res], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "footnote.txt";
    link.href = url;
    link.click();
  }

  const copy = (content) => {
    navigator.clipboard.writeText(content);
    messageApi.open({
      icon: <CheckCircleFilled style={{ color: "green", fontSize: 20 }} />,
      duration: 0.5,
      content: '已複製！',
      style: {
        fontSize: 20,
      },
    });
  }

  return (
    <>
      {contextHolder}
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => { copy(record.content) }, // click row
            // onDoubleClick: (event) => { }, // double click row
            // onContextMenu: (event) => { }, // right button click row
            // onMouseEnter: (event) => { }, // mouse enter row
            // onMouseLeave: (event) => { }, // mouse leave row
          };
        }}
        pagination={false}
        columns={columns}
        dataSource={histories}
        scroll={{ y: 133 }} />
    </>
  )


}

export default Output;