import { apiSlice } from '../../api/apiSlice';

export const employeeSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPermissions: builder.query({
            query: () => `/permissions`,
        }),
        newEmployee: builder.mutation({
            query: (body) => {
                return {
                    url: `employee`,
                    method: 'POST',
                    body: body,
                };
            },
            invalidatesTags: ['one-org'],
        }),
        editProfilePic: builder.mutation({
            query: ({ id, file }) => {
                return {
                    url: `employee/updateProfilePicture/${id}`,
                    method: 'POST',
                    body: { profile_picture: file },
                };
            },
            invalidatesTags: ['one-org'],
        }),

        editEmployee: builder.mutation({
            query: (data) => {
                return {
                    url: `employee/${data?.employee?.id}`,
                    method: 'PATCH',
                    body: { ...data, employee: undefined },
                };
            },
            invalidatesTags: ['one-org'],
        }),

        removeEmployee: builder.mutation({
            query: (id) => {
                return {
                    url: `employee/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['one-org'],
        }),
        removeEmployeeProfilePic: builder.mutation({
            query: (id) => {
                return {
                    url: `employee/profilePicture/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['one-org'],
        }),
    }),
});

export const { useNewEmployeeMutation, useEditEmployeeMutation, useGetPermissionsQuery, useRemoveEmployeeMutation ,useRemoveEmployeeProfilePicMutation} =
    employeeSlice;
