import { apiSlice } from '../../api/apiSlice';

export const employeeSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        newEmployee: builder.mutation({
            query: (data) => {
                var bodyFormData = new FormData();

                for (var key in data) {
                    console.log(key);
                    if (key == 'profile_picture') {
                        bodyFormData.append('profile_picture', data[key].file);
                    } else bodyFormData.append(key, JSON.stringify(data[key]));
                }

                return {
                    url: `employee`,
                    method: 'POST',
                    formData: true,
                    body: bodyFormData,
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
    }),
});

export const { useNewEmployeeMutation, useEditEmployeeMutation } = employeeSlice;
