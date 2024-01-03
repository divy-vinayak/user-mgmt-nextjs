"use client";
import React, { useContext, useState } from "react";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { UserContext } from "@/app/page";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export function AddUserForm(props) {
  const [form] = Form.useForm();
  const [users, setUsers] = useContext(UserContext);
  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    const newUser = {
      key: (parseInt(users[users.length - 1].key) + 1).toString(),
      // serialNum: users[users.length - 1].serialNum + 1,
      name: values['name'],
      phone: "+" + values['prefix'] + '-' + values['phone'],
      email: values['email'],
      role: values['role'],
      isActive: values['isActive'],
    }
    if (users.find(item => item.phone === newUser.phone || item.email === newUser.email)){
      alert('User already exists');
      return;
    }
    setUsers([...users, newUser]);
    form.resetFields();
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
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  return (
    <>
      {/* <h3>Add User</h3> */}
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "91",
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
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

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Add User
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
