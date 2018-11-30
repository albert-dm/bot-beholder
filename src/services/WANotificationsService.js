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

export const getIdentifier = (phoneNumber, botKey) => {
    return fetch('https://msging.net/commands', {
        method: 'post',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Key ${botKey}`
        },
        body: JSON.stringify(
            {
                "id": new Date().getTime(),
                "to": "postmaster@wa.gw.msging.net",
                "method": "get",
                "uri": "lime://wa.gw.msging.net/accounts/+55" + phoneNumber
            }
        ),
    })
        .then(response => response.json());
}