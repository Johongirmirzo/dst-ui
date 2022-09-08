import React, { useEffect, useState } from "react";
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
  EditSleepEntryForm,
  EditSleepEntryFormControl,
  EditSleepEntryLabel,
  EditSleepEntryInput,
  EditSleepEntryButton,
  EditSleepEntryRoutetext,
  EditSleepEntryFieldError,
} from "./EditSleepEntry.styled";
import { sleepEntrySchema } from "../../schemas/sleepEntrySchema";
import { Formik } from "formik";
import { updateSleepEntry, getSleepEntry } from "../../api/sleepEntry";
import { SleepEntryDataInterface } from "../../types/sleepEntry";

type EditSleepEntryProps = {
  isEditModalOpen: boolean;
  sleepEntryId: string;
  onEditModalClose: () => void;
  editSleepEntry: (sleepEntry: SleepEntryDataInterface) => void;
  sleepEntries: SleepEntryDataInterface[];
};

const EditSleepEntry = ({
  isEditModalOpen,
  sleepEntryId,
  onEditModalClose,
  editSleepEntry,
  sleepEntries,
}: EditSleepEntryProps) => {
  const [sleepEntry, setSleepEntry] = useState({} as SleepEntryDataInterface);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sleepEntryId) {
      (async function () {
        try {
          const sleepEntry = await getSleepEntry(sleepEntryId);
          setSleepEntry(sleepEntry.data);
          console.log(sleepEntryId, "getting sleep entry...");
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [sleepEntryId, sleepEntries]);

  return (
    <>
      <Modal isCentered isOpen={isEditModalOpen} onClose={onEditModalClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Edit Sleep Entry</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {sleepEntry && Object.keys(sleepEntry).length > 0 && (
              <Formik
                enableReinitialize
                initialValues={{
                  sleepDate:
                    new Date(sleepEntry.sleepDate).toISOString().slice(0, 10) ||
                    "",
                  sleepTime: sleepEntry.sleepTime || "",
                  wakeupTime: sleepEntry.wakeupTime || "",
                }}
                validationSchema={sleepEntrySchema}
                onSubmit={(sleepEntryData, { resetForm }) => {
                  console.log(sleepEntryData);
                  (async function () {
                    try {
                      const updatedSleepEntry = await updateSleepEntry(
                        sleepEntryId,
                        sleepEntryData
                      );
                      editSleepEntry(updatedSleepEntry.data);
                      resetForm();
                      setError("");
                      onEditModalClose();
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
                  handleBlur,
                  isSubmitting,
                  values,
                  errors,
                  touched,
                }) => (
                  <EditSleepEntryForm onSubmit={handleSubmit}>
                    <EditSleepEntryFormControl>
                      <EditSleepEntryLabel htmlFor="sleepDate">
                        Sleep Date
                      </EditSleepEntryLabel>
                      <EditSleepEntryInput
                        type="date"
                        id="sleepDate"
                        name="sleepDate"
                        value={values.sleepDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter Edit Date"
                      />
                      {errors.sleepDate && touched.sleepDate ? (
                        <EditSleepEntryFieldError>
                          {errors.sleepDate}
                        </EditSleepEntryFieldError>
                      ) : null}
                    </EditSleepEntryFormControl>
                    <EditSleepEntryFormControl>
                      <EditSleepEntryLabel htmlFor="sleepTime">
                        Sleep Time
                      </EditSleepEntryLabel>
                      <EditSleepEntryInput
                        type="time"
                        id="sleepTime"
                        name="sleepTime"
                        value={values.sleepTime}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter Edit Time"
                      />
                      {errors.sleepTime && touched.sleepTime ? (
                        <EditSleepEntryFieldError>
                          {errors.sleepTime}
                        </EditSleepEntryFieldError>
                      ) : null}
                    </EditSleepEntryFormControl>
                    <EditSleepEntryFormControl>
                      <EditSleepEntryLabel htmlFor="wakeupTime">
                        Wakeup Time
                      </EditSleepEntryLabel>
                      <EditSleepEntryInput
                        type="time"
                        id="wakeupTime"
                        name="wakeupTime"
                        value={values.wakeupTime}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter Wakeup Time"
                      />
                      {errors.wakeupTime && touched.wakeupTime ? (
                        <EditSleepEntryFieldError>
                          {errors.wakeupTime}
                        </EditSleepEntryFieldError>
                      ) : null}
                    </EditSleepEntryFormControl>
                    <EditSleepEntryButton
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
                    </EditSleepEntryButton>
                  </EditSleepEntryForm>
                )}
              </Formik>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditSleepEntry;
