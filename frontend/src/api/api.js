import { useRef, useState } from "react";
import { Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

export const SERVER_URL = "http://localhost:5000";
// export const SERVER_URL = "https://pm-app-be.glitch.me";

export const recordsPerPage = 5;

export const useGetColumnSearchProps = (dataIndex) => {
  const [searchColText, setSearchColText] = useState("");
  const [searchedCol, setSearchedCol] = useState("");
  const inputRef = useRef(null);

  return {
    filterIcon: () => <SearchOutlined />,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) setTimeout(() => inputRef.current?.focus(), 100);
    },
    filterDropdown: ({
      selectedKeys,
      setSelectedKeys,
      confirm,
      clearFilters,
    }) => (
      <Space direction="horizontal" size={4} className="rounded p-1">
        <Input
          ref={inputRef}
          size="small"
          placeholder="Nhập từ khóa"
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            setSearchColText(e.target.value ? e.target.value : "");
            setSearchedCol(dataIndex);
            confirm({ closeDropdown: false });
          }}
          onPressEnter={() => confirm()}
          // onBlur={() => confirm()}
        />
        <Button
          type="primary"
          danger
          size="small"
          onClick={() => {
            setSearchColText("");
            setSearchedCol("");
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
    ),
    onFilter: (inputText, record) => {
      if (
        dataIndex === "department" ||
        dataIndex === "project_type" ||
        dataIndex === "project_status" ||
        dataIndex === "customer_group"
      ) {
        return record[dataIndex][0].name
          .toLowerCase()
          .includes(inputText.toLowerCase());
      }
      return record[dataIndex].toLowerCase().includes(inputText.toLowerCase());
    },
    render: (text) => {
      if (searchedCol === dataIndex) {
        return (
          <Highlighter
            highlightClassName="bg-highlight px-0"
            searchWords={[searchColText]}
            autoEscape
            textToHighlight={
              text[0].name
                ? text[0].name.toString()
                : text
                ? text.toString()
                : ""
            }
          />
        );
      } else if (text[0].name) return text[0].name;
      else return text;
    },
  };
};
