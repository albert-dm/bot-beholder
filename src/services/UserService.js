export function getInfo(token) {
    return fetch('https://api.blip.ai/accounts/me', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${token}`,
        }
    })
    .then(response => response.json());
}