import Interview from "../models/InterviewModel.js";
import Summary from "../models/SummaryModel.js";
import { checkAnswerByAi } from "../utils/gemini/checkAns.js";
import {getQuestions} from "../utils/gemini/getQuestions.js"
import { getAnswerDist, overallSummary } from "../utils/gemini/overallSummary.js";

export async function getInterviewById(req,res) {
    const id = req.params.id;
    const user = req.user;
   
    try {
        if(!id) {
            return res.json({
                success: false,
                message: "id not provided"
            })
        }
        

        const interviewId = user.createdInterviews.find((e) => e._id == id);
        if(!interviewId) {
            return res.json({
                success: false,
                message: "interview not found"
            })
        }
        const interview = await Interview.findById(interviewId);

        return res.json({
            success: true,
            interview
        })
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export async function getAllinterviews(req, res) {
    const user = req.user;
    try {
        const interviews = await Interview.find({userId: user._id});
        if(!interviews) {
            return res.json({
                success: false,
                message: "No interviews found"
            })
        }
        return res.json({
            success: true,
            interviews
        })
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export async function createInterview(req, res) {
    const {title, role, difficulty, interviewType,
        jobDescription, interviewer, questionCount, duration
    } = req.body;
    const user = req.user;

    // console.log("data is", req.body);

    try {
        if(!title || !role || !difficulty || !interviewType) {
            return res.json({
                success: false,
                message: "All field Required"
            })
        }

        // scheduleDate: '2025-11-16T18:30:00.000Z',
        // let scheduledDateObj = null;
        // if(scheduledDate) {
        //     scheduledDateObj = new Date(scheduledDate);
        //     if(isNaN(scheduledDateObj.getTime())) {
        //         return res.json({
        //             success: false,
        //             message: "Invalid Date format"
        //         })
        //     }
        // }
        const scheduledDate = Date.now();

        const interview = await Interview({title, role, difficulty, scheduledDate, duration, 
            interviewType, jobDescription, interviewer, questionCount, userId: user._id
        })

        const questions = await getQuestions(interview);

//      put questions on response 
        questions.forEach((question) => {
            interview.responses.push({
                question: question.question,
                topic: question.topic,
                difficulty: question.difficulty,
                userAnswer: "",
                expectedAnswer: "",
                feedback: "",
                score: -1,
            })
        });
        
        await interview.save();

        user.createdInterviews.push(interview._id);
        await user.save();
        return res.json({
            success: true,
            interview,
        })
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export async function deleteInterview(req, res) {
    const user = req.user;
    const interview = req.interview;
    try {
        const summaryId = Interview.summary;
        await Interview.findByIdAndDelete(interview._id);
        if(summaryId) await Summary.findByIdAndDelete(summaryId);

        user.createdInterviews = user.createdInterviews.filter((interviewId) => interviewId != interview._id);
        await user.save();
        
        return res.json({
            success: true,
            message: "Interview deleted successfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export async function startInterview(req, res) {
    // const id = req.params.id;
    const interview = req.interview;

    try {

        if(interview.sessionStatus != "pending") {
            return res.json({
                success: false,
                message: "Interview is already attempted"
            })
        }

        if(interview.scheduledStatus != "active") {
            return res.json({
                success: false,
                message: "Interview is not started yet"
            })
        }

        interview.sessionStatus = "running",
        interview.startTime = new Date();
        interview.endTime = new Date(interview.startTime.getTime() + interview.duration * 60000);
        await interview.save();

        return res.json({
            success: true,
            message: "Interview is running now......",
            interview
        })

    }catch(error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export async function endInterview(req, res) {
    const interview = req.interview;

    try {
        if(interview.sessionStatus == "attempted") {
            return res.json({
                success: false, 
                message: "Interview already ended"
            })
        }
        if(interview.sessionStatus == "pending") {
            return res.json({
                success: false,
                message: "Interview not started yet"
            })
        }

        interview.sessionStatus = "attempted";
        await interview.save();
        
        return res.json({
            success: true,
            message: "interview sumitted successfully",
            interview
        })
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export async function checkAnswer(req, res) {   
    const {userAnswer, questionId} = req.body;
    const interview = req.interview;

    try{
        const idx = interview.responses.findIndex((q) => q._id == questionId);
        
        if(idx == -1) {
            return res.json({
                success: false,
                message: "Question not found"
            })
        }

        const question = interview.responses[idx];

        interview.responses[idx].userAnswer = userAnswer;

        const response = await checkAnswerByAi(question);

        if(!response) {
            return res.json({
                success:false,
                message: "Failed to check the answer"
            })
        }

        interview.responses[idx].score = response.score;
        interview.responses[idx].feedback = response.feedback;
        interview.responses[idx].expectedAnswer = response.expectedAnswer;
        
        await interview.save();

        return res.json({
            success: true,
            interview
        })

    }catch(error) {
        return res.json({
            success: false,
            message: error.message,
        })
    }

}

export async function generateSummary(req, res) {
    const interview = req.interview;
    // console.log("hitt")
    try {
        const date = new Date();
        if(interview.sessionStatus == "running" && date > interview.endTime) {
            interview.sessionStatus = "attempted";
            await interview.save();
        }  
        if(interview.sessionStatus != "attempted") {
            return res.json({
                success: false, 
                message: "Summary will generated after the completion of interview"
            })
        }

        if(interview.summaryId) {
            return res.json({
                success: false,
                message: "Summary is already generated for this interview"
            })
        }

        const allEvaluations = interview.responses;
        const data = await overallSummary(allEvaluations);
        data.answerDistribution = getAnswerDist(allEvaluations);

        const summary = new Summary({...data});
        interview.summary = summary._id;

        await summary.save();
        await interview.save();

        return res.json({
            success: true,
            summary,
            interview
        })
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    } 
}

export async function getSummaryById(req, res) {
    const interview = req.interview;

    try {
        if(!interview.summary) {
            return res.json({
                success: false,
                message: "Summary not generated yet"
            })
        }

        const summary = await Summary.findById(interview.summary);
        
        if(!summary) {
            return res.json({
                success: false,
                message: "Summary not found"
            })
        } 
        return res.json({
            success: true,
            interview,
            summary
        })
    }catch(error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}