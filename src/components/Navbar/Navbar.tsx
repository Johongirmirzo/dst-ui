import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ThemeChanger from "../ThemeChanger/ThemeChanger";
import { logoutUser } from "../../api/user";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, removeUserFromStore } = useContext(AuthContext);

  const logoutUserFromApp = async () => {
    try {
      await logoutUser();
      removeUserFromStore();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      boxShadow="md"
      p="4"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection={{ base: "column", sm: "row" }}
    >
      <Heading fontSize={{ base: "20", sm: "25", md: "30" }}>
        <Link to="/">Daily Sleep Tracker</Link>
      </Heading>
      <Box display="flex" alignItems="center" gap="4">
        {Object.keys(user).length > 0 ? (
          <>
            <Heading fontSize={{ base: "15", sm: "20", md: "24" }}>
              Hello {user && user.username}
            </Heading>
            <ThemeChanger />
            <Button onClick={logoutUserFromApp} colorScheme="red">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              as={Link}
              to="/register"
              me="4"
              colorScheme="blue"
              color="white"
            >
              Register
            </Button>
            <Button as={Link} to="/login" colorScheme="green">
              Login
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
