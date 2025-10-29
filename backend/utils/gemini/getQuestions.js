import axios from "axios";

export async function getQuestions(interview) {
    const {title, role, difficiulty, 
            jobDescription, questionCount
        } = interview;

    const prompt = `
        You are an AI interview question generator.

        Generate exactly ${questionCount} unique and practical interview questions for a candidate applying for the role of "${title}".
        Role context: ${role}.
        Difficulty level: ${difficiulty}.
        ${jobDescription ? `Job Description:\n${jobDescription}` : ''}

        Return your response strictly in the following JSON format:
        {
        "questions": [
            {
            "question": "string",
            "difficulty": "string",
            "topic": "string"
            }
        ]
        }
        `;

    try{
        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyC0fC5z40Z_W04axVP8ZeGE-0xw71giHXc",
            {
                contents: [{ parts: [{ text: prompt }] }],
            },
            {
                headers: {
                "Content-Type": "application/json",
                },
            }
        );
        const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

        const cleaned = text.replace(/```json|```/g, "").trim();
        const data = JSON.parse(cleaned);

        // console.log(data);
        return data.questions;

    } catch (error) {
        console.error("Error generating questions:", error.response?.data || error);
        throw new Error("Failed to generate questions");
    }
    
}