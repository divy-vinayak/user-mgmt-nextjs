"use client";
import React, { useState, useContext } from "react";
import { Modal, Button, Form, Input, Select } from "antd";
import {
  IsModalVisibleContext,
  EditUserContext,
  UserContext,
} from "@/app/page";

const { Option } = Select;

export function ModalForm({ visible }) {
  const [isModalVisible, setIsModalVisible] = useContext(IsModalVisibleContext);
  const [editUser, setEditUser] = useContext(EditUserContext);
  const [users, setUsers] = useContext(UserContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      const editedUser = {
        key: values.key,
        // serialNum: 1,
        name: values["name"],
        phone: "+" + values["prefix"] + "-" + values["phone"],
        email: values["email"],
        role: values["role"],
        isActive: values["isActive"],
      };
      const editedUsersList =  users.map((user) => {
        if (user.key === editedUser.key){
          return editedUser;
        }
        return user;
      })
      setUsers(editedUsersList);
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="91">+91</Option>
        <Option value="1">+1</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Modal
      title="Form in Modal"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={
          Object.keys(editUser).length === 0
            ? {}
            : {
                key: editUser.key,
                name: editUser.name,
                prefix: editUser.phone.split("-")[0].slice(1),
                phone: editUser.phone.split("-")[1],
                email: editUser.email,
                role: editUser.role,
                isActive: editUser.isActive,
              }
        }
      >
        <Form.Item
          style={{
            display: "none",
          }}
          name="key"
          label="Key"
          // tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your key!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your name!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          tooltip="admin, user, etc."
          rules={[
            {
              required: true,
              message: "Please input your role!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="isActive"
          label="IsActive"
          tooltip="yes/no"
          rules={[
            {
              required: true,
              message: "Please input your isActive!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
