import React, { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDisclosure, Box, Heading, Button, Select } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import Info from "../../components/Info/Info";
import Navbar from "../../components/Navbar/Navbar";
import SleepDurationGraph from "../../components/SleepDurationGraph/SleepDurationGraph";
import SLeepStats from "../../components/SleepStats/SleepStats";
import AddSleepEntry from "../../components/AddSleepEntry/AddSleepEntry";
import EditSleepEntry from "../../components/EditSleepEntry/EditSleepEntry";
import Pagination from "../../components/Pagination/Pagintation";
import DeleteSleepEntry from "../../components/DeleteSleepEntry/DeleteSleepEntry";
import SleepContainer from "./components/Container/Container";
import { getAllSleepEntries } from "../../api/sleepEntry";
import { SleepEntryDataInterface } from "../../types/sleepEntry";

const Home = () => {
  const { isLightMode, theme } = useContext(ThemeContext);
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
  const [sleepEntries, setSleepEntries] = useState<SleepEntryDataInterface[]>(
    []
  );
  const [sleepEntryId, setSleepEntryId] = useState("");
  const [sleepEntryIdToDelete, setSleepEntryIdToDelete] = useState("");

  const [paginatedSleepEntries, setPaginatedSleepEntries] = useState<
    SleepEntryDataInterface[]
  >([]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    if (sleepEntries) {
      const endOffset = itemOffset + itemsPerPage;
      console.log(sleepEntries);
      setPaginatedSleepEntries(sleepEntries.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(sleepEntries.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, sleepEntries]);

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

  useEffect(() => {
    const body = document.querySelector("body") as HTMLBodyElement;
    if (isLightMode) {
      body.classList.remove("dark-mode");
    } else {
      body.classList.add("dark-mode");
    }
  }, [isLightMode]);

  const getSleepEntryIdToDelete = (id: string) => {
    setSleepEntryIdToDelete(id);
    onDeleteModalOpen();
  };
  const getSleepEntryIdToEdit = (id: string) => {
    setSleepEntryId(id);
    onEditModalOpen();
  };
  const addNewSleepEntry = (sleepEntry: SleepEntryDataInterface) => {
    setSleepEntries([...sleepEntries, sleepEntry]);
  };
  const deleteSleepEntry = (sleepEntryId: string) => {
    console.log("DeleteSleepEntry", sleepEntryId);
    setSleepEntries(
      sleepEntries.filter((sleepEntry) => sleepEntry._id !== sleepEntryId)
    );
  };
  const editSleepEntry = (sleepEntryToEdit: SleepEntryDataInterface) => {
    setSleepEntries(
      sleepEntries.map((sleepEntry) =>
        sleepEntry._id === sleepEntryToEdit._id ? sleepEntryToEdit : sleepEntry
      )
    );
  };

  const handlePageClick = (event: { selected: number }) => {
    console.log(event, "Event");
    const newOffset = (event.selected * itemsPerPage) % sleepEntries.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  console.log(theme);

  return (
    <Box sx={isLightMode ? { ...theme.lightMode } : { ...theme.darkMode }}>
      <Navbar />
      <Box
        w="95%"
        height={!sleepEntries.length ? "90vh" : "auto"}
        mx="auto"
        mb="10"
        mt="20"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {Object.keys(user).length === 0 ? (
          <Info isLightMode={isLightMode} />
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
            <SleepContainer sleepEntries={sleepEntries} />
            <Box
              display="flex"
              flexDirection={{
                base: "column",
                md: "row",
              }}
              gap="5"
              width="100%"
              mt="10"
            >
              <SleepDurationGraph sleepEntries={sleepEntries} />
              <Box sx={{ flex: "1", width: "100%" }}>
                {paginatedSleepEntries.length > 0 && (
                  <>
                    <SLeepStats
                      paginatedSleepEntries={paginatedSleepEntries}
                      getSleepEntryId={getSleepEntryIdToEdit}
                      getSleepEntryIdToDelete={getSleepEntryIdToDelete}
                    />
                    <Pagination
                      handlePageClick={handlePageClick}
                      pageCount={pageCount}
                    />
                  </>
                )}
              </Box>
            </Box>
          </>
        )}
        <AddSleepEntry
          isLightMode={isLightMode}
          isOpen={isOpen}
          onClose={onClose}
          addNewSleepEntry={addNewSleepEntry}
        />
        <EditSleepEntry
          isLightMode={isLightMode}
          isEditModalOpen={isEditModalOpen}
          onEditModalClose={onEditModalClose}
          sleepEntryId={sleepEntryId}
          editSleepEntry={editSleepEntry}
          sleepEntries={sleepEntries}
        />
        <DeleteSleepEntry
          isLightMode={isLightMode}
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
