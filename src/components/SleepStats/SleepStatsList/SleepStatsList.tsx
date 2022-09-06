import React from "react";
import SleepStatsItem from "./SleepStatsItem/SleepStatsItem";
import { SleepEntryDataInterface } from "../../../types/sleepEntry";

type SleepStatsListProps = {
  sleepEntries: SleepEntryDataInterface[];
  getSleepEntryId: (id: string) => void;
  getSleepEntryIdToDelete: (id: string) => void;
};

const SleepStatsList = ({
  sleepEntries,
  getSleepEntryId,
  getSleepEntryIdToDelete,
}: SleepStatsListProps) => {
  return sleepEntries.map((sleepEntry) => (
    <SleepStatsItem
      sleepEntry={sleepEntry}
      key={sleepEntry._id}
      getSleepEntryId={getSleepEntryId}
      getSleepEntryIdToDelete={getSleepEntryIdToDelete}
    />
  ));
};

export default SleepStatsList;
