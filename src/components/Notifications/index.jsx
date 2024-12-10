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
        <div className='w-full max-w-[1024px] mx-auto px-4 py-8 text-white'>
            <h2 className='text-20 font-bold mb-4'>Notifications</h2>
            <button className='text-purplelight mb-4' onClick={handleMarkAllAsRead}>Mark All as Read</button>
            <div className='flex flex-col gap-4'>
                {notifications.map((notif) => (
                    <div key={notif._id} className={`${notif?.isRead? "bg-gray":"bg-purplelight"} p-3 rounded-2xl`}>
                        <div>
                            <strong>{notif.message}</strong>
                            <p>From: {notif?.senderId?.fullName}</p>
                            <p>Status: {notif.isRead ? 'Read' : 'Unread'}</p>
                            {!notif.isRead && (
                                <button className='text-purpledark' onClick={() => handleMarkAsRead(notif._id)}>Mark as Read</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
