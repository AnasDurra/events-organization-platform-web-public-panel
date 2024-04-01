import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authMiddleware from './api/store middlewares/auth-middleware';
import apiError from './api/store middlewares/api-error';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware).concat(authMiddleware).concat(apiError),
});
