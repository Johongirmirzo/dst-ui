import React from "react";
import { Tr, Td } from "react-super-responsive-table";
import { Box, Button } from "@chakra-ui/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import moment from "moment";
import { SleepEntryDataInterface } from "../../../../types/sleepEntry";

type EditSleepEntryProps = {
  sleepEntry: SleepEntryDataInterface;
  getSleepEntryId: (id: string) => void;
  getSleepEntryIdToDelete: (id: string) => void;
};

const SleepStatsItem = ({
  sleepEntry,
  getSleepEntryId,
  getSleepEntryIdToDelete,
}: EditSleepEntryProps) => {
  return (
    <Tr>
      <Td>{moment(sleepEntry.sleepDate).format("MMM DD yyyy")}</Td>
      <Td>{sleepEntry.sleepTime}</Td>
      <Td>{sleepEntry.wakeupTime}</Td>
      <Td>{sleepEntry.sleepDuration}</Td>
      <Td>
        <Box>
          <Button
            onClick={() => getSleepEntryId(sleepEntry._id)}
            pe="0"
            bgColor="transparent"
            _hover="transparent"
            _active="transparent"
          >
            <EditIcon sx={{ color: "#f69921" }} />
          </Button>
          <Button
            onClick={() => getSleepEntryIdToDelete(sleepEntry._id)}
            bgColor="transparent"
            _hover="transparent"
            _active="transparent"
          >
            <DeleteForeverIcon sx={{ color: "#e53e3e" }} />
          </Button>
        </Box>
      </Td>
    </Tr>
  );
};

export default SleepStatsItem;
