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