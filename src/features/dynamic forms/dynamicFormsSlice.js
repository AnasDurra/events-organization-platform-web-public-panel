import { apiSlice } from '../../api/apiSlice';
import { v4 as uuidv4 } from 'uuid';

export const dynamicFormsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getForms: builder.query({
            query: (organization_id) => `/forms/organization/${organization_id}`,
            providesTags: ['forms'],
        }),
        getForm: builder.query({
            query: (form_id) => `/forms/${form_id}`,
            transformResponse: (responseData) => {
                const sortedGroups = responseData.result.groups.sort((a, b) => a.position - b.position);

                const transformedGroups = sortedGroups.map((group, index) => ({
                    ...group,
                    position: index,
                    fields: group.fields
                        .sort((a, b) => a.position - b.position)
                        .map((field, index) => ({
                            ...field,
                            position: index,
                        })),
                }));

                return {
                    ...responseData,
                    result: {
                        ...responseData.result,
                        groups: transformedGroups,
                    },
                };
            },
            providesTags: ['form'],
        }),
        addNewForm: builder.mutation({
            query: (initialForm) => ({
                url: '/forms',
                method: 'POST',
                body: initialForm,
            }),
            invalidatesTags: ['forms'],
        }),
        addNewGroup: builder.mutation({
            query: (initialGroup) => ({
                url: '/forms/addGroup',
                method: 'POST',
                body: initialGroup,
            }),
            invalidatesTags: ['form'],
            async onQueryStarted({ initialGroup, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getForm', initialGroup.form_id, (draft) => {
                        console.log('draft: ', draft);

                        draft.splice(patch.position - 1, 0, {
                            id: uuidv4(),
                            fields: [],
                            name: `group ${draft?.length ? draft.length + 1 : uuidv4()}`,
                        });

                    })
                );
                console.log("hi ",id)
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        addNewField: builder.mutation({
            query: ({ fields, group_id }) => ({
                url: `/forms/addField/${group_id}`,
                method: 'POST',
                body: fields,
            }),
            invalidatesTags: ['form'],
        }),
        submitForm: builder.mutation({
            query: (data) => ({
                url: `/forms/fillForm`,
                method: 'POST',
                body: data,
            }),
        }),
        updateForm: builder.mutation({
            query: ({ fields, form_id }) => ({
                url: `/forms/${form_id}`,
                method: 'PATCH',
                body: fields,
            }),
            invalidatesTags: ['form'],
        }),
        updateGroup: builder.mutation({
            query: ({ fields, group_id }) => ({
                url: `/forms/group/${group_id}`,
                method: 'PATCH',
                body: fields,
            }),
            invalidatesTags: ['form'],
        }),
        updateGroupField: builder.mutation({
            query: (data) => ({
                url: `/forms/field`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['form'],
        }),

        removeGroup: builder.mutation({
            query: ({ group_id }) => ({
                url: `/forms/deleteGroup/${group_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['form'],
        }),
        removeField: builder.mutation({
            query: ({ field_id }) => ({
                url: `/forms/deleteField/${field_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['form'],
        }),
    }),
});

export const {
    useGetFormsQuery,
    useAddNewFormMutation,
    useGetFormQuery,
    useUpdateFormMutation,
    useAddNewGroupMutation,
    useUpdateGroupMutation,
    useAddNewFieldMutation,
    useRemoveGroupMutation,
    useUpdateGroupFieldMutation,
    useRemoveFieldMutation,
    useSubmitFormMutation,
} = dynamicFormsSlice;
