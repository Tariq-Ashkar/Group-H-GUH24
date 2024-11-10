import { coords } from './script.js';

async function test(year) {
    try {
        document.getElementById("imgsource").src = 'donut-code.gif';
        document.getElementById("txtoutput").innerHTML = 'Travelling through the spacetime continuum...';
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    {
                        role: "user",
                        content: "Research and provide accurate historical details about the events, notable activities, or cultural significance of the location at coordinates " + coords + " around the year " + year + ". Include relevant historical context and any major occurrences or developments that shaped the area during that time. Limit the text to less than 150 words."
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
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                model: 'dall-e-3',
                prompt: responseText + 'Dont include any text in the image',
                n : 1,
                size: '1792x1024'
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




