import React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

const pages = [
  {
    title: "Task 1",
    to: "/",
  },
  {
    title: "Task 2",
    to: "/task2",
  },
  {
    title: "Task 3",
    to: "/task3",
  },
  {
    title: "Task 4",
    to: "/task4",
  },
];

export const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ mb: 5 }} color={"primary"}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            KIS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ title, to }) => (
              <Button
                key={to}
                onClick={() => navigate(to)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
