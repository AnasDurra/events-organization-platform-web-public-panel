import { apiSlice } from '../apiSlice';

export const attendance = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        attendanceQrCode: builder.query({
            query: (id) => ({
                url: `attendance/get-attendance-code/${id}`,
                method: 'GET',
            }),
        }),

        checkAttendanceRecord: builder.query({
            query: ({ attendee_id, event_id }) => ({
                url: `attendance/check-attendance?attendeeId=${attendee_id}&eventId=${event_id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useAttendanceQrCodeQuery, useCheckAttendanceRecordQuery } = attendance;
