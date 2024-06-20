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
            query: (path) => ({
                url: `${path}`,
                method: 'GET',
            }),
        }),
        confirmAttendance: builder.mutation({
            query: (id) => ({
                url: `attendance/confirm-attendance/${id}`,
                method: 'PUT',
            }),
        }),
    }),
});

export const { useAttendanceQrCodeQuery, useCheckAttendanceRecordQuery, useConfirmAttendanceMutation } = attendance;
