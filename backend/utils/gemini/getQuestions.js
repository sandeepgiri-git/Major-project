import axios from "axios";
// sk-16a052afc8394bfe9c7c1de5afca2e73
export async function getQuestions(interview) {
    const {title, role, difficulty, interviewType,
            jobDescription, questionCount
        } = interview;
    
        // want to add interviewType in this prompt

    const prompt = `
        You are an AI interview question generator.

        Generate exactly ${questionCount} unique and practical interview questions for a candidate applying for the role of "${title}".
        Role context: ${role}.
        Difficulty level: ${difficulty}.
        Interview Type: ${interviewType == "mix" ? "behavioral and technical in the ratio{2:3}" : interviewType}.
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
        Ensure the JSON is properly formatted without any additional text or explanation.
    `;

    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: prompt }],
                response_format: { type: "json_object" }
            },
            {
                headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
                }
            }
        );
        const data = JSON.parse(response.data.choices[0].message.content);
        console.log(data);
        return data.questions;

    } catch (error) {
        console.error("Error generating questions:", error.response?.data || error);
        throw new Error("Failed to generate questions");
    }
    
}
// import axios from "axios";
// // sk-16a052afc8394bfe9c7c1de5afca2e73
// export async function getQuestions(interview) {
//     const {title, role, difficulty, interviewType,
//             jobDescription, questionCount
//         } = interview;
    
//         // want to add interviewType in this prompt

//     const prompt = `
//         You are an AI interview question generator.

//         Generate exactly ${questionCount} unique and practical interview questions for a candidate applying for the role of "${title}".
//         Role context: ${role}.
//         Difficulty level: ${difficulty}.
//         Interview Type: ${interviewType == "mix" ? "behavioral and technical in the ratio{2:3}" : interviewType}.
//         ${jobDescription ? `Job Description:\n${jobDescription}` : ''}

//         Return your response strictly in the following JSON format:
//         {
//         "questions": [
//             {
//             "question": "string",
//             "difficulty": "string",
//             "topic": "string"
//             }
//         ]
//         }
//         Ensure the JSON is properly formatted without any additional text or explanation.
//     `;

//     try{
//         const response = await axios.post(
//             "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAg0HLWsyUs9V0dqmTDE_j8eeVnQMJVLRs",
//             {
//                 contents: [{ parts: [{ text: prompt }] }],
//             },
//             {
//                 headers: {
//                 "Content-Type": "application/json",
//                 },
//             }
//         );
//         const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

//         const cleaned = text.replace(/```json|```/g, "").trim();
//         const data = JSON.parse(cleaned);

//         console.log(data);
//         return data.questions;

//     } catch (error) {
//         console.error("Error generating questions:", error.response?.data || error);
//         throw new Error("Failed to generate questions");
//     }
    
// }