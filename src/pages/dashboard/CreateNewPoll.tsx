import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputComponent = styled.label`
  display: block;
`;

export const CreateNewPoll = () => {
  const [pollName, setPollName] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  return (
    <div>
      <InputComponent>
        Poll Name
        <input
          type="text"
          placeholder="Poll Name"
          value={pollName}
          onChange={(event: any) => {
            setPollName(event.target.value);
          }}
        />
      </InputComponent>

      <InputComponent>
        Start Date
        <DatePicker
          selected={startDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date: Date) => {
            setStartDate(date);
          }}
        />
      </InputComponent>
      <InputComponent>
        End Date
        <DatePicker
          selected={endDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date: Date) => {
            setEndDate(date);
          }}
        />
      </InputComponent>
      {pollName}
      <br></br>
      {startDate.toISOString()}
      <br></br>
      {endDate.toISOString()}
    </div>
  );
};
