import guid from 'uuid/v1';

export const SendNotification = (contactId, bot) => {
    return fetch('https://msging.net/commands', {
        method: 'post',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Key ${bot.authorization}`
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

export const ContextVariables = (contactId, bot) => {
    return fetch('https://msging.net/commands', {
        method: 'post',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Key ${bot.authorization}`
        },
        body: JSON.stringify({
            id: guid(),
            method: "get",
            uri: "/contexts/" + contactId
        }),
    }).then(r => r.json());
}

export const VariableValue = (contactId, variableKey, bot) => {
    return fetch('https://msging.net/commands', {
        method: 'post',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Key ${bot.authorization}`
        },
        body: JSON.stringify({
            id: guid(),
            method: "get",
            uri: `/contexts/${contactId}/${variableKey}`
        }),
    }).then(r => r.json());
}