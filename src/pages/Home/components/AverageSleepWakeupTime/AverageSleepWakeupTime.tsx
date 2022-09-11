import React, { useState, useContext } from "react";
import { Box, Heading, Text, Select } from "@chakra-ui/react";
import { padZero } from "../../../../utils/padZero";
import { AverageCompProps } from "../../../../types/sleepEntry";
import { ThemeContext } from "../../../../context/ThemeContext";

const AverageSleepWakeupTime = ({ sleepEntries }: AverageCompProps) => {
  const { isLightMode, theme } = useContext(ThemeContext);

  const [averageSleepTime, setAverageSleepTime] = useState("");
  const [averageWakeupTime, setAverageWakeupTime] = useState("");

  const calculateAverageSleepAndWakeupTime = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const {
      target: { value },
    } = e;
    if (!sleepEntries.length) return;

    if (value === "sleep-time") {
      const sleepTimeHoursTotal = sleepEntries.reduce((acc, currEl) => {
        const sleepTime = currEl.sleepTime.split(":")[0];
        if (sleepTime === "00") {
          return acc + 24;
        } else if (sleepTime >= "12") {
          return Number(sleepTime) + acc;
        } else {
          return Number(sleepTime) + 24 + acc;
        }
      }, 0);
      const sleepTimeMinutesTotal = sleepEntries.reduce((acc, currEl) => {
        const minutes = currEl.sleepTime.split(":")[1];
        return Number(minutes) + acc;
      }, 0);
      console.log({ sleepTimeMinutesTotal, sleepTimeHoursTotal });
      const averageSleepTimeHour = Math.floor(
        (sleepTimeMinutesTotal / 60 + sleepTimeHoursTotal) / sleepEntries.length
      );

      setAverageSleepTime(
        `${padZero(
          averageSleepTimeHour >= 24
            ? averageSleepTimeHour - 24
            : averageSleepTimeHour
        )}:${padZero(sleepTimeMinutesTotal % 60)}`
      );
      setAverageWakeupTime("");
    } else if (value === "wakeup-time") {
      const wakeupTimeHoursTotal = sleepEntries.reduce((acc, currEl) => {
        const wakeupTime = currEl.wakeupTime.split(":")[0];
        return Number(wakeupTime) + acc;
      }, 0);

      const hoursDecimal = (wakeupTimeHoursTotal / sleepEntries.length)
        .toString()
        .includes(".")
        ? Math.ceil(
            Number(
              (wakeupTimeHoursTotal / sleepEntries.length)
                .toString()
                .split(".")[1]
                .slice(0, 1)
            ) * 6
          )
        : 0;

      const wakeupTimeMinutesTotal = sleepEntries.reduce((acc, currEl) => {
        const minutes = currEl.wakeupTime.split(":")[1];
        return Number(minutes) + acc;
      }, 0);

      const averageWakeupTimeHour = Math.floor(
        (wakeupTimeMinutesTotal / sleepEntries.length + hoursDecimal) / 60 +
          Math.floor(wakeupTimeHoursTotal / sleepEntries.length)
      );
      console.log(wakeupTimeMinutesTotal / sleepEntries.length + hoursDecimal);
      console.log({
        wakeupTimeHoursTotal,
        hoursDecimal,
        wakeupTimeMinutesTotal,
      });
      setAverageWakeupTime(
        `${padZero(averageWakeupTimeHour)}:${padZero(
          Math.ceil(
            wakeupTimeMinutesTotal / sleepEntries.length + hoursDecimal
          ) % 60
        )}`
      );
      setAverageSleepTime("");
    } else {
      setAverageSleepTime("");
      setAverageWakeupTime("");
    }
  };
  return (
    <Box>
      <Heading mb="3" fontSize={{ base: "15", sm: "17", md: "20" }} as="h3">
        Average Sleep and Wakeup Time
      </Heading>
      <Select
        sx={
          isLightMode
            ? { background: "transparent", color: theme.lightMode.color }
            : {
                ...theme.darkMode,
                " option": { background: "#333" },
              }
        }
        size="xs"
        onChange={calculateAverageSleepAndWakeupTime}
      >
        <option value=""></option>
        <option value="sleep-time">Average Sleep Time</option>
        <option value="wakeup-time">Average Wakeup Time</option>
      </Select>
      <Text fontWeight="bold" mt="5">
        {averageSleepTime
          ? `Average Sleep Time: ${averageSleepTime}`
          : averageWakeupTime
          ? `Average Wakeup Time: ${averageWakeupTime}`
          : ""}
      </Text>
    </Box>
  );
};

export default AverageSleepWakeupTime;
