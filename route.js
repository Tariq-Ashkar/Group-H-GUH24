import { coords } from './script.js';

async function test(year) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-svcacct-cNpEjHaToqE8f1_oq5mtOav-MW58kAAPPnY2lzO3W3FdX1lTM4-B88AF-DU36xuVT3BlbkFJiYStWmktQpsH4HTId447QBQGCh4jmzqdiyzaD-Lk-hudqrQbinAEXD8tlcRAO9kA'
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    {
                        role: "user",
                        content: "Research and provide accurate historical details about the events, notable activities, or cultural significance of the location at coordinates " + coords + " around the year " + year + ". Include relevant historical context and any major occurrences or developments that shaped the area during that time."
                    }
                ]
            })
        });

        const responseData = await response.json();
        const responseText = responseData.choices[0]?.message?.content || "";
        console.log('Chat Response:', responseText);

        const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-svcacct-cNpEjHaToqE8f1_oq5mtOav-MW58kAAPPnY2lzO3W3FdX1lTM4-B88AF-DU36xuVT3BlbkFJiYStWmktQpsH4HTId447QBQGCh4jmzqdiyzaD-Lk-hudqrQbinAEXD8tlcRAO9kA'
            },
            body: JSON.stringify({
                model: 'dall-e-3',
                prompt: responseText,
                n : 1,
                size: '1024x1024'
            })
        });

        const imageData = await imageResponse.json();
        console.log('Generated Image Data:', imageData.data[0].url);
        document.getElementById("txtoutput").innerHTML = responseText;
        document.getElementById("imgsource").src = imageData.data[0].url;
    } catch (error) {
        console.error('Error:', error);
    }
}

export { test };

test('1920');
