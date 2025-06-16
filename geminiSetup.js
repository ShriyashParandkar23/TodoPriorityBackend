const { OpenAI } = require('openai');
const dotenv = require('dotenv');
dotenv.config();



const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
}); 


async function getAnswer(messages) { 


        const result = await client.chat.completions.create({
            model: 'gemini-1.5-flash',
            messages: messages 
        });
        return result.choices[0].message.content;
}



module.exports = {getAnswer};
