import React, { useState, useEffect } from "react";
import { SubmitButton } from "../../components/StyledComponents";
import { INewUser, IUser } from "../../interfaces";
import apiService from "../../services/apiService";
import { toast } from "react-toastify";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import styled from "styled-components";
import ReactGA from "react-ga";

export const Users = () => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [newUser, setNewUser] = useState<INewUser>({ email: "", password: "" });
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [eyeHidden, setEyeHidden] = useState<boolean>(false);

  const AddUserButton = styled.div`
    :hover {
      cursor: pointer;
      color: red;
    }
  `;

  return (
    <div>
      <AddUserButton
        onClick={(e) => {
          setFormVisible(!formVisible);
        }}
      >
        Add User
      </AddUserButton>
      {formVisible && (
        <form>
          <input
            type="text"
            value={newUser.email}
            onChange={(e) => {
              setNewUser({
                ...newUser,
                email: (e.target as HTMLInputElement).value,
              });
            }}
          />
          <input
            type={isHidden ? "password" : "string"}
            value={newUser.password}
            onChange={(e) => {
              setNewUser({
                ...newUser,
                password: (e.target as HTMLInputElement).value,
              });
            }}
          ></input>
          <span
            onClick={(e) => {
              setIsHidden(!isHidden);
            }}
          >
            {isHidden && <MdVisibility />}
            {!isHidden && <MdVisibilityOff />}
          </span>
          <SubmitButton
            onClick={(e) => {
              apiService.addNewUser(newUser).then(
                (data) => {
                  ReactGA.event({
                    category: "Admin",
                    action: "Create new user success",
                  });
                  toast.success(`New user ${data.email}`);
                },
                (error) => {
                  ReactGA.event({
                    category: "Admin",
                    action: "Created new user failed",
                  });
                  toast.error(error.message);
                }
              );
            }}
          >
            Submit
          </SubmitButton>
        </form>
      )}

      <UsersList></UsersList>
    </div>
  );
};

const UsersList = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    apiService.getAllUsers().then((users: IUser[]) => {
      setUsers(users);
    });
  }, []);

  const deleteUser = (user: IUser) => {
    if (confirm(`Are you sure you want to delete ${user.email}?`)) {
      apiService.deleteUser(user.email).then(() => {
        ReactGA.event({
          category: "Admin",
          action: "Deleted a user",
        });
        apiService.getAllUsers().then((users: IUser[]) => {
          setUsers(users);
        });
      });
    }
  };

  return (
    <table>
      <tr>
        <th>Email</th>
        <th>Id</th>
      </tr>
      {users &&
        users.map((user) => (
          <tr>
            <td>{user.email}</td>
            <td>{user._id}</td>
            <td>
              <button
                onClick={() => {
                  deleteUser(user);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
    </table>
  );
};
