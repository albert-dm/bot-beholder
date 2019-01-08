export function loadCases(botKey) {
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
            uri: "/buckets/useCases"
        }),
    })
        .then(response => response.json());
}

export function setCases(botKey, cases) {
    return fetch('https://msging.net/commands', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Key ${botKey}`,
        },
        body: JSON.stringify({
            id: new Date().getTime(),
            method: "set",
            uri: "/buckets/useCases",
            type: "application/json",
            resource: cases
        }),
    })
        .then(response => response.json());
}

export function setUseCase(botKey, useCase) {
    //useCase.testCases = JSON.stringify(useCase.testCases);
    let parsedCase = {
        ...useCase,
        testCases: JSON.stringify(useCase.testCases)
    }
    return fetch('https://msging.net/commands', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Key ${botKey}`,
        },
        body: JSON.stringify({
            id: new Date().getTime(),
            method: "set",
            uri: "/buckets/" + parsedCase.id,
            type: "application/json",
            resource: parsedCase
        }),
    })
        .then(response => response.json());
}

export function loadUseCase(botKey, useCaseId) {
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
            uri: "/buckets/" + useCaseId
        }),
    })
        .then(response => response.json());
}

export function deleteUseCase(botKey, useCaseId) {
    return fetch('https://msging.net/commands', {
        method: 'post',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Key ${botKey}`
        },
        body: JSON.stringify({
            id: new Date().getTime(),
            method: "delete",
            uri: "/buckets/" + useCaseId
        }),
    })
        .then(response => response.json());
}