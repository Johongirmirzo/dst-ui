import React, { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDisclosure, Box, Heading, Button } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import Info from "../../components/Info/Info";
import Navbar from "../../components/Navbar/Navbar";
import SleepDurationGraph from "../../components/SleepDurationGraph/SleepDurationGraph";
import SLeepStats from "../../components/SleepStats/SleepStats";
import AddSleepEntry from "../../components/AddSleepEntry/AddSleepEntry";
import EditSleepEntry from "../../components/EditSleepEntry/EditSleepEntry";
import DeleteSleepEntry from "../../components/DeleteSleepEntry/DeleteSleepEntry";
import { getAllSleepEntries } from "../../api/sleepEntry";

interface EntryData {
  _id: string;
  user: string;
  sleepDate: string;
  sleepTime: string;
  sleepDuration: string;
  wakeupTime: string;
}

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();
  const { user } = useContext(AuthContext);
  const [sleepEntries, setSleepEntries] = useState<EntryData[]>([]);
  const [sleepEntryId, setSleepEntryId] = useState("");
  const [sleepEntryIdToDelete, setSleepEntryIdToDelete] = useState("");

  useEffect(() => {
    (async function () {
      console.log("Home Page", user);
      if (Object.keys(user).length > 0) {
        try {
          const sleepEntries = await getAllSleepEntries();
          setSleepEntries(sleepEntries.data);
        } catch (error) {
          console.log("Something Went Wrong");
          console.error(error);
        }
      }
    })();
  }, []);

  const getSleepEntryIdToDelete = (id: string) => {
    setSleepEntryIdToDelete(id);
    onDeleteModalOpen();
  };
  const getSleepEntryIdToEdit = (id: string) => {
    setSleepEntryId(id);
    onEditModalOpen();
  };
  const addNewSleepEntry = (sleepEntry: EntryData) => {
    setSleepEntries([...sleepEntries, sleepEntry]);
  };
  const deleteSleepEntry = (sleepEntryId: string) => {
    console.log("DeleteSleepEntry", sleepEntryId);
    setSleepEntries(
      sleepEntries.filter((sleepEntry) => sleepEntry._id !== sleepEntryId)
    );
  };
  const editSleepEntry = (sleepEntryToEdit: EntryData) => {
    setSleepEntries(
      sleepEntries.map((sleepEntry) =>
        sleepEntry._id === sleepEntryToEdit._id ? sleepEntryToEdit : sleepEntry
      )
    );
  };

  return (
    <Box>
      <Navbar />
      <Box
        w="95%"
        mx="auto"
        mt="20"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {Object.keys(user).length === 0 ? (
          <Info />
        ) : (
          <>
            <Heading fontSize={{ base: "22", sm: "28", md: "40" }}>
              Daily Sleep Tracker
            </Heading>
            <Button
              onClick={onOpen}
              mt="5"
              colorScheme="blue"
              borderRadius="50"
            >
              <AddIcon /> Create New Entry
            </Button>
            <Box
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              gap="5"
              width="100%"
              mt="10"
            >
              <SleepDurationGraph sleepEntries={sleepEntries} />
              <SLeepStats
                sleepEntries={sleepEntries}
                getSleepEntryId={getSleepEntryIdToEdit}
                getSleepEntryIdToDelete={getSleepEntryIdToDelete}
              />
            </Box>
          </>
        )}
        <AddSleepEntry
          isOpen={isOpen}
          onClose={onClose}
          addNewSleepEntry={addNewSleepEntry}
        />
        <EditSleepEntry
          isEditModalOpen={isEditModalOpen}
          onEditModalClose={onEditModalClose}
          sleepEntryId={sleepEntryId}
          editSleepEntry={editSleepEntry}
          sleepEntries={sleepEntries}
        />
        <DeleteSleepEntry
          isDeleteModalOpen={isDeleteModalOpen}
          onDeleteModalClose={onDeleteModalClose}
          deleteSleepEntry={deleteSleepEntry}
          sleepEntryIdToDelete={sleepEntryIdToDelete}
        />
      </Box>
    </Box>
  );
};

export default Home;
