import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://todo.timurbek-saburov.space", prepareHeaders: (headers) => {
            if (true) {
                headers.set('Authorization', `Bearer ${localStorage.getItem('token') || null}`);
            }
            return headers;
        }
    },
    ),
    tagTypes: ['Todos'],
    keepUnusedDataFor: 20,
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todo/users/1',
            providesTags: ['Todos']
        }),
        addTodo: builder.mutation({
            query: (newTodo) => ({
                url: '/todo',
                method: 'POST',
                body: newTodo
            }),

            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todo/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todos']
        }),
        editCompleted: builder.mutation({
            query: (todo) => ({
                url: `todo/${todo.id}`,
                method: 'PUT',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
    })
})

export const { useGetTodosQuery, useDeleteTodoMutation, useAddTodoMutation, useEditCompletedMutation } = apiSlice