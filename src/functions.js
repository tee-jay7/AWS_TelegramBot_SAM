const API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

export const init = async () => {
    try {
        const response = await fetch(`${API_URL}/setWebhook`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: WEBHOOK_URL })
        });

        if (!response.ok) {
            throw new Error(`Error setting webhook: ${response.statusText}`);
        }

        const results = await response.json();
        return results;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to initialize bot.");
    }
};

export const reply = async (id, text) => {
    try {
        const body = {
            chat_id: id,
            text
        };
        const response = await fetch(`${API_URL}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Error sending message: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to send reply.");
    }
};
