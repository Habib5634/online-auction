import { API_URL, getAuthHeaders } from '@/utils/apiUrl';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for API calls

// Get all notifications
export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/user/notifications`,getAuthHeaders());
            return response.data.notifications;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error fetching notifications");
        }
    }
);

// Mark a single notification as read
export const markNotificationAsRead = createAsyncThunk(
    'notifications/markNotificationAsRead',
    async (notificationId, { rejectWithValue }) => {
        try {
            await axios.put(`${API_URL}/user/notifications/mark-as-read/${notificationId}`,getAuthHeaders());
            return notificationId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error marking notification as read");
        }
    }
);

// Mark all notifications as read
export const markAllNotificationsAsRead = createAsyncThunk(
    'notifications/markAllNotificationsAsRead',
    async (_, { rejectWithValue }) => {
        try {
            await axios.put(`${API_URL}/user/notifications/mark-all-as-read`,getAuthHeaders());
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error marking all notifications as read");
        }
    }
);

// Get a single notification
export const fetchSingleNotification = createAsyncThunk(
    'notifications/fetchSingleNotification',
    async (notificationId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/user/notifications/${notificationId}`,getAuthHeaders());
            return response.data.notification;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error fetching notification");
        }
    }
);

// Slice
const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifications: [],
        singleNotification: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Fetch all notifications
        builder.addCase(fetchNotifications.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            state.loading = false;
            state.notifications = action.payload;
        });
        builder.addCase(fetchNotifications.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Mark a notification as read
        builder.addCase(markNotificationAsRead.fulfilled, (state, action) => {
            state.notifications = state.notifications.map((notif) =>
                notif._id === action.payload ? { ...notif, isRead: true } : notif
            );
        });

        // Mark all notifications as read
        builder.addCase(markAllNotificationsAsRead.fulfilled, (state) => {
            state.notifications = state.notifications.map((notif) => ({
                ...notif,
                isRead: true,
            }));
        });

        // Fetch a single notification
        builder.addCase(fetchSingleNotification.fulfilled, (state, action) => {
            state.singleNotification = action.payload;
        });
    },
});

export default notificationSlice.reducer;
