import axios, { all } from "axios";

export async function overallSummary(allEvaluations) {

    const prompt = `
        You are an expert technical interview evaluator.

        Based on the candidate's question-wise evaluations provided below, generate a final interview summary.
        Each evaluation contains:
        - Question text
        - Candidate's answer
        - Score (out of 10)
        - Feedback

        Analyze all responses carefully and provide the final summary with the following exact fields:
        - strength (list, must have 1-4 points only)
        - areasOfImprovement (each with topic, feedback, and level: High / Medium / Low)
        - communicationScore (out of 10)
        - technicalScore (out of 10)
        - problemSolvingScore (out of 10)
        - overallFeedback (1-2 sentence overview)
        - interviewSummary (short title like “Detailed feedback and recommendations”)
        - overallPerformance (2-3 sentences describing the candidate’s performance)
        - keyTakeaways (with strengths[exact 1-3 size] and improvements[exact 1-3 size])
        - recommendedNextSteps (list of 1-4 practical suggestions)

        Do not include any other fields.
        Do not include 'answerDistribution'.

        Respond strictly in the following JSON format:
        {
            "strength": [...],
            "areasOfImprovement": [
                {
                    "topic": "",
                    "feedback": "",
                    "level": ""
                }
            ],
            "communicationScore": <number>,
            "technicalScore": <number>,
            "problemSolvingScore": <number>,
            "overallFeedback": "",
            "interviewSummary": "",
            "overallPerformance": "",
            "keyTakeaways": {
                "strengths": [...],
                "improvements": [...]
            },
            "recommendedNextSteps": [...]
        }

        Here are the individual evaluations:
        ${JSON.stringify(allEvaluations)}
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

        // console.log(data);
        return data;
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export function getAnswerDist(allEvaluations) {
    let completeAnsCount = 0;
    let partialAnsCount = 0;
    let incorrectAnsCount = 0;  
    allEvaluations.forEach((ele) => {
        if(ele.score >= 70) {
            completeAnsCount += 1;
        } else if(ele.score >= 40) {
            partialAnsCount += 1;
        } else {
            incorrectAnsCount += 1;
        }
    });

    return {
        completeAnsCount,
        partialAnsCount,
        incorrectAnsCount
    }
}