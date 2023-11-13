import { createSlice } from "@reduxjs/toolkit";
import {JwtHeader, JwtPayload, jwtDecode} from "jwt-decode";
import TokenService, { TokenObject } from "../../../service/TokenService";


interface AuthState {
  user: JwtHeader | JwtPayload | null | undefined; 
  token:{accessToken: string}  | null| TokenObject; 
  isLoggedIn: boolean;
}


const initialState: AuthState = {
  user: TokenService.getUser(),
  token: TokenService.getToken(),
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { response } = action.payload;
      console.log("redux slice>>>",response);

      //decode and store current user
      const decodedUser = jwtDecode(response?.token);
      console.log("decoded user", typeof decodedUser, decodedUser);
      //store user in state
      state.user = decodedUser;
      console.log(state.user);
      state.token = response.token as TokenObject;

      console.log(typeof state.token);
      if (state.user === decodedUser) {
        state.isLoggedIn = true;
      }
      
      TokenService.updateLocalAccessToken(state.token);
      console.log(TokenService.updateLocalAccessToken(state.token));
    },
   
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;


