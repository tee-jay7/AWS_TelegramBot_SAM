import { init, reply } from "./functions.js";

export const bot_handler = async (event, context) => {
    try {
        const response = await init();
        const { body } = event;
        const data = JSON.parse(body);
        const message = data.message;
        const replyResponse = await reply(message.chat.id, message.text);

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Hello World it is working",
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                error: error.message
            })
        };
    }
};
