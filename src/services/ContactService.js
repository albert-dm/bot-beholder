import guid from 'uuid/v1';

export const SendNotification = (contactId) => {
    let botKey = localStorage.getItem('botKey');
    return fetch('https://msging.net/commands', {
        method: 'post',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Key ${botKey}`
        },
        body: JSON.stringify({
            id: guid(),
            method: "get",
            uri: "/contacts/" + contactId
        }),
    })
        .then(response => {
            return response.json();
        });
}