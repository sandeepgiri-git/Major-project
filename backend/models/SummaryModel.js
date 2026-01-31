import {mongoose} from 'mongoose';

const summarySchema = new mongoose.Schema({
    strength: [{type: String}],
    interviewId : {type: mongoose.Schema.Types.ObjectId, ref: 'Interview'},
    areasOfImprovement: [
        {
            topic: {type: String},
            feedback: {type: String},
            level: {type: String},
        },
    ],
    communicationScore: {type: Number},
    technicalScore: {type: Number},
    problemSolvingScore: {type: Number},
    answerDistribution: {
        completeAnsCount: {type: Number},
        partialAnsCount: {type: Number},
        incorrectAnsCount: {type: Number}
    },
    overallFeedback: {type: String},
    interviewSummary: {type: String},
    overallPerformance: {type: String},
    keyTakeaways: {
        strengths: [{type: String}],
        improvements: [{type: String}],
    },
    recommendedNextSteps: [{type: String}], 
});

const Summary = mongoose.model('Summary', summarySchema);

export default Summary;

// {
//   "strengths": [
//     "Strong problem-solving approach",
//     "Clear code implementation",
//     "Good understanding of core concepts",
//     "Efficient algorithm solutions"
//   ],
//   "areasOfImprovement": [
//     {
//       "topic": "Event Handling",
//       "feedback": "Strengthen your understanding of event bubbling and delegation patterns",
//       "level": "High"
//     },
//     {
//       "topic": "Practical Examples",
//       "feedback": "Provide more real-world use cases when explaining concepts",
//       "level": "Medium"
//     },
//     {
//       "topic": "Time Complexity Analysis",
//       "feedback": "Continue practicing algorithm complexity analysis",
//       "level": "Low"
//     }
//   ],
//   "communicationScore": 7.5,
//   "technicalScore": 8.0,
//   "problemSolvingScore": 8.5,
//   "answerDistribution": {
//     "completeAnsCount": 7,
//     "partialAnsCount": 2,
//     "incorrectAnsCount": 1
//   },
//   "overallFeedback": "You demonstrated a solid understanding of JavaScript fundamentals with a score of 78%. Your approach to problem-solving was methodical and your code implementations were clean and efficient. Focus on deepening your knowledge of advanced concepts and real-world applications.",
//   "interviewSummary": "Detailed feedback and recommendations",
//   "overallPerformance": "You demonstrated a solid understanding of JavaScript fundamentals with a score of 78%. Your approach to problem-solving was methodical and your code implementations were clean and efficient. Focus on deepening your knowledge of advanced concepts and real-world applications.",
//   "keyTakeaways": {
//     "strengths": [
//       "Strong grasp of core JavaScript concepts and syntax",
//       "Ability to write efficient algorithms and optimize solutions"
//     ],
//     "improvements": [
//       "Improve explanation of event handling and DOM manipulation",
//       "Practice explaining concepts with real-world use cases"
//     ]
//   },
//   "recommendedNextSteps": [
//     "Review event delegation patterns and practice DOM manipulation",
//     "Study advanced JavaScript concepts like async/await and Promises",
//     "Practice system design questions for backend roles",
//     "Record yourself explaining concepts to improve communication"
//   ]
// }