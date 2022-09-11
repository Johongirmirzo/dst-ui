import React from "react";
import SleepStatsItem from "./SleepStatsItem/SleepStatsItem";
import { SleepEntryDataInterface } from "../../../types/sleepEntry";

type SleepStatsListProps = {
  paginatedSleepEntries: SleepEntryDataInterface[];
  getSleepEntryId: (id: string) => void;
  getSleepEntryIdToDelete: (id: string) => void;
};

const SleepStatsList = ({
  paginatedSleepEntries,
  getSleepEntryId,
  getSleepEntryIdToDelete,
}: SleepStatsListProps) => {
  return paginatedSleepEntries.map((sleepEntry) => (
    <SleepStatsItem
      sleepEntry={sleepEntry}
      key={sleepEntry._id}
      getSleepEntryId={getSleepEntryId}
      getSleepEntryIdToDelete={getSleepEntryIdToDelete}
    />
  ));
};

export default SleepStatsList;
