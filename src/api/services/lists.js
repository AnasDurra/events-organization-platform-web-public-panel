import { apiSlice } from '../apiSlice';

export const lists = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        configurationLists: builder.query({
            query: () => ({
                url: 'attendee/lists',
                method: 'GET',
            }),
        }),

        eventCreationLists: builder.query({
            query: () => ({
                url: 'event/lists',
                method: 'GET',
            }),
        }),
    }),
});

// export const getLoggedInUser = () => {
//   const token = Cookies.get('accessToken');
//   const decodedToken = jwtDecode(token);

//   return {
//     username: decodedToken.username,
//     full_name: decodedToken.full_name
//   };
// };

export const { useConfigurationListsQuery, useEventCreationListsQuery } = lists;
