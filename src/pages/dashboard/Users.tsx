import React, { useState } from "react";
import { SubmitButton } from "../../components/StyledComponents";
import { INewUser } from "../../interfaces";
import apiService from "../../services/apiService";
import { toast } from "react-toastify";

export const Users = () => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [newUser, setNewUser] = useState<INewUser>({ email: "", password: "" });
  const [formVisible, setFormVisible] = useState<boolean>(false);

  return (
    <div>
      <SubmitButton
        onClick={e => {
          setFormVisible(!formVisible);
        }}
      >
        Add User
      </SubmitButton>
      {formVisible && (
        <form>
          <input
            type="text"
            value={newUser.email}
            onChange={e => {
              setNewUser({
                ...newUser,
                email: (e.target as HTMLInputElement).value
              });
            }}
          />
          <input
            type={isHidden ? "password" : "string"}
            value={newUser.password}
            onChange={e => {
              setNewUser({
                ...newUser,
                password: (e.target as HTMLInputElement).value
              });
            }}
          ></input>
          <span
            onClick={e => {
              setIsHidden(!isHidden);
            }}
          >
            eye
          </span>
          <SubmitButton
            onClick={e => {
              apiService.addNewUser(newUser).then(
                data => {
                  toast.success(`New user ${data.email}`);
                },
                error => {
                  toast.error(error.message);
                }
              );
            }}
          >
            Submit
          </SubmitButton>
        </form>
      )}
    </div>
  );
};
