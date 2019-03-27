import uuid from "uuid/v4";

export async function sendCommand(auth, body) {
    body.id = body.id || uuid();

    const response = await fetch('https://msging.net/commands', {
        method: 'post',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Key ${auth}`
        },
        body: JSON.stringify(body)
    });

    const jsonResponse = await response.json();

    if (jsonResponse.status !== "success") {
        throw new Error("Blip command was failed.");
    }

    return jsonResponse.resource;
}