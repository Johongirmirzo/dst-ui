import React, { useEffect, useState } from "react";
import {
  Legend,
  LineChart,
  XAxis,
  YAxis,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import moment from "moment";
import { Heading } from "@chakra-ui/react";
import {
  SleepEntryListInterface,
  SleepEntryDataInterface,
} from "../../types/sleepEntry";

interface SleepDurationGraphInterface {
  name: string;
  totalHours: number;
  "Hours Slept": number;
}
const SleepDurationGraph = ({ sleepEntries }: SleepEntryListInterface) => {
  const [entries, setEntries] = useState<SleepDurationGraphInterface[]>([]);

  useEffect(() => {
    setEntries(
      sleepEntries.map((entry: SleepEntryDataInterface) => ({
        name: moment(entry.sleepDate).format("MM/DD/yy"),
        totalHours: 24,
        "Hours Slept": Number(
          entry.sleepDuration.split(":")[0].length === 1
            ? entry.sleepDuration.slice(0, 1)
            : entry.sleepDuration.slice(0, 2)
        ),
      }))
    );
  }, [sleepEntries]);

  return (
    <div style={{ width: "100%", flex: "1" }}>
      {entries.length > 0 && (
        <>
          <Heading ml="10" mb="4" as="h3" size="lg">
            Sleep Duration
          </Heading>
          <ResponsiveContainer width="100%" height="500" aspect={2}>
            <LineChart
              data={entries}
              margin={{ top: 10, right: 15, left: 0, bottom: 15 }}
            >
              <XAxis dataKey="name" padding={{ left: 10, right: 0 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Hours Slept"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default SleepDurationGraph;
