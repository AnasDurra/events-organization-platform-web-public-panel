import { FaCommentsDollar } from 'react-icons/fa';
import { apiSlice } from '../../api/apiSlice';
import { v4 as uuidv4 } from 'uuid';
import { current } from '@reduxjs/toolkit';

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
                            options: Array.isArray(field.options)
                                ? field.options.sort((a, b) => a.id.localeCompare(b.id))
                                : undefined,
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
        getFormEvents: builder.query({
            query: (form_id) => `/forms/${form_id}/events`,
        }),
        getFormFieldTypes: builder.query({
            query: () => `/forms/fieldsTypes`,
        }),
        querySubmissions: builder.mutation({
            query: (data) => ({
                url: '/forms/query',
                method: 'POST',
                body: data,
            }),
            providesTags: ['form-query'],
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
            async onQueryStarted(initialGroup, { dispatch, queryFulfilled }) {
                console.log(initialGroup);
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getForm', initialGroup.form_id, (draft) => {
                        draft?.result?.groups?.splice(initialGroup.position - 1, 0, {
                            id: uuidv4(),
                            fields: [],
                            name: `group ${draft.result?.groups?.length ? draft.result?.groups.length + 1 : uuidv4()}`,
                        });
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        addNewField: builder.mutation({
            query: ({ fields, group_id, form_id }) => ({
                url: `/forms/addField/${group_id}`,
                method: 'POST',
                body: fields,
            }),
            invalidatesTags: ['form'],
            async onQueryStarted({ fields, group_id, form_id }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getForm', form_id, (draft) => {
                        draft?.result?.groups
                            ?.find((grp) => grp.id == group_id)
                            .fields.splice(fields.position - 1, 0, {
                                ...fields,
                                id: uuidv4(),
                                fieldType: { id: fields.type_id },
                            });

                        draft?.result?.groups
                            ?.find((grp) => grp.id == group_id)
                            .fields.forEach((field, index) => (field.position = index));
                        // console.log('draft: ', current(draft));
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
        addNewFieldOption: builder.mutation({
            query: ({ field_id, name }) => ({
                url: `forms/addOption`,
                method: 'POST',
                body: { field_id, name },
            }),
            invalidatesTags: ['form'],
        }),
        addValidationRule: builder.mutation({
            query: (body) => ({
                url: `forms/validationRule`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['form'],
        }),
        submitForm: builder.mutation({
            query: (data) => ({
                url: `/forms/fillForm`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['did-fill-form', 'tickets-balance'],
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
            query: ({ fields, group_id, isNewPosition, form_id }) => ({
                url: `/forms/group/${group_id}`,
                method: 'PATCH',
                body: fields,
            }),
            invalidatesTags: ['form'],
            async onQueryStarted({ fields, group_id, isNewPosition, form_id }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getForm', form_id, (draft) => {
                        if (isNewPosition && draft && draft.result && Array.isArray(draft.result.groups)) {
                            const { groups } = draft.result;
                            const currentIndex = groups.findIndex((group) => group.id == group_id);
                            if (currentIndex != -1) {
                                const newPosition = fields.position - 1;

                                const removedGroup = groups.splice(currentIndex, 1)[0];

                                const newIndex = Math.min(Math.max(0, newPosition), groups.length);

                                groups.splice(newIndex, 0, removedGroup);

                                groups.forEach((group, index) => {
                                    group.position = index;
                                });
                                draft.result.groups = groups;
                            }
                        }
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
        updateGroupField: builder.mutation({
            query: ({ fields, form_id, isNewPosition, isNewGroup }) => ({
                url: `/forms/field`,
                method: 'PATCH',
                body: fields,
            }),
            invalidatesTags: ['form'],
            async onQueryStarted({ fields, form_id, isNewPosition, isNewGroup }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getForm', form_id, (draft) => {
                        if (isNewPosition && draft && draft.result && Array.isArray(draft.result.groups)) {
                            const { groups } = draft.result;
                            const currentGroupIndex = groups.findIndex((group) =>
                                group.fields.some((field) => field.id == fields.field_id)
                            );
                            console.log('ew ', isNewGroup);

                            if (currentGroupIndex !== -1) {
                                console.log('ew ', isNewGroup);

                                const currentGroup = groups[currentGroupIndex];
                                const fieldIndex = currentGroup.fields.findIndex(
                                    (field) => field.id == fields.field_id
                                );
                                if (fieldIndex !== -1) {
                                    const removedField = currentGroup.fields.splice(fieldIndex, 1)[0];

                                    currentGroup.fields.forEach((field, index) => {
                                        field.position = index;
                                    });

                                    console.log('ew ', isNewGroup);
                                    const targetGroupIndex = groups.findIndex(
                                        (group) => group.id == (isNewGroup ? isNewGroup : currentGroup.id)
                                    );

                                    if (targetGroupIndex !== -1) {
                                        const targetGroup = groups[targetGroupIndex];
                                        targetGroup.fields.splice(fields.position - 1, 0, removedField);
                                        targetGroup.fields.forEach((field, index) => {
                                            field.position = index;
                                        });
                                    }

                                    draft.result.groups[currentGroupIndex] = currentGroup;
                                }
                            }
                        }
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
        updateFieldOptionName: builder.mutation({
            query: (data) => ({
                url: `/forms/field/option`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['form'],
        }),
        updateSubmissionStatus: builder.mutation({
            query: (body) => ({
                url: `/attend-event/manage`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['form-query'],
        }),
        removeGroup: builder.mutation({
            query: ({ group_id, form_id }) => ({
                url: `/forms/deleteGroup/${group_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['form'],
            async onQueryStarted({ group_id, form_id }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getForm', form_id, (draft) => {
                        if (draft && draft.result && Array.isArray(draft.result.groups)) {
                            draft.result.groups = draft.result.groups.filter((grp) => grp.id !== group_id);
                            draft.result.groups.forEach((group, index) => (group.position = index));
                        }

                        console.log('draft: ', current(draft));
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
        removeField: builder.mutation({
            query: ({ field_id, form_id }) => ({
                url: `/forms/deleteField/${field_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['form'],
            async onQueryStarted({ field_id, form_id }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getForm', form_id, (draft) => {
                        if (draft && draft.result && Array.isArray(draft.result.groups)) {
                            const groupIndex = draft.result.groups.findIndex((group) =>
                                group.fields.some((field) => field.id === field_id)
                            );
                            if (groupIndex != -1) {
                                draft.result.groups[groupIndex].fields = draft.result.groups[groupIndex].fields?.filter(
                                    (field) => field.id !== field_id
                                );
                                draft.result.groups[groupIndex].fields.forEach(
                                    (field, index) => (field.position = index)
                                );
                            }
                        }
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
        removeFieldOption: builder.mutation({
            query: ({ option_id }) => ({
                url: `forms/field/option/${option_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['form'],
        }),
        removeValidationRule: builder.mutation({
            query: (id) => ({
                url: `forms/validationRule/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['form'],
        }),
    }),
});

export const {
    useGetFormsQuery,
    useGetFormQuery,
    useGetFormEventsQuery,
    useGetFormFieldTypesQuery,
    useQuerySubmissionsMutation,
    useSubmitFormMutation,
    useAddNewFormMutation,
    useAddNewGroupMutation,
    useAddNewFieldMutation,
    useAddNewFieldOptionMutation,
    useAddValidationRuleMutation,
    useUpdateFormMutation,
    useUpdateGroupMutation,
    useUpdateGroupFieldMutation,
    useUpdateFieldOptionNameMutation,
    useUpdateSubmissionStatusMutation,
    useRemoveFieldMutation,
    useRemoveFieldOptionMutation,
    useRemoveGroupMutation,
    useRemoveValidationRuleMutation,
} = dynamicFormsSlice;
