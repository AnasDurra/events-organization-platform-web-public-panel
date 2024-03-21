import { apiSlice } from '../apiSlice';

export const lists = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    lists: builder.query({
      query: () => ({
        url: 'attendee/lists',
        method: 'GET',
      }),
      // transformResponse: (responseData) => {
      //   Cookies.set('accessToken', responseData?.accessToken, {
      //     expires: 12,
      //   });
      //   Cookies.set('refreshToken', responseData?.accessToken, {
      //     expires: 12,
      //   });
      //   return responseData;
      // },
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

export const { useListsQuery } = lists;
