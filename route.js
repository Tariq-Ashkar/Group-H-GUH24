import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import coords from './script.js';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure this is securely stored
});

const app = express();
app.use(express.json());

app.post('/get-info', async (req, res) => {
    const { year } = req.body;
    try {
        const responseText = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: "Research and provide accurate historical details about the events, notable activities, or cultural significance of the location at coordinates " + coords + " around the year " + year + ". Include relevant historical context and any major occurrences or developments that shaped the area during that time.",
                },
            ],
        });

        const responseT = responseText.choices[0]?.message?.content || "";
        res.json({ response: responseT });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});