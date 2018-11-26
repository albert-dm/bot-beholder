import { sendNotification } from '../services/WANotificationsService'


export const sendNotifications = (notifications, botKey) => async dispatch => {
    for (let i = 0; i < notifications.length; i++) {
        dispatch({
            type: 'SENDING_NOTIFICATION',
            sending: true,
            current: i + 1,
            total: notifications.length
        });
        await sendNotification(notifications[i]);
    }
    dispatch({
        type: 'SENDING_NOTIFICATION',
        sending: false,
        current: notifications.length,
        total: notifications.length
    });
}