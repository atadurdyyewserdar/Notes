import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

const SignInForm = ({ handleClick, loginLoading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { error } = useSelector((state) => state.auth);

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box display="flex" alignItems="flex-start" flexDirection="column" width="100%" noValidate sx={{ mt: 1 }}>
        {error && (
          <Grid sx={{ backgroundColor: "#d9d9d9", width: "100%", borderRadius: 2 }}>
            <Typography fontSize={14} color="red">
              {error}
            </Typography>
          </Grid>
        )}
        <Grid>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => handleClick(username, password)}>
            Sign In
          </Button>
          <Grid item>
            <Link to="/register">Don't have an account? Sign Up</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignInForm;
