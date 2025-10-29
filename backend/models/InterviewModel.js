import {mongoose} from 'mongoose';

const interviewSchema = new mongoose.Schema({
    title: {type: String, required: true},
    role: {type: String, required: true},
    difficiulty: {type: String, required: true},
    scheduledDate: {type: Date, default: Date.now},
    questionCount: {type: Number, default: 5},
    jobDescription: {type: String},
    status: {type: String, enum: ['scheduled', 'completed', 'active'], default: 'active'},
    interviewer: {type: String},
    response: [
        {
            question: {type: String},
            topic: {type: String},
            // can be easy, medium, hard
            difficiulty: {type: String},
            userAnswer: {type: String},
            expectedAnswer: {type: String},
            feedback: {type: String},
            score: {type: Number},
            createdAt: {type: Date, default: Date.now}
        }
    ],
    createdAt: {type: Date, default: Date.now}
});

const Interview = mongoose.model('Interview', interviewSchema);

export default Interview;