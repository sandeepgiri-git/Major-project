import axios from "axios";

export async function checkAnswerByAi(_question) {
    const {question, userAnswer} = _question;

    const prompt = `
        You are an expert technical interviewer and evaluator.

        Evaluate the candidate's response using these criteria:
        - Accuracy (how correct the answer is)
        - Depth (how well the answer covers key points)
        - Clarity (how clearly the answer is explained)
        - Relevance (how well it matches the question asked)

        Return your evaluation in **pure JSON only**, without explanations or markdown formatting.

        Question: """${question}"""
        Candidate's Answer: """${userAnswer}"""

        Respond strictly in the following JSON format:
        {
            "expectedAnswer": <Answer expected by You in brief>,
            "score": <number between 0 and 100>,
            "feedback": "<brief but constructive feedback>"
        }
    `;


    try {
        if(!userAnswer || userAnswer == "_") {
            return {
                score: 0,
                expectedAnswer: "NA",
                feedback: "NA"
            }
        }

        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.1-8b-instant",
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
        // const data = JSON.parse(cleaned);

        return data;
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}