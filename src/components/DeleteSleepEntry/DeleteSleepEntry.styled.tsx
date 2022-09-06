import styled from "styled-components";

const SleepEntryForm = styled.form``;
const SleepEntryFormControl = styled.div`
  margin-bottom: 15px;
`;
const SleepEntryLabel = styled.label`
  color: #222;
  font-size: 600;
  padding-bottom: 10px;
`;
const SleepEntryInput = styled.input`
  display: block;
  width: 100%;
  padding: 7px 8px;
  border: 1px solid #546990;
  background: transparent;
  outline: 0;
  border-radius: 5px;
  font-size: 0.95rem;
  color: #222;
  margin-top: 10px;
  transition: padding 0.25s ease-out;
  &::placeholder {
    color: #444;
  }
  &:focus {
    padding-left: 15px;
  }
`;
const SleepEntryButton = styled.button`
  display: block;
  width: 100%;
  border: 0;
  border-radius: 5px;
  padding: 10px 0;
  color: #fff;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  background: #5a8dee;
  margin: 20px 0;
`;
const SleepEntryRoutetext = styled.div`
  color: #222;
`;

const SleepEntryFieldError = styled.p`
  color: hsl(0, 88%, 50%);
  font-size: 0.9rem;
  margin-top: 2px;
  font-weight: 600;
`;

export {
  SleepEntryForm,
  SleepEntryFormControl,
  SleepEntryLabel,
  SleepEntryInput,
  SleepEntryButton,
  SleepEntryRoutetext,
  SleepEntryFieldError,
};
