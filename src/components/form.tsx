import React, { useEffect } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { IVoteItem } from "../interfaces";

// create a form for admin to create records which will become vote DataTransferItemList.

<button>Add Record</button>;

const adminForm = () => {
  return (
    <form>
      <input type="text" placeholder="Artist" />
      <input type="text" placeholder="Track" />
      <input type="text" placeholder="Album" />
      <input type="submit" />
    </form>
  );
};

// create a form which the user will input email address which will check if the user has voted
// already and if passed will add one to the appropriate record vote count.

const userForm = () => {
  return (
    <form>
      <input type="email" />
      <input type="submit" />
    </form>
  );
};
