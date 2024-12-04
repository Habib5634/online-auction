'use client'
import { fetchNotifications, markAllNotificationsAsRead, markNotificationAsRead } from '@/Store/ReduxSlice/notificationSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Notifications = () => {
    const dispatch = useDispatch();
    const { notifications, loading, error } = useSelector((state) => state.notifications);

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    const handleMarkAsRead = (notificationId) => {
        dispatch(markNotificationAsRead(notificationId));
    };

    const handleMarkAllAsRead = () => {
        dispatch(markAllNotificationsAsRead());
    };

    if (loading) return <div>Loading notifications...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Notifications</h2>
            <button onClick={handleMarkAllAsRead}>Mark All as Read</button>
            <ul>
                {notifications.map((notif) => (
                    <li key={notif._id}>
                        <div>
                            <strong>{notif.message}</strong>
                            <p>From: {notif.senderId}</p>
                            <p>Status: {notif.isRead ? 'Read' : 'Unread'}</p>
                            {!notif.isRead && (
                                <button onClick={() => handleMarkAsRead(notif._id)}>Mark as Read</button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
