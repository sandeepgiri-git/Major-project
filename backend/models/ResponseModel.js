import {mongoose} from 'mongoose';

const responseSchema = new mongoose.Schema({
    question: {type: String},
    userAnswer: {type: String},
    expectedAnswer: {type: String},
    feedback: {type: String},
    score: {type: Number},
    createdAt: {type: Date, default: Date.now}
});

const Response = mongoose.model('Response', responseSchema);

export default Response;