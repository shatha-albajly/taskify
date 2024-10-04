import { createApi } from "@reduxjs/toolkit/query";

import { fetchBaseQuery } from "@reduxjs/toolkit/query";
export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: [],
    endpoints: (builder:any) => ({
        getSomething: builder.query({
          
        }),
        // Other endpoints here
    }),
});



