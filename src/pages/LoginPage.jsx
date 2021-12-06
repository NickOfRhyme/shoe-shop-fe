import React, { useContext } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { UserContext } from "../contexts/UserContext";
import { navigate } from "@reach/router";

export default function LoginPage() {
  const users = {
    "Steve Bennett": {
      id: 1,
      role: "customer",
    },
    "Anna Navarre": {
      id: 2,
      role: "customer",
    },
    admin: {
      id: 3,
      role: "admin",
    },
  };

  const { user, changeUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    console.log(e);
    console.log(data);

    changeUser(users[data.get("name")] ?? null);
    navigate("/");
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='name'
            label='Name'
            name='name'
            autoComplete='name'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
