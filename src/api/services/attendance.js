import { apiSlice } from '../apiSlice';

export const attendance = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        attendanceQrCode: builder.query({
            query: (id) => ({
                url: `attendance/get-attendance-code/${id}`,
                method: 'GET',
            }),
            providesTags: ['confirm-attendance'],
        }),

        checkAttendanceRecord: builder.query({
            query: (path) => ({
                url: `${path}`,
                method: 'GET',
            }),
            providesTags: ['confirm-attendance'],
        }),
        confirmAttendance: builder.mutation({
            query: (id) => ({
                url: `attendance/confirm-attendance/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['confirm-attendance'],
        }),
        attendeesList: builder.query({
            query: ({ event_day_id, page, pageSize }) => ({
                url: `attendance/attendance-list?page=${page}&pageSize=${pageSize}`,
                method: 'POST',
                body: { event_day_id },
            }),
            providesTags: ['confirm-attendance'],
        }),
    }),
});

export const {
    useAttendanceQrCodeQuery,
    useCheckAttendanceRecordQuery,
    useConfirmAttendanceMutation,
    useAttendeesListQuery,
} = attendance;
