export const buildWANotification = (user, template, params) => {
    let regex = /{{(.*?)}}/g;
    params = params.map(param => {
        let matches = param.match(regex) || [];
        for (let i = 0; i < matches.length; i++) {
            let property = matches[i].slice(2, -2).split('.');
            let value;
            if (property.length == 1) {
                value = user[property[0]];
            }
            else {
                if (user[property[0]]) {
                    value = user[property[0]][property[1]];
                } else {
                    value = null;
                }
            }
            param = param.replace(matches[i], value);
        }
        return { "default": param };
    });
    return {
        "id": "123e4567-e89b-12d3-a456-426655440002",
        "to": user.identity,
        "type": "application/json",
        "content": {
            "type": "hsm",
            "hsm": {
                "namespace": "whatsapp:hsm:messaging:blip",
                "element_name": template,
                "fallback_lg": "pt",
                "fallback_lc": "BR",
                "localizable_params": params
            }
        }
    };
}