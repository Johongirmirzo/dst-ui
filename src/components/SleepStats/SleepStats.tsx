import React from "react";
import { TableContainer, Heading, Box } from "@chakra-ui/react";
import SleepStatsList from "./SleepStatsList/SleepStatsList";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { SleepEntryDataInterface } from "../../types/sleepEntry";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

type SleepStatsTyp = {
  paginatedSleepEntries: SleepEntryDataInterface[];
  getSleepEntryId: (id: string) => void;
  getSleepEntryIdToDelete: (id: string) => void;
};

const SleepStats = ({
  paginatedSleepEntries,
  getSleepEntryId,
  getSleepEntryIdToDelete,
}: SleepStatsTyp) => {
  return (
    <div>
      {paginatedSleepEntries?.length > 0 && (
        <Box mb={{ base: "7", md: "7" }} flex="1" style={{ width: "100%" }}>
          <Heading ml="4" mb="4" as="h3" size="lg">
            Sleep Stats
          </Heading>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th style={{ textAlign: "left" }}>Sleep Date</Th>
                  <Th style={{ textAlign: "left" }}>Sleep Time</Th>
                  <Th style={{ textAlign: "left" }}>Wakeup Time</Th>
                  <Th style={{ textAlign: "left" }}>Sleep Duration</Th>
                  <Th style={{ textAlign: "left" }}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                <SleepStatsList
                  paginatedSleepEntries={paginatedSleepEntries}
                  getSleepEntryId={getSleepEntryId}
                  getSleepEntryIdToDelete={getSleepEntryIdToDelete}
                />
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
};

export default SleepStats;
