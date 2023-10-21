import { Button, Input, Space } from "antd";

export const SERVER_URL = "http://localhost:5000";
// export const SERVER_URL = "https://pm-app-be.glitch.me";

export const recordsPerPage = 10;

export const filterDropdownSearch = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
}) => (
  <Space className="d-flex align-items-center gap-1 rounded p-1">
    <Input
      autoFocus
      size="small"
      placeholder="Nhập từ khóa"
      value={selectedKeys[0]}
      onChange={(e) => {
        setSelectedKeys(e.target.value ? [e.target.value] : []);
        confirm({ closeDropdown: false });
      }}
      // onPressEnter={() => confirm()}
      // onBlur={() => confirm()}
    />
    <Button
      type="primary"
      danger
      size="small"
      onClick={() => {
        clearFilters();
        confirm();
      }}
    >
      Đặt lại
    </Button>
    <Button type="primary" size="small" onClick={() => confirm()}>
      Tìm kiếm
    </Button>
  </Space>
);
