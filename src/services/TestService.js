export function loadCases(token) {
    return fetch('https://api.blip.ai/applications/mine', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${token}`,
        }
    })
    .then(response => response.json());
}