import OpenAI from "openai";
import dotenv from "dotenv";
import coords from '/script.js'; 

dotenv.config();

const openai = new OpenAI({
    apiKey: 'sk-svcacct-cNpEjHaToqE8f1_oq5mtOav-MW58kAAPPnY2lzO3W3FdX1lTM4-B88AF-DU36xuVT3BlbkFJiYStWmktQpsH4HTId447QBQGCh4jmzqdiyzaD-Lk-hudqrQbinAEXD8tlcRAO9kA'});

async function test() {
    try {
        const responseText = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: "Research and provide accurate historical details about the events, notable activities, or cultural significance of the location at coordinates" + coords +"around the year 750. Include relevant historical context and any major occurrences or developments that shaped the area during that time",
                },
            ],
        });
        // Extract the response text as a pure string
        const responseT = responseText.choices[0]?.message?.content || "";

        const responseImage = await openai.images.generate({
            model: 'dall-e-3',
            prompt: responseT,
            size: '1024x1024',
        });
        console.log(responseImage.data);
        console.log(responseT);
    } catch (error) {
        console.error('Error:', error.responseImage ? error.responseImage.data : error.message);
        console.error('Error:', error.responseText ? error.responseText.data : error.message);
    }
}

test();

