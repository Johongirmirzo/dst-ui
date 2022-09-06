import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Button,
} from "@chakra-ui/react";
import { SleepEntryInput } from "./DeleteSleepEntry.styled";
import { removeSleepEntry } from "../../api/sleepEntry";

type SleepEntryProps = {
  isDeleteModalOpen: boolean;
  sleepEntryIdToDelete: string;
  onDeleteModalClose: () => void;
  deleteSleepEntry: (id: string) => void;
};

const AddSleepEntry = ({
  isDeleteModalOpen,
  sleepEntryIdToDelete,
  onDeleteModalClose,
  deleteSleepEntry,
}: SleepEntryProps) => {
  const [agreementTerm, setAgreementTerm] = useState("");

  const deleteEntry = () => {
    if (sleepEntryIdToDelete) {
      (async function () {
        try {
          await removeSleepEntry(sleepEntryIdToDelete);
          deleteSleepEntry(sleepEntryIdToDelete);
          setAgreementTerm("");
          onDeleteModalClose();
        } catch (error) {
          console.log(error);
        }
      })();
    }
  };
  const closeModal = () => {
    setAgreementTerm("");
    onDeleteModalClose();
  };
  return (
    <>
      <Modal isCentered isOpen={isDeleteModalOpen} onClose={closeModal}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent p="5">
          <ModalHeader p="0" mb="4">
            You Are Deleting Entry
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody p="0">
            <Text color="#444" fontWeight="600">
              You are deleting sleep entry. If you are really sure about that,
              then you need to fill input with the words "I'm sure that I want
              to delete this entry"
            </Text>
            <Text mt="2" color="#444" fontWeight="bold">
              Type: I'm sure that I want to delete this entry
            </Text>
            <SleepEntryInput
              type="text"
              placeholder="Enter the word"
              value={agreementTerm}
              onChange={(e) => setAgreementTerm(e.target.value)}
            />
            <Button
              onClick={deleteEntry}
              disabled={
                agreementTerm !== "I'm sure that I want to delete this entry"
                  ? true
                  : false
              }
              colorScheme="red"
              w="100%"
              mt="3"
            >
              I understand the consequences
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSleepEntry;
