
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import TokenService from '../../service/TokenService';

const apiLink =
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_APP_BACKEND_PROD as string
    : import.meta.env.VITE_APP_BACKEND_DEV as string;


    const userToken = TokenService.getLocalAccessToken()
    console.log(`UserToken: ${userToken}`);
    // const baseQuery = fetchBaseQuery({
    //   baseUrl: apiLink,
    //   prepareHeaders: (headers) => {
    //     const token = userToken; // Replace with your actual token retrieval logic
    //     if (token) {
    //       headers.set('Authorization', `Bearer ${token}`);
    //     }
    //     return headers;
    //   },
    // });



interface TaskType {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
}

export interface CrudApi {
  useGetTaskQuery: (id: string) => TaskType;
  // Add other endpoint methods as needed
}

export const crudApi = createApi({
 
  reducerPath: 'crudApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiLink,
    prepareHeaders: (headers: HeadersInit) => {
      const token = userToken;
      console.log("header token", token);
    
      const updatedHeaders = new Headers(headers);
    
      if (token) {
        updatedHeaders.set('Authorization', `Bearer ${token}`);
      }
    
      return updatedHeaders;
    },
  }),
  endpoints: (builder) => ({
    getAllTasks: builder.query<TaskType, string>({
      query: () => ({
        url: "/task",
      }),
    }),
    getTask: builder.query<TaskType, string>({
      query: (id) => ({
        url: `/task/:${id}`,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method:'POST',
        body: { ...data },
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method:'POST',
        body: { ...data },
      }),
    }),

    createTask: builder.mutation({
      query: (data) => ({
        url: "/task?limit=5",
        method:'POST',
        body: { ...data },
      }),
    }),
    updateTask: builder.mutation({
      query: ({id, ...data}) => ({
        url: `/task/${id}`,
        method:'PATCH',
        body:data ,
      }),
    }),
    deleteTask: builder.mutation({
      query: ({id}) => ({
        url: `/task/${id}`,
        method:'DELETE',
        body: { ...id },
      }),
    }),
  }),
  
});

// Explicitly define the type of crudApi
//@ts-expect-error token
export const { useGetTaskQuery, useGetAllTasksQuery, useLoginMutation, useRegisterMutation, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = crudApi;
export type { TaskType };
export type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
export type { EndpointDefinitions } from '@reduxjs/toolkit/dist/query/endpointDefinitions';






