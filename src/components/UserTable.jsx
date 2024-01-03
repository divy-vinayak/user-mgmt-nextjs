"use client";
import React, { useContext } from "react";
import { Table, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  IsModalVisibleContext,
  EditUserContext,
  UserContext,
} from "@/app/page";
function UserTable(props) {
  const [isModalVisible, setIsModalVisible] = useContext(IsModalVisibleContext);
  const [editUser, setEditUser] = useContext(EditUserContext);
  const [users, setUsers] = useContext(UserContext);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      defaultSortOrder: 'ascend',
      sorter: (a, b) => b.name.localeCompare(a.name),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      defaultSortOrder: 'ascend',
      sorter: (a, b) => b.email.localeCompare(a.email),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "IsActive",
      dataIndex: "isActive",
      key: "isActive",
      filters: [
        {
          text: 'Yes',
          value: 'yes',
        },
        {
          text: 'No',
          value: 'no',
        }
      ],
      onFilter: (value, record) => record.isActive.indexOf(value) === 0,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <DeleteOutlined
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => {
              removeUser(record);
            }}
          />
          <EditOutlined
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => {
              // editUser(record)
              // console.log({"record": record});
              setEditUser(record);
              // todo make sure these two are only called once setEditUser is done
              setIsModalVisible(true);
              // console.log({'editUser': props.editUser});
            }}
          />
        </Space>
      ),
    },
  ];
  function removeUser(record) {
    // console.log(`key: ${record.key}`);
    const newUserList = users.filter((item) => item.key !== record.key);
    setUsers(newUserList);
  }
  return <Table dataSource={users} columns={columns} />;
}

export default UserTable;
