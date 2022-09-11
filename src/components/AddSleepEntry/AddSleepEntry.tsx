import React, { useState, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  CircularProgress,
} from "@chakra-ui/react";
import {
  SleepEntryForm,
  SleepEntryFormControl,
  SleepEntryLabel,
  SleepEntryInput,
  SleepEntryButton,
  SleepEntryFieldError,
} from "./AddSleepEntry.styled";
import { sleepEntrySchema } from "../../schemas/sleepEntrySchema";
import { Formik } from "formik";
import { ThemeContext } from "../../context/ThemeContext";
import { addSleepEntry } from "../../api/sleepEntry";
import { SleepEntryDataInterface } from "../../types/sleepEntry";

type SleepEntryProps = {
  isOpen: boolean;
  isLightMode: boolean;
  onClose: () => void;
  addNewSleepEntry: (sleepEntry: SleepEntryDataInterface) => void;
};

const AddSleepEntry = ({
  isOpen,
  isLightMode,
  onClose,
  addNewSleepEntry,
}: SleepEntryProps) => {
  const { theme } = useContext(ThemeContext);
  const [error, setError] = useState("");

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          sx={isLightMode ? { ...theme.lightMode } : { ...theme.darkMode }}
        >
          <ModalHeader>Add New Sleep Entry</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                sleepDate: "",
                sleepTime: "",
                wakeupTime: "",
              }}
              validationSchema={sleepEntrySchema}
              onSubmit={(sleepEntryData, { resetForm }) => {
                (async function () {
                  try {
                    const newSleepEntryData = await addSleepEntry(
                      sleepEntryData
                    );
                    console.log(newSleepEntryData, "New SLeep Entry Added");
                    resetForm();
                    addNewSleepEntry(newSleepEntryData.data);
                    setError("");
                    onClose();
                  } catch (error) {
                    setError("Error");
                    console.error(error);
                  }
                })();
              }}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <SleepEntryForm onSubmit={handleSubmit}>
                  <SleepEntryFormControl>
                    <SleepEntryLabel htmlFor="sleepDate">
                      Sleep Date
                    </SleepEntryLabel>
                    <SleepEntryInput
                      type="date"
                      id="sleepDate"
                      name="sleepDate"
                      value={values.sleepDate}
                      onChange={handleChange}
                      placeholder="Enter Sleep Date"
                      style={
                        isLightMode
                          ? { color: theme.lightMode.color }
                          : { color: theme.darkMode.color }
                      }
                    />
                    {errors.sleepDate && touched.sleepDate ? (
                      <SleepEntryFieldError>
                        {errors.sleepDate}
                      </SleepEntryFieldError>
                    ) : null}
                  </SleepEntryFormControl>
                  <SleepEntryFormControl>
                    <SleepEntryLabel htmlFor="sleepTime">
                      Sleep Time
                    </SleepEntryLabel>
                    <SleepEntryInput
                      type="time"
                      id="sleepTime"
                      name="sleepTime"
                      value={values.sleepTime}
                      onChange={handleChange}
                      placeholder="Enter Sleep Time"
                      style={
                        isLightMode
                          ? { color: theme.lightMode.color }
                          : { color: theme.darkMode.color }
                      }
                    />
                    {errors.sleepTime && touched.sleepTime ? (
                      <SleepEntryFieldError>
                        {errors.sleepTime}
                      </SleepEntryFieldError>
                    ) : null}
                  </SleepEntryFormControl>
                  <SleepEntryFormControl>
                    <SleepEntryLabel htmlFor="wakeupTime">
                      Wakeup Time
                    </SleepEntryLabel>
                    <SleepEntryInput
                      type="time"
                      id="wakeupTime"
                      name="wakeupTime"
                      value={values.wakeupTime}
                      onChange={handleChange}
                      placeholder="Enter Wakeup Time"
                      style={
                        isLightMode
                          ? { color: theme.lightMode.color }
                          : { color: theme.darkMode.color }
                      }
                    />
                    {errors.wakeupTime && touched.wakeupTime ? (
                      <SleepEntryFieldError>
                        {errors.wakeupTime}
                      </SleepEntryFieldError>
                    ) : null}
                  </SleepEntryFormControl>
                  <SleepEntryButton
                    style={
                      isSubmitting && !error
                        ? { opacity: ".4", cursor: "not-allowed" }
                        : { opacity: "1", cursor: "pointer" }
                    }
                    type="submit"
                  >
                    {isSubmitting && !error ? (
                      <CircularProgress
                        isIndeterminate
                        value={80}
                        size="30px"
                      />
                    ) : (
                      "Add New Sleep Entry"
                    )}
                  </SleepEntryButton>
                </SleepEntryForm>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSleepEntry;
