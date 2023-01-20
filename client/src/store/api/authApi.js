import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (build) => ({
    register: build.mutation({
      query: (user) => ({
        url: "auth/register",
        method: "POST",
        body: user,
      }),
    }),
    login: build.mutation({
      query: (user) => ({
        url: "auth/login",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
