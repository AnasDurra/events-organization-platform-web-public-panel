import { apiSlice } from '../apiSlice';

export const chats = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        chattingList: builder.query({
            query: () => ({
                url: 'chat/attendee',
                method: 'GET',
            }),
        }),
    }),
});

export const { useChattingListQuery } = chats;
