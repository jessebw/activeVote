import React, { useState, useEffect } from "react";
import { SubmitButton } from "../../components/StyledComponents";
import { INewUser, IUser } from "../../interfaces";
import apiService from "../../services/apiService";
import { toast } from "react-toastify";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import styled from "styled-components";
import ReactGA from "react-ga";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
// react modal stuffs
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "25ch",
    },
  })
);

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

const UserView = styled.div`
  width: 80%;
  margin: 0 auto;
  // background-color: green;
  // display: flex;
  // justify-content: center;
  // padding-top: 50px;
`;

export const Users = () => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [newUser, setNewUser] = useState<INewUser>({
    email: "",
    password: "",
  });
  const [formVisible, setFormVisible] = useState<boolean>(false);
  // const [eyeHidden, setEyeHidden] = useState<boolean>(false);
  const [selectUser, setSelectUser] = useState([]);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [isShown, setIsShown] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [users, setUsers] = useState<IUser[]>([]);

  const getUsers = () => {
    return apiService.getAllUsers().then((users: IUser[]) => {
      setUsers(users);
    });
  };

  useEffect(() => {
    getUsers();
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
    <UserView>
      <h1>All Users</h1>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>Add An Admin User.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="text"
            fullWidth
            value={newUser.email}
            onChange={(e) => {
              setNewUser({
                ...newUser,
                email: (e.target as HTMLInputElement).value,
              });
            }}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              value={newUser.password}
              type={values.showPassword ? "text" : "password"}
              // onChange={handleChange("password")}
              onChange={(e) => {
                // handleChange("password");
                setNewUser({
                  ...newUser,
                  password: (e.target as HTMLInputElement).value,
                });
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              apiService.addNewUser(newUser).then(
                (data) => {
                  ReactGA.event({
                    category: "Admin",
                    action: "Create new user success",
                  });
                  toast.success(`New user ${data.email}`);
                  handleClose();
                  getUsers();
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
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ marginTop: "30px", width: "100%" }}>
        {users &&
          users.map((user) => (
            <ul key={user._id} style={{ listStyle: "none" }}>
              <li
                style={{
                  backgroundColor: " #fcfcfc ",
                  // height: "50px",
                  padding: "18px",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
              >
                <span style={{ fontWeight: "bold" }}>{user.email}</span>
                {isShown && (
                  <span
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "0",
                      bottom: "0",
                    }}
                  >
                    <Button
                      style={{ width: "150px", height: "100%" }}
                      variant="outlined"
                      color="primary"
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                    <Button
                      style={{
                        width: "150px",
                        height: "100%",
                        marginLeft: "18px",
                      }}
                      variant="outlined"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        deleteUser(user);
                      }}
                    >
                      Delete
                    </Button>
                  </span>
                )}
              </li>
            </ul>
          ))}
      </div>
    </UserView>
  );
};
