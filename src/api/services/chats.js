import { apiSlice } from '../apiSlice';

export const chats = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        chattingList: builder.query({
            query: () => ({
                url: 'chat/attendee',
                method: 'GET',
            }),
        }),

        groupChatList: builder.query({
            query: ({ chat_group_id, pageSize, page }) => ({
                url: `chat/group?pageSize=${pageSize}&page=${page}`,
                method: 'POST',
                body: { group_id: chat_group_id },
            }),
        }),
    }),
});

export const { useChattingListQuery, useGroupChatListQuery } = chats;
