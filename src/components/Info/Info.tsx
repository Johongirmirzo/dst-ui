import React from "react";
import { Link } from "react-router-dom";
import { Heading, Container, Text, Button } from "@chakra-ui/react";

const Info = () => {
  return (
    <Container mt="20">
      <Heading>What Is Daily Sleep Tracker?</Heading>
      <Text mt="5" fontWeight="600" color="#333" fontSize="18">
        Daily Sleep Tracker is the app which let's track your weekly sleep
        schedules. It displays graph which let's you see your sleeping patterns
        and table which let's see you see your sleep date, sleep time, wakeup
        time and sleep duration. You can also edit, delete individual sleeping
        entries
      </Text>

      <Text mt="5" fontWeight="bold">
        Please register or login to be able to use the app
      </Text>
      <Button as={Link} to="/register" mt="3" colorScheme="blue" color="white">
        Register
      </Button>
      <Button
        as={Link}
        to="/login"
        mt="3"
        ms="5"
        border="2px"
        bgColor="#dbd9d9"
        borderColor="#999"
      >
        Login
      </Button>
    </Container>
  );
};

export default Info;
