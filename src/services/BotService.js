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

export function getBotConfiguration(botKey, version) {
    return fetch('https://msging.net/commands', {
        method: 'post',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Key ${botKey}`
        },
        body: JSON.stringify({
            id: new Date().getTime() + parseInt(Math.random() * 1000),
            method: "get",
            uri: `/buckets/blip_portal:builder_${version}_configuration`
        }),
    })
    .then(response => response.json());
}

export function setBotConfiguration(botKey, version, config) {
    return fetch('https://msging.net/commands', {
        method: 'post',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Key ${botKey}`
        },
        body: JSON.stringify({
            id: new Date().getTime() + parseInt(Math.random() * 1000),
            method: "set",
            type: "application/json",
            uri: `/buckets/blip_portal:builder_${version}_configuration`,
            resource: config
        }),
    });
}