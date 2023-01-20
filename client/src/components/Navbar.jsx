import { Notifications, Pets } from "@mui/icons-material";
import { AppBar, Avatar, Badge, Box, Menu, MenuItem, styled, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice.js";
import { useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogOut = async () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          Home
        </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Icons>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
          <Avatar sx={{ width: 30, height: 30 }} src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" onClick={(e) => setOpen(true)} />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar sx={{ width: 30, height: 30 }} src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
          <Typography variant="span">John</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => handleLogOut()}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
