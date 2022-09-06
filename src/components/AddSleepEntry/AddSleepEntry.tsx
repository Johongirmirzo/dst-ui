import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
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
import { addSleepEntry } from "../../api/sleepEntry";
import { SleepEntryDataInterface } from "../../types/sleepEntry";

type SleepEntryProps = {
  isOpen: boolean;
  onClose: () => void;
  addNewSleepEntry: (sleepEntry: SleepEntryDataInterface) => void;
};

const AddSleepEntry = ({
  isOpen,
  onClose,
  addNewSleepEntry,
}: SleepEntryProps) => {
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
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
                    onClose();
                  } catch (error) {
                    console.error(error);
                  }
                })();
              }}
            >
              {({ handleSubmit, handleChange, values, errors, touched }) => (
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
                    />
                    {errors.wakeupTime && touched.wakeupTime ? (
                      <SleepEntryFieldError>
                        {errors.wakeupTime}
                      </SleepEntryFieldError>
                    ) : null}
                  </SleepEntryFormControl>
                  <SleepEntryButton type="submit">
                    Add New Sleep Entry
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
