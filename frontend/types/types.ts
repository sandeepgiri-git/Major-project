export const backendURL = "http://localhost:1010/api"

export interface User {
    name: string;
    email: string;
    password?: string;
    isOnboarded: boolean;
    targetRoles: [string];
    technicalSkills: [string];
    createdInterciews: [string];
}

export interface Interview {
    title: string;
    role: string;
    difficulty: string;
    interviewType: "behavioral" | "technical" | "mix";
    questionCount: number;
    jobDescription?: string;

    scheduledDate: Date;
    activeWindow?: Date;
    scheduledStatus: 'scheduled' | 'completed' | 'active';
    duration: number;
    startTime?: Date;
    endTime?: Date;
    sessionStatus: 'attempted' | 'running' | 'pending';
    interviewer?: string;
    responses: [
        {
            question: string;
            topic: string;
            difficulty: string; 
            userAnswer?: string;
            expectedAnswer?: string;
            feedback?: string;
            score?: number;
        }
    ];
    userId: string;
    summary?: string;
}