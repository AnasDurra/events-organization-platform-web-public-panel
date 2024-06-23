import { apiSlice } from '../../api/apiSlice';

export const giftCardsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGiftCardInfo: builder.mutation({
            query: (body) => ({
                url: `gift-cards/redeem/card-info`,
                method: 'POST',
                body: body,
            }),
        }),
        redeemGiftCard: builder.mutation({
            query: (body) => ({
                url: `gift-cards/redeem`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags:['tickets-balance']
        }),
    }),
});

export const { useGetGiftCardInfoMutation, useRedeemGiftCardMutation ,} = giftCardsSlice;
