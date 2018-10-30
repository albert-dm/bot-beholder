const models = {
    text: {
        type: 'text',
        text: 'Eu sou uma mensagem de texto',
    },
    json: {
        type: 'json',
        text: '*',
    },
    menu: {
        type: 'menu',
        text: 'Eu sou o corpo do menu',
        items: [],
    },
    quickReply: {
        type: 'quickreply',
        text: 'Eu sou o corpo da quick reply',
        items: [],
    },
    carousel: {
        type: 'carousel',
        items: [
            {
                title: 'Título da imagem',
                subtitle: '',
                url: '',
                buttons: [],
            },
        ],
    },
    image: {
        type: 'image',
        items: [
            {
                title: 'Título da imagem',
                subtitle: '',
                url: '',
            },
        ],
    },
    ai: {
        type: 'ai',
        intent: '',
        entities: [],
    },
    track: {
        type: 'track',
        category: '',
        action: '',
    },
};

export default models;
