import { apiSlice } from '../../api/apiSlice';

export const orgSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrg: builder.query({
            query: (orgId) => `/organization/${orgId}`,
            providesTags: ['one-org'],
        }),
        getAddresses: builder.query({
            query: () => `/address`,
        }),
        addOrgAddress: builder.mutation({
            query(data) {
                return {
                    url: `organization/address/${data?.orgId}`,
                    method: 'POST',
                    body: { address_id: data?.address_id },
                };
            },
            invalidatesTags: ['one-org'],
        }),
        removeOrgAddress: builder.mutation({
            query: (data) => {
                return {
                    url: `organization/address/${data?.orgId}`,
                    method: 'DELETE',
                    body: { address_id: data?.address_id },
                };
            },
            invalidatesTags: ['one-org'],
        }),
        configureOrg: builder.mutation({
            query: (org) => ({
                url: `/organization/${org?.organization_id}`,
                method: 'PATCH',
                body: { ...org, organization_id: undefined },
            }),
            invalidatesTags: ['one-org'],
        }),
        newCoverPic: builder.mutation({
            query: (data) => {
                var bodyFormData = new FormData();
                bodyFormData?.append('cover_picture', data?.file);

                return {
                    url: `organization/updateCoverPicture/${data?.orgId}`,
                    method: 'POST',
                    formData: true,
                    body: bodyFormData,
                };
            },
            invalidatesTags: ['one-org'],
        }),
        newProfilePic: builder.mutation({
            query: (data) => {
                var bodyFormData = new FormData();
                bodyFormData?.append('main_picture', data?.file);

                return {
                    url: `organization/updateMainPicture/${data?.orgId}`,
                    method: 'POST',
                    formData: true,
                    body: bodyFormData,
                };
            },
            invalidatesTags: ['one-org'],
        }),

        addContact: builder.mutation({
            query(data) {
                return {
                    url: `organization/contact/${data?.orgId}`,
                    method: 'POST',
                    body: { contact_id: data?.contact_id, content: data?.content },
                };
            },
            invalidatesTags: ['one-org'],
        }),

        removeContact: builder.mutation({
            query(data) {
                return {
                    url: `organization/contact/${data?.orgId}`,
                    method: 'DELETE',
                    body: { contact_id: data?.contact_id },
                };
            },
            invalidatesTags: ['one-org'],
        }),

        removeProfilePic: builder.mutation({
            query: (orgId) => {
                return {
                    url: `organization/mainPicture/${orgId}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['one-org'],
        }),
        removeCoverPic: builder.mutation({
            query: (orgId) => {
                return {
                    url: `organization/coverPicture/${orgId}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['one-org'],
        }),

        organizationAttendees: builder.query({
            query: () => {
                return {
                    url: `organization/attendees`,
                    method: 'GET',
                };
            },
        }),
        orgEvents: builder.query({
            query: () => {
                return {
                    url: `organization/events`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const {
    useGetOrgQuery,
    useGetAddressesQuery,
    useRemoveOrgAddressMutation,
    useAddOrgAddressMutation,
    useConfigureOrgMutation,
    useNewCoverPicMutation,
    useNewProfilePicMutation,
    useRemoveCoverPicMutation,
    useRemoveProfilePicMutation,
    useOrganizationAttendeesQuery,
    useOrgEventsQuery,
    useAddContactMutation,
    useRemoveContactMutation,
} = orgSlice;
