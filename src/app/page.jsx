"use client";
import React, { useState } from "react";
import UserTable from "@/components/UserTable";
import { AddUserForm } from "@/components/AddUserForm";
import { ModalForm } from "@/components/ModalForm";

export const IsModalVisibleContext = React.createContext();
export const EditUserContext = React.createContext();
export const UserContext = React.createContext();

export default function Home() {
  const [users, setUsers] = useState([
    {
      key: "1",
      // serialNum: 1,
      name: "test",
      phone: "+91-9999999999",
      email: "test@example.com",
      role: "testing",
      isActive: "yes",
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editUser, setEditUser] = useState({});

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  // const handleSubmit = (values) => {
  //   // Handle form submission, e.g., send data to the server
  //   console.log('Form values:', values);
  //   setIsModalVisible(false);
  // };
  return (
    <>
      <br />
      <main>
        <UserContext.Provider value={[users, setUsers]}>
          <IsModalVisibleContext.Provider
            value={[isModalVisible, setIsModalVisible]}
          >
            <EditUserContext.Provider value={[editUser, setEditUser]}>
              <UserTable />
              <br />
              <h3>Add User</h3>
              <AddUserForm />
              <ModalForm visible={isModalVisible} />
            </EditUserContext.Provider>
          </IsModalVisibleContext.Provider>
        </UserContext.Provider>
      </main>
    </>
  );
}
