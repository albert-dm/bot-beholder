export const sendNotification = (notification, botKey) => {
    return fetch('https://msging.net/messages', {
        method: 'post',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Key ${botKey}`
        },
        body: notification,
    })
        .then(response => response.json());
}