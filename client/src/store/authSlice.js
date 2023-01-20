import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  posts: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", action.payload.user);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
  },
});

export const { setLogin, setLogout, setPosts } = authSlice.actions;
export default authSlice.reducer;
