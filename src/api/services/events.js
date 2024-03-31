import { apiSlice } from '../../../src/api/apiSlice';
import Cookies from 'js-cookie';


export const events = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (credentials) => ({
        url: 'event/create',
        method: 'POST',
        body: credentials,
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

export const {useCreateMutation } = events;
