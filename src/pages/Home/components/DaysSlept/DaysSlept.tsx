import React, { useState, useContext } from "react";
import { Box, Heading, Text, Select } from "@chakra-ui/react";
import { AverageCompProps } from "../../../../types/sleepEntry";
import { ThemeContext } from "../../../../context/ThemeContext";

const DaysSlept = ({ sleepEntries }: AverageCompProps) => {
  const { isLightMode, theme } = useContext(ThemeContext);

  const [daysUserSleptLessThanSixHours, setDaysUserSleptLessThanSixHours] =
    useState(0);
  const [daysUserSleptMoreThanEightHours, setDaysUserSleptMoreThanEightHours] =
    useState(0);

  const calculateDaysSleptAmount = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const {
      target: { value },
    } = e;

    if (value === "six") {
      const daysSleptLessThan6 = sleepEntries.filter((entry) => {
        const hour = entry.sleepDuration.split(":")[0];
        console.log(entry.sleepDuration.split(":"));
        return Number(hour) < 6;
      });
      setDaysUserSleptLessThanSixHours(daysSleptLessThan6.length);
      setDaysUserSleptMoreThanEightHours(0);
    } else if (value === "eight") {
      const daysSleptMoreThan8 = sleepEntries.filter((entry) => {
        const hour = entry.sleepDuration.split(":")[0];
        const minutes = entry.sleepDuration.split(":").join(" ").split(" ")[1];
        console.log(hour);
        return Number(hour) > 8 || (Number(hour) >= 8 && Number(minutes) > 0);
      });
      setDaysUserSleptLessThanSixHours(0);
      setDaysUserSleptMoreThanEightHours(daysSleptMoreThan8.length);
    } else {
      setDaysUserSleptLessThanSixHours(0);
      setDaysUserSleptMoreThanEightHours(0);
    }
  };
  return (
    <Box>
      <Heading mb="3" fontSize={{ base: "15", sm: "17", md: "20" }} as="h3">
        Days You Slept less than 6 and more than 8
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
        onChange={calculateDaysSleptAmount}
      >
        <option value=""></option>
        <option value="six">Days You Slept Less Than 6 Hours</option>
        <option value="eight">Days You Slep More Than 8 Hours</option>
      </Select>
      <Text fontWeight="bold" mt="5">
        {daysUserSleptLessThanSixHours
          ? `Days You Slept Less Than 6 Hours are: ${
              daysUserSleptLessThanSixHours > 1
                ? `${daysUserSleptLessThanSixHours} Days`
                : `1 Day`
            }`
          : daysUserSleptMoreThanEightHours
          ? `Days You Slept More Than 8 Hours are: ${
              daysUserSleptMoreThanEightHours > 1
                ? `${daysUserSleptMoreThanEightHours} Days`
                : "1 Day"
            }`
          : ""}
      </Text>
    </Box>
  );
};

export default DaysSlept;
