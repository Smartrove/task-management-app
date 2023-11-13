import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  setCredentials,
} from "../redux/features/auth/authSlice";
import { CircularProgress } from "@mui/material";
import { useLoginMutation } from "../redux/api/apiSlice";
import {loginErrorHandler} from '../../utils/errorHandler.js'
import { ErrorResponseType } from "../../utils/errorHandlerTypes.js";

interface ClickHandler {
  (event: MouseEvent): void;
}

const Login: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [disable, setDisable] = React.useState(true);
  const [passwordShown, setPasswordShown] = React.useState(false);
  const [text, setText] = useState("Hide");
  const [showPassword, setShowPassword] = React.useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const loginNewUser: ClickHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await login({ username, password }).unwrap();
      console.log("user response>>>", response.token);
  
      // Assuming `response.token` is the correct property
      if (response.token) {
        toast.success("user logged in successfully");
        navigate("/");
        dispatch(setCredentials({ response, username }));
      } else {
        // Handle the case where the token is not present in the response
        console.error('Token not found in response:', response);
      }
    } catch (err) {
      const error = loginErrorHandler(err as ErrorResponseType);
      // Handle errors
      if (err instanceof Error && err.message) {
        toast.error(error);
        console.log(error);
      } else {
        console.error('Unknown error:', error);
      }
    }
  };
  

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    if (passwordShown === true) {
      setText("Hide");
    } else {
      setText("Show");
    }
  }, [passwordShown]);

  useEffect(() => {
    if (username === "" || password === ""){
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [username, password]);

  return (
    <Container>
      <MainDiv>
        <FormContainer>
          <FormBox>
            <Text> Welcome Back </Text>
            <SignUpText>
              Sign in with your username and Password
            </SignUpText>
            <Form>
              <InputDiv>
                <label htmlFor="username">Username</label> <br />
                <InputField>
                  <input
                    id="username"
                    name="username"
                    type="username"
                    placeholder="Enter your username"
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputField>
              </InputDiv>
              <InputDiv>
                <label htmlFor="password">Password</label> <br />
                <PasswordDiv>
                  <input
                    id="password"
                    type={passwordShown ? "text" : "password"}
                    placeholder="Enter your password"
                    name="password"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <EyeIcon>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    {/* <p>{text}</p> */}
                  </EyeIcon>
                </PasswordDiv>
              </InputDiv>

              {isLoading ? (
                <SubmitBtn>
                  <CircularProgress style={{ color: "#fff" }} />
                </SubmitBtn>
              ) : (
                <SubmitBtn
                  disabled={disable}
                  name="submit"
                  type="submit"
                  onClick={(e) => loginNewUser(e)}
                >
                  log in
                </SubmitBtn>
              )}
              <NoAccount>
                <p>Don&apos;t have an account? </p>
                <SignUpBtn href="/register">Sign Up</SignUpBtn>
              </NoAccount>
            </Form>
          </FormBox>
        </FormContainer>
      </MainDiv>
    </Container>
  );
}

export default Login


export const Container = styled.div`
  max-width: 110rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const MainDiv = styled.div`
  width: 100%;
  height: 100%;
`;

export const FormContainer = styled.div`
  background-color: #164863;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1000px) {
    background: none;
  }
`;

const FormBox = styled.div`
  width: 486px;
  /* height: 580px; */
  background-color: #fff;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 45px;
  gap: 0;
  @media (max-width: 1000px) {
    /* width: 100vw; */
    /* height: 100%; */
  }
  img {
    margin-bottom: 30px;
  }
`;

export const SubmitBtn = styled.button`
  border: none;
  margin-top: 50px;
  display: flex;
  cursor: pointer;
  padding: 15px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #427D9D;
  width: 100%;
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:disabled {
    opacity: 0.25;
    background: #427D9D;
    cursor: not-allowed;
  }
`;

const Form = styled.form`
  width: 100%;
`;

const Text = styled.h4`
  color: #333;
  text-align: center;
  font-size: 32px;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-bottom: 7px;
  margin: 0 auto;
`;

const SignUpText = styled.h6`
  color: #333;
  text-align: center;
  font-size: 16px;
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0 auto;
`;

const InputDiv = styled.div`
  width: 100%;
  margin-top: 30px;
  input {
    width: 100%;
    height: 1.6rem;
    margin-top: 5px;
    outline: none;
    border: none;
    color: rgba(102, 102, 102, 0.6);
    font-size: 16px;
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  label {
    color: #666;
    font-size: 16px;
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const InputField = styled.div`
  border-radius: 12px;
  border: 1px solid rgba(102, 102, 102, 0.35);
  padding: 15px;
`;

const PasswordDiv = styled.div`
  border-radius: 12px;
  border: 1px solid rgba(102, 102, 102, 0.35);
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const EyeIcon = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  cursor: pointer;
  p {
    color: rgba(102, 102, 102, 0.8);
    text-align: right;
    font-size: 18px;
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 5px;
    @media (max-width: 378px) {
      display: none;
    }
  }
`;



const NoAccount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  gap: 1;
  p {
    color: #666;
    font-size: 18px;
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    @media (max-width: 378px) {
      font-size: 13px;
    }
  }
`;

const SignUpBtn = styled.a`
  color: #666;
  font-size: 18px;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-decoration: underline;
  margin-left: 3px;
  cursor: pointer;
  @media (max-width: 378px) {
    font-size: 13px;
  }
`;
