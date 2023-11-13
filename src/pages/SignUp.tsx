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
 
  validateLastName,
  validatePassword,
  validateUsername,
} from "../service/MenuValidationService";
import { CircularProgress } from "@mui/material";
import { useRegisterMutation } from "../redux/api/apiSlice";


interface ClickHandler {
  (event: MouseEvent): void;
}

const Signup: React.FC = () => {
  const [passwordShown, setPasswordShown] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");

  const [text, setText] = useState("Hide");
  const [showPassword, setShowPassword] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm: ClickHandler = async (event ) => {
    event.preventDefault();

    let validationFailed = false;
   
   
    if (!validatePassword(password)) {
      toast.error("Password is a compulsory field");
      validationFailed = true;
    }
    if (!validateLastName(name)) {
      toast.error("name is a compulsory field");
      validationFailed = true;
    }

    if (!validateUsername(username)) {
      toast.error("username is a compulsory field");
    }

    if (validationFailed) {
      return;
    }

    try {
      const data = {
        password,
        username,
        name,
      };

      const response = await register(data).unwrap();

      if (response) {
        toast.success("Successfully created user");
        navigate("/login");
      }
    } catch (err) {
      if (err instanceof Error && err.message) {
        toast.error(err.message);
      } else {
        // Handle other cases or log the unknown error
        console.error('Unknown error:', err);
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

  return (
    <div>
      <MainDiv>
        <FormContainer>
          <FormBox>
            <Text> Create an account</Text>
            <Form>
              <Flex>
                <InputDiv>
                  <label htmlFor="name">Name</label> <br />
                  <InputField>
                    <input
                      id="Firstname"
                      type="text"
                      placeholder="Enter your first name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </InputField>
                </InputDiv>
                <InputDiv>
                  <label htmlFor="username">Username</label> <br />
                  <PasswordDiv>
                    <input
                      id="username"
                      type="text"
                      placeholder="Enter your  username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </PasswordDiv>
                </InputDiv>
              </Flex>
              <Flex>
                <InputDiv>
                  <label htmlFor="password">Password</label> <br />
                  <PasswordOnlyDiv>
                    <input
                      id="password"
                      type={passwordShown ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <EyeIcon>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </EyeIcon>
                  </PasswordOnlyDiv>
                </InputDiv>
              </Flex>
              {isLoading ? (
                <SubmitBtn type="submit" onClick={(event: React.MouseEvent<Element, MouseEvent>): void => submitForm(event)}>
                  <CircularProgress style={{ color: "#FFF" }} />
                </SubmitBtn>
              ) : (
                <SubmitBtn type="submit" onClick={(event: React.MouseEvent<Element, MouseEvent>): void => submitForm(event)}>
                  Create Account
                </SubmitBtn>
              )}
              <NoAccount>
                <p>Already have an account? </p>
                <SignUpBtn href="/login">Sign in</SignUpBtn>
              </NoAccount>
            </Form>
          </FormBox>
        </FormContainer>
      </MainDiv>
    </div>
  );
}

export default Signup;

const MainDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FormContainer = styled.div`
  background-color: #164863;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1000px) {
    background: none;
  }
`;


 const FormBox = styled.div`
  width: 500px;
  background-color: #fff;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 45px;
  gap: 0;
  img {
    margin-bottom: 30px;
  }
`;

const SubmitBtn = styled.button`
  border: none;
  margin-top: 30px;
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
  font-family: "Inter", sans-serif;
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
  font-size: 22px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-bottom: 7px;
  margin: 0 auto;
`;

const InputDiv = styled.div`
  width: 100%;
  margin-top: 30px;
  input {
    width: 100%;
    height: 2rem;
    margin-top: 2px;
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
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const InputField = styled.div`
  border-radius: 12px;
  border: 1px solid rgba(102, 102, 102, 0.35);
  padding: 13px;
`;

const PasswordOnlyDiv = styled.div`
  border-radius: 12px;
  border: 1px solid rgba(102, 102, 102, 0.35);
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PasswordDiv = styled.div`
  border-radius: 12px;
  border: 1px solid rgba(102, 102, 102, 0.35);
  padding: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const EyeIcon = styled.div`
  display: flex;
  align-items: center;
  margin: 0px;
  padding: 0px;
  cursor: pointer;
  p {
    color: rgba(102, 102, 102, 0.8);
    text-align: right;
    font-size: 18px;
    font-family: "Inter", sans-serif;
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
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    @media (max-width: 360px) {
      font-size: 13px;
    }
  }
`;

const SignUpBtn = styled.a`
  color: #666;
  font-size: 18px;
  font-family: "Inter", sans-serif;
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
