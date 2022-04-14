import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import SignInForm from "../components/SignInForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import Copyright from "../components/Copyright";

const theme = createTheme();

const LoginPage = () => {
  const { isAuth, error, status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      console.log(isAuth);
      navigate("/");
    }
    if (error) {
        console.log(error)
    }
  }, [isAuth, error, status, dispatch, navigate]);

  const handleLogin = (username, password) => {
    dispatch(login({ username, password }));
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <SignInForm handleClick={handleLogin} />
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default LoginPage;
