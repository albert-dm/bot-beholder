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
    return fetch('https://msging.net/commands', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Key ${botKey}`,
        },
        body: JSON.stringify({
            id: new Date().getTime(),
            method: "set",
            uri: "/buckets/" + useCase.id,
            type: "application/json",
            resource: useCase
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

export function runTest(botKey, testCaseId) {
    //test
    let promise = new Promise(function (resolve, reject) {
        let possibilities = [success, fail];
        let idx = Math.floor((Math.random() * possibilities.length));
        let result = possibilities[idx];
        setTimeout(() => resolve(result), 2000);
    });
    return promise;
}

//test responses for tests
const success = `Iniciando a execução dos testes

[TestManager::Run] Starting TestManager...
[TestManager::Run] Starting to test block ["0.0.0 COMEÇAR"]
[TestManager::StartTest] Test for block ["0.0.0 COMEÇAR"] started with input "Contrate a take"
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Finished running tests for block ["0.0.0 COMEÇAR"]
[TestManager::Run] Starting to test block ["0.0.1 Nome"]
[TestManager::StartTest] Test for block ["0.0.1 Nome"] started with input "Pret Tester"
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Finished running tests for block ["0.0.1 Nome"]
[TestManager::Run] Starting to test block ["0.2.0 O que é Chatbot"]
[TestManager::StartTest] Test for block ["0.2.0 O que é Chatbot"] started with input "O que é chatbot?"
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Finished running tests for block ["0.2.0 O que é Chatbot"]
[TestManager::Run] Starting to test block ["0.1.0 Continuar"]
[TestManager::StartTest] Test for block ["0.1.0 Continuar"] started with input "Continuar conversa"
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Finished running tests for block ["0.1.0 Continuar"]
[TestManager::Run] Starting to test block ["1.1.1 - Email inválido"]
[TestManager::StartTest] Test for block ["1.1.1 - Email inválido"] started with input "testeemailsemarroba"
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Finished running tests for block ["1.1.1 - Email inválido"]
[TestManager::Run] Starting to test block ["1.1.2 - Email válido"]
[TestManager::StartTest] Test for block ["1.1.2 - Email válido"] started with input "teste@crispret.take.net"
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Finished running tests for block ["1.1.2 - Email válido"]

===========================
|       TEST RESULTS      |
===========================
  Total tests ran:      15
  Tests passed:         15
  Tests failed:          0
===========================

===========================
|       RESULT REPORT     |
===========================

Test for block [0.0.0 COMEÇAR] message #1 passed. Text content matches expected response
Test for block [0.0.0 COMEÇAR] message #2 passed. Text content matches expected response
Test for block [0.0.1 Nome] message #1 passed. Text content matches expected response
Test for block [0.0.1 Nome] message #2 passed. Text content matches expected response
Test for block [0.0.1 Nome] message #3 passed. Text content matches expected response
Test for block [0.0.1 Nome] message #4 passed. Text content matches expected response
Test for block [0.0.1 Nome] message #5 passed. Quick replies match.
Test for block [0.2.0 O que é Chatbot] message #1 passed. Text content matches expected response
Test for block [0.2.0 O que é Chatbot] message #2 passed. Text content matches expected response
Test for block [0.2.0 O que é Chatbot] message #3 passed. Quick replies match.
Test for block [0.1.0 Continuar] message #1 passed. Text content matches expected response
Test for block [0.1.0 Continuar] message #2 passed. Text content matches expected response
Test for block [1.1.1 - Email inválido] message #1 passed. Text content matches expected response
Test for block [1.1.2 - Email válido] message #1 passed. Text content matches expected response
Test for block [1.1.2 - Email válido] message #2 passed. Text content matches expected response`;


const fail = `Iniciando a execução dos testes

[TestManager::Run] Starting TestManager...
[TestManager::Run] Starting to test block ["1.0.0"]
[TestManager::StartTest] Test for block ["1.0.0"] started with input "COMEÇAR"
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Finished running tests for block ["1.0.0"]
[TestManager::Run] Starting to test block ["2.0.0"]
[TestManager::StartTest] Test for block ["2.0.0"] started with input "Teste"
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Finished running tests for block ["2.0.0"]
[TestManager::TestTrackings] Testing trackings for bot "allthingshair@msging.net"
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Received (and discarded) an unexpected message.
[TestManager::ConsumeMessage] Message received for consumption.
[TestManager::ConsumeMessage] Received (and discarded) an unexpected message.

===========================
|       TEST RESULTS      |
===========================
  Total tests ran:       5
  Tests passed:          1
  Tests failed:          4
===========================

===========================
|       RESULT REPORT     |
===========================

Test for block [1.0.0] message #1 passed. Text content matches expected response
Test for block [1.0.0] message #2 FAILED. Message type does not match expected response type. Expected: application/vnd.lime.select+json, actual: text/plain
Test for block [1.0.0] message #3 FAILED. Unexpected card amount in carousel. Expected: 1, actual: 4
Test for block [2.0.0] message #1 FAILED. Text content does not match expected response. Expected: [aaaaaaaa], actual: [Não te entendi bem 😞]
Tracking test for block [1.0.0] FAILED. Could not find an event with category [Saudaçao] and action [Quantidade] for block [1.0.0] originating from message 1a881661-8741-4315-b538-4838992d7eb4`;