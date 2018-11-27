export const sendNotification = (notification, botKey) => {
    return fetch('https://msging.net/messages', {
        method: 'post',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Key ${botKey}`
        },
        body: JSON.stringify(notification),
    })
        .then(response => {
            console.log(response);
            return response.ok;
        });
}