import React from "react";
import { Box } from "@chakra-ui/react";
import AverageSleepDuration from "../AverageSleepDuration/AverageSleepDuration";
import AverageSleepWakeupTime from "../AverageSleepWakeupTime/AverageSleepWakeupTime";
import DaysSlept from "../DaysSlept/DaysSlept";
import { SleepEntryDataInterface } from "../../../../types/sleepEntry";

type ContainerProps = {
  sleepEntries: SleepEntryDataInterface[];
};

const SleepContainer = ({ sleepEntries }: ContainerProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexDirection={{ base: "column", md: "row" }}
      gap="20"
      w="90%"
      my="12"
    >
      <AverageSleepWakeupTime sleepEntries={sleepEntries} />
      <AverageSleepDuration sleepEntries={sleepEntries} />
      <DaysSlept sleepEntries={sleepEntries} />
    </Box>
  );
};

export default SleepContainer;
