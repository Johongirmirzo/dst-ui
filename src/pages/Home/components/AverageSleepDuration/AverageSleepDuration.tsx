import React, { useState, useContext } from "react";
import { Box, Heading, Text, Select } from "@chakra-ui/react";
import moment from "moment";
import { padZero } from "../../../../utils/padZero";
import {
  AverageCompProps,
  SleepEntryDataInterface,
} from "../../../../types/sleepEntry";
import { ThemeContext } from "../../../../context/ThemeContext";

const AverageSleepDuration = ({ sleepEntries }: AverageCompProps) => {
  const { isLightMode, theme } = useContext(ThemeContext);

  const [averageSleepDurationWeek, setAverageSleepDurationWeek] = useState("");
  const [averageSleepDurationMonth, setAverageSleepDurationMonth] =
    useState("");
  const [averageSleepDurationYear, setAverageSleepDurationYear] = useState("");

  const getSleepDurationDateList = (date1: string, date2: string) => {
    return sleepEntries.filter(
      (entry) =>
        moment(entry.sleepDate.slice(0, 10)).isSameOrAfter(
          date1.slice(0, 10)
        ) &&
        moment(entry.sleepDate.slice(0, 10)).isSameOrBefore(date2.slice(0, 10))
    );
  };
  const getAverageSleepDurationMinutes = (
    minutes: number,
    sleepDates: SleepEntryDataInterface[],
    hoursDecimal: number
  ) => Math.ceil(minutes / sleepDates.length + hoursDecimal) % 60;
  const sumSleepDurationTotalHours = (
    sleepDates: SleepEntryDataInterface[]
  ) => {
    return sleepDates.reduce((acc, currEl) => {
      const hour = currEl.sleepDuration.split(":")[0];
      return Number(hour) + acc;
    }, 0);
  };
  const sumSleepDurationTotalMinutes = (
    sleepDates: SleepEntryDataInterface[]
  ) => {
    return sleepDates.reduce((acc, currEl) => {
      const minutes = currEl.sleepDuration.split(":").join(" ").split(" ")[1];
      return Number(minutes) + acc;
    }, 0);
  };
  const calculateAverageSleepDurationHours = (
    sleepDates: SleepEntryDataInterface[],
    sleepDurationMinutes: number,
    sleepDurationHours: number,
    hoursDecimal: number
  ) => {
    console.log(
      Math.floor((sleepDurationMinutes / sleepDates.length + hoursDecimal) / 60)
    );
    return (
      Math.floor(
        (sleepDurationMinutes / sleepDates.length + hoursDecimal) / 60
      ) + Math.floor(sleepDurationHours / sleepDates.length)
    );
  };
  const generateHoursDecimal = (
    sleepDates: SleepEntryDataInterface[],
    sleepDurationHours: number
  ) => {
    return (sleepDurationHours / sleepDates.length).toString().includes(".")
      ? Math.ceil(
          (sleepDurationHours / sleepDates.length).toString().split(".")[1]
            .length > 1
            ? Number(
                (sleepDurationHours / sleepDates.length)
                  .toString()
                  .split(".")[1]
                  .slice(0, 2)
              ) * 0.6
            : Number(
                (sleepDurationHours / sleepDates.length)
                  .toString()
                  .split(".")[1]
                  .slice(0, 1)
              ) * 6
        )
      : 0;
  };

  const calculateAverageSleepDuration = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const {
      target: { value },
    } = e;
    if (!sleepEntries.length) return;

    if (value === "week") {
      const date = new Date();
      const firstDateOfWeek =
        date.getDay() === 1
          ? moment().format()
          : date.getDay() === 0
          ? moment()
              .subtract(date.getDay() + 6, "days")
              .format()
          : moment()
              .subtract(date.getDay() - 1, "days")
              .format();
      const lastDateOfWeek =
        date.getDay() === 0
          ? moment().format()
          : moment()
              .add(7 - date.getDay(), "days")
              .format();

      const sleepDatesForThisWeek = getSleepDurationDateList(
        firstDateOfWeek,
        lastDateOfWeek
      );
      setAverageSleepDurationMonth("");
      setAverageSleepDurationYear("");

      if (!sleepDatesForThisWeek.length) return;

      const sleepDurationHoursTotal = sumSleepDurationTotalHours(
        sleepDatesForThisWeek
      );
      const sleepDurationMinutesTotal = sumSleepDurationTotalMinutes(
        sleepDatesForThisWeek
      );

      const hoursDecimal = generateHoursDecimal(
        sleepDatesForThisWeek,
        sleepDurationHoursTotal
      );

      const averageSleepDurationHours = calculateAverageSleepDurationHours(
        sleepDatesForThisWeek,
        sleepDurationMinutesTotal,
        sleepDurationHoursTotal,
        hoursDecimal
      );
      const averageSleepDurationMinutes = getAverageSleepDurationMinutes(
        sleepDurationMinutesTotal,
        sleepDatesForThisWeek,
        hoursDecimal
      );

      console.log(sleepDatesForThisWeek);
      console.log({
        sleepDurationHoursTotal,
        sleepDurationMinutesTotal,
        hoursDecimal,
      });

      setAverageSleepDurationWeek(
        `${padZero(averageSleepDurationHours)}:${padZero(
          averageSleepDurationMinutes
        )}`
      );
      setAverageSleepDurationMonth("");
      setAverageSleepDurationYear("");
    } else if (value === "month") {
      const monthsDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      const date = new Date();
      const firstDateMonth =
        date.getDate() === 1
          ? moment().format()
          : moment()
              .subtract(date.getDate() - 1, "days")
              .format();
      const lastDateOfMonth =
        date.getDate() === monthsDate[date.getMonth()]
          ? moment().format()
          : moment()
              .add(monthsDate[date.getMonth()] - date.getDate(), "days")
              .format();

      const sleepTimesForThisMonth = getSleepDurationDateList(
        firstDateMonth,
        lastDateOfMonth
      );
      setAverageSleepDurationWeek("");
      setAverageSleepDurationYear("");
      if (!sleepTimesForThisMonth.length) return;

      const sleepDurationHoursTotal = sumSleepDurationTotalHours(
        sleepTimesForThisMonth
      );
      const sleepDurationMinutesTotal = sumSleepDurationTotalMinutes(
        sleepTimesForThisMonth
      );

      const hoursDecimal = generateHoursDecimal(
        sleepTimesForThisMonth,
        sleepDurationHoursTotal
      );

      const averageSleepDurationHours = calculateAverageSleepDurationHours(
        sleepTimesForThisMonth,
        sleepDurationMinutesTotal,
        sleepDurationHoursTotal,
        hoursDecimal
      );
      const averageSleepDurationMinutes = getAverageSleepDurationMinutes(
        sleepDurationMinutesTotal,
        sleepTimesForThisMonth,
        hoursDecimal
      );
      setAverageSleepDurationMonth(
        `${padZero(averageSleepDurationHours)}:${padZero(
          averageSleepDurationMinutes
        )}`
      );
      setAverageSleepDurationWeek("");
      setAverageSleepDurationYear("");
    } else if (value === "year") {
      const date = new Date();
      const sleepTimesForThisYear = sleepEntries.filter((entry) => {
        console.log(entry.sleepDate, entry.sleepDate.slice(0, 4));
        return date.getFullYear() === Number(entry.sleepDate.slice(0, 4));
      });
      setAverageSleepDurationWeek("");
      setAverageSleepDurationMonth("");
      if (!sleepTimesForThisYear.length) return;

      const sleepDurationHoursTotal = sumSleepDurationTotalHours(
        sleepTimesForThisYear
      );
      const sleepDurationMinutesTotal = sumSleepDurationTotalMinutes(
        sleepTimesForThisYear
      );

      const hoursDecimal = generateHoursDecimal(
        sleepTimesForThisYear,
        sleepDurationHoursTotal
      );

      const averageSleepDurationHours = calculateAverageSleepDurationHours(
        sleepTimesForThisYear,
        sleepDurationMinutesTotal,
        sleepDurationHoursTotal,
        hoursDecimal
      );
      const averageSleepDurationMinutes = getAverageSleepDurationMinutes(
        sleepDurationMinutesTotal,
        sleepTimesForThisYear,
        hoursDecimal
      );

      setAverageSleepDurationYear(
        `${padZero(averageSleepDurationHours)}:${padZero(
          averageSleepDurationMinutes
        )}`
      );
      setAverageSleepDurationMonth("");
      setAverageSleepDurationWeek("");
    } else {
      setAverageSleepDurationWeek("");
      setAverageSleepDurationMonth("");
      setAverageSleepDurationYear("");
    }
  };
  return (
    <Box>
      <Heading mb="3" fontSize={{ base: "15", sm: "17", md: "20" }} as="h3">
        Average Sleep Duration
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
        onChange={calculateAverageSleepDuration}
      >
        <option value=""></option>
        <option value="week">Average Sleep Duration for Week</option>
        <option value="month">Average Sleep Duration for Month</option>
        <option value="year">Average Sleep Duration for Year</option>
      </Select>
      <Text fontWeight="bold" mt="5">
        {averageSleepDurationWeek
          ? `Average Sleep Duration For This Week: ${averageSleepDurationWeek}`
          : averageSleepDurationMonth
          ? `Average Sleep Duration For This Month: ${averageSleepDurationMonth}`
          : averageSleepDurationYear
          ? `Average Sleep Duration For This Year: ${averageSleepDurationYear}`
          : ""}
      </Text>
    </Box>
  );
};

export default AverageSleepDuration;
