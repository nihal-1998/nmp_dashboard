/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import TagTypes from "../../../constant/tagType.constant.ts";
import { getToken } from "../../../helper/SessionHelper.ts";
import { ErrorToast } from "../../../helper/ValidationHelper.ts";

export const baseUrl = "https://backend.qwikr.us/api/v1";
//export const baseUrl = "http://10.10.20.24:9090/api/v1";
//export const baseUrl = "https://nmp-backend.vercel.app/api/v1";


const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: async (headers) => {
    if (getToken()) {
      headers.set("Authorization", getToken() as string);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
      localStorage.clear();
      ErrorToast("Authorization Expired");
      window.location.href = "/";
    }
    return result;
  },
  tagTypes: Object.values(TagTypes), //TagS WhiteLists
  endpoints: (_builder) => ({}),
});
