import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  IconButton,
  InputBase,
  Typography,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Avatar,
  Select,
} from "@mui/material";
import {
  Search,
  DarkMode,
  Notifications,
  Help,
  Menu,
  Close,
  Message,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showCelebrationEffect, setShowCelebrationEffect] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  const handleMessagesClick = () => {
    // Your code for handling messages click
  };

  const handleCloseNotifications = () => {
    setNotifications([]);
  };

  const handleSearch = async () => {
    try {
      const results = await searchUsers(searchInput);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const searchUsers = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://tb-1.onrender.com/search?query=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error searching users:", error);
      throw error;
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSearchResults([]);
    navigate(`/profile/${user.id}`); // Navigate to the profile of the selected user
  };
  const renderSearchResults = () => {
    const maxResults = 5; // Maximum number of search results to display
    const displayedResults = searchResults.slice(0, maxResults); // Get only the first `maxResults` results
    return (
      <Box
        width="100%"
        display={isNonMobileScreens ? "block" : "none"}
        mt="1.5rem"
        ml="1.5rem" // Add margin to move the search results away from the input box
        maxHeight="200px" // Adjust the maximum height of the box to reduce its length
        overflowY="auto" // Enable vertical scrolling if the content exceeds the maximum height
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          backgroundColor={neutralLight}
          borderRadius="1px"
          boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
          padding="1.1rem"
        >
          {displayedResults.map((user) => (
            <Box
              key={user.id}
              onClick={() => handleUserSelect(user)}
              sx={{
                cursor: "pointer",
                marginBottom: "1.5rem",
                "&:last-child": {
                  marginBottom: 0,
                },
              }}
            >
              <Box display="flex" alignItems="center">
                <Avatar src={user.avatar || 'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?size=626&ext=jpg&ga=GA1.1.234903473.1708700866&semt=sph'} alt={`${user.firstName} ${user.lastName}`} sx={{ mr: "1rem" }} />
                <Typography>
                  <b>{user.firstName} {user.lastName}</b>
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <IconButton onClick={() => setSearchResults([])} sx={{ alignSelf: "flex-end", mr: "1rem" }}>
          <Close />
        </IconButton>              
      </Box>
    );
  };
        const handleInputChange = (event) => {
    const input = event.target.value;
    setSearchInput(input);
    if (input !== "") {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  };

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem" alignItems="center">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Lets Connect
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase
  placeholder="Search..."
  value={searchInput}
  onChange={handleInputChange}
  sx={{
    width: "100px", // Set the width to make the search box wider
    padding: "5px", // Increase the padding for better visual appearance
    fontSize: "1rem", // Adjust the font size if needed
    borderRadius: "5px", // Add border radius for rounded corners
  // Change background color if desired
  }}
/>

            <IconButton onClick={handleSearch}>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* Display search results below the input box */}
      {searchResults.length > 0 && renderSearchResults()}

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            <DarkMode sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton>
            <Message sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton onClick={handleMessagesClick}>
            <Notifications sx={{ fontSize: "25px" }} />
          </IconButton>
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>{fullName}</MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              <DarkMode sx={{ fontSize: "25px" }} />
            </IconButton>
            <IconButton onClick={handleMessagesClick}>
              <Message sx={{ fontSize: "25px" }} />
            </IconButton>
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>{fullName}</MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}

      {/* Display Notifications with Celebration Effect */}
      {notifications.length > 0 && (
        <Box
          className={showCelebrationEffect ? "celebration-effect" : ""}
          position="flex"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1000"
          padding="16px"
          backgroundColor="white"
          borderRadius="8px"
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
        >
          <IconButton
            onClick={handleCloseNotifications}
            sx={{ position: "absolute", top: "8px", right: "8px", color: dark }}
          >
            <Close />
          </IconButton>
          {notifications.map((notification) => (
            <Box
              key={notification.id}
              display="flex"
              alignItems="center"
              mb="1rem"
            >
              <Avatar
                src={notification.avatar}
                alt={notification.sender}
                sx={{ mr: "1rem" }}
              />
              <Typography variant="body1" sx={{ color: "black" }}>
                <b>{notification.sender}</b>: {notification.message} (
                {notification.timestamp})
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
