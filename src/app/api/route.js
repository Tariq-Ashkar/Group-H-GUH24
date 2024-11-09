import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
    apiKey: 'sk-svcacct-cNpEjHaToqE8f1_oq5mtOav-MW58kAAPPnY2lzO3W3FdX1lTM4-B88AF-DU36xuVT3BlbkFJiYStWmktQpsH4HTId447QBQGCh4jmzqdiyzaD-Lk-hudqrQbinAEXD8tlcRAO9kA'});

async function test() {
    try {
        const response = await openai.images.generate({
            model: 'dall-e-3',
            prompt: 'Generate an image of a specific location at the exact coordinates of (51.50598631825097, -0.0755937039726398) during the year 1856. The scene should reflect the historical, environmental, and architectural characteristics of that time and place. Include notable features of the landscape, cityscape, or natural surroundings, considering factors such as weather, lighting, and seasonal elements that would have been present during that period. The image should provide a vivid and accurate portrayal of the setting, capturing its atmosphere and essence.',
            n: 1,
            size: '1024x1024',
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

test();

