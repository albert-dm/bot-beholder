export function loadBots(token) {
    return fetch('https://api.blip.ai/applications/mine', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${token}`,
        }
    })
    .then(response => response.json());
}

export function loadBotInfo(token, identity) {
    return fetch('https://api.blip.ai/applications/'+identity, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${token}`,
        }
    })
    .then(response => response.json());
}

export function loadBotUsers(botKey) {
    return fetch('https://msging.net/commands', {
        method: 'post',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Key ${botKey}`
        },
        body: JSON.stringify({
            id: new Date().getTime(),
            method: "get",
            uri: "/contacts/"
        }),
    })
        .then(response => response.json());
}