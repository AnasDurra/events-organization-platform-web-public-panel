import { apiSlice } from '../apiSlice';
import { chatSocket, joinChannel, setChatSocketHeader } from '../../chatSocket';

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
            // async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
            //     try {
            //         await cacheDataLoaded;

            //         const listener = (message) => {
            //             console.log(message.message);
            //             updateCachedData((draft) => {
            //                 draft?.result?.messages?.unshift(message.message);
            //             });
            //         };

            //         // chatSocket.on(`group-${arg?.chat_group_id}`, listener);
            //     } catch {
            //         // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
            //         // in which case `cacheDataLoaded` will throw
            //     }
            //     // cacheEntryRemoved will resolve when the cache subscription is no longer active
            //     await cacheEntryRemoved;
            //     chatSocket.close();
            // },
        }),
        joinedGroups: builder.query({
            query: () => ({
                url: 'chat/joined-groups',
                method: 'GET',
            }),
        }),
        deleteMessage: builder.mutation({
            query: (id) => ({
                url: `chat/delete-message/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useChattingListQuery, useGroupChatListQuery, useJoinedGroupsQuery, useDeleteMessageMutation } = chats;
