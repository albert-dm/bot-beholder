export function getIntents(botKey) {
    return fetch('https://msging.net/commands', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Key ${botKey}`,
        },
        body: JSON.stringify({
            method: 'get',
            to: 'postmaster@ai.msging.net',
            uri: '/intentions',
            id: Math.random().toFixed(5) * 100000,
        }),
    });
}

export function getEntities(botKey) {
    return fetch('https://msging.net/commands', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Key ${botKey}`,
        },
        body: JSON.stringify({
            method: 'get',
            to: 'postmaster@ai.msging.net',
            uri: '/entities',
            id: Math.random().toFixed(5) * 100000,
        }),
    });
}
