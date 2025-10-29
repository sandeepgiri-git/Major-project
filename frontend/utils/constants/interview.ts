export const dummyInterviews = [
  {
    id: "1",
    title: "Frontend Developer Interview",
    company: "TechCorp",
    date: "2023-10-15T14:00:00",
    status: "completed",
    type: "technical",
    feedback: "Strong CSS skills, needs improvement in React hooks"
  },
  {
    id: "2",
    title: "Backend Engineer Screening",
    company: "DataSystems Inc",
    date: "2023-10-20T10:30:00",
    status: "scheduled",
    type: "behavioral",
    feedback: null
  },
{
    id: "3",
    title: "Full Stack Assessment",
    company: "InnovateX",
    date: "2023-10-25T16:00:00",
    status: "upcoming",
    type: "technical",
    feedback: null
  }
];

export const dummyInterviewReview = {
  id: "1",
  title: "Frontend Developer Interview",
  company: "TechCorp",
  date: "2023-10-15T14:00:00",
  duration: "12:34",
  overallScore: 85,
  status: "completed",
  questions: [
    {
      id: "q1",
      question: "Explain the difference between var, let, and const in JavaScript.",
      type: "technical",
      answerTranscript: "Var is function scoped and can be redeclared, while let and const are block scoped. Let can be reassigned but not redeclared, and const cannot be reassigned or redeclared.",
      aiFeedback: {
        score: 92,
        strengths: ["Clear explanation of scoping differences", "Accurate description of reassignment rules"],
        improvements: ["Could mention hoisting behavior differences", "Add examples for better clarity"]
      }
    },
    {
      id: "q2",
      question: "How would you optimize a slow React application?",
      type: "technical",
      answerTranscript: "I would use React.memo for components, implement code splitting with dynamic imports, optimize state management to prevent unnecessary re-renders, and use useMemo and useCallback hooks appropriately.",
      aiFeedback: {
        score: 78,
        strengths: ["Good mention of React.memo and hooks", "Code splitting is relevant"],
        improvements: ["Should mention profiling tools like React DevTools", "Missing discussion of bundle size optimization", "Could elaborate on virtualization for large lists"]
      }
    },
    {
      id: "q3",
      question: "Describe a challenging project you worked on and how you overcame obstacles.",
      type: "behavioral",
      answerTranscript: "I led a team migration from AngularJS to React. We faced challenges with legacy code integration and team learning curve. We overcame this by implementing a gradual migration strategy and conducting weekly knowledge sharing sessions.",
      aiFeedback: {
        score: 88,
        strengths: ["Clear problem statement", "Good demonstration of leadership", "Specific solutions mentioned"],
        improvements: ["Could quantify results (e.g., performance improvement %)", "Add more detail about technical challenges"]
      }
    },
    {
      id: "q4",
      question: "How would you optimize a slow React application?",
      type: "technical",
      answerTranscript: "I would use React.memo for components, implement code splitting with dynamic imports, optimize state management to prevent unnecessary re-renders, and use useMemo and useCallback hooks appropriately.",
      aiFeedback: {
        score: 78,
        strengths: ["Good mention of React.memo and hooks", "Code splitting is relevant"],
        improvements: ["Should mention profiling tools like React DevTools", "Missing discussion of bundle size optimization", "Could elaborate on virtualization for large lists"]
      }
    },
    {
      id: "q5",
      question: "Describe a challenging project you worked on and how you overcame obstacles.",
      type: "behavioral",
      answerTranscript: "I led a team migration from AngularJS to React. We faced challenges with legacy code integration and team learning curve. We overcame this by implementing a gradual migration strategy and conducting weekly knowledge sharing sessions.",
      aiFeedback: {
        score: 88,
        strengths: ["Clear problem statement", "Good demonstration of leadership", "Specific solutions mentioned"],
        improvements: ["Could quantify results (e.g., performance improvement %)", "Add more detail about technical challenges"]
      }
    }
  ],
  overallFeedback: {
    strengths: [
      "Strong technical knowledge of JavaScript fundamentals",
      "Good understanding of React optimization techniques",
      "Clear communication and structured responses"
    ],
    areasForImprovement: [
      "Provide more specific examples and metrics",
      "Deepen knowledge of advanced React performance optimization",
      "Practice elaborating on behavioral examples with concrete results"
    ],
    recommendation: "Ready for mid-level frontend positions with some additional preparation on advanced React concepts."
  }
};

export const dummyInterviewQuestions = {
  id: "1",
  title: "Frontend Developer Interview",
  company: "TechCorp",
  questions: [
    {
      id: "q1",
      text: "Explain the difference between var, let, and const in JavaScript.",
      type: "behavioral"
    },
    {
      id: "q2",
      text: "How would you optimize a slow React application?",
      type: "technical"
    },
    {
      id: "q3",
      text: "Describe a challenging project you worked on and how you overcame obstacles.",
      type: "behavioral"
    }
  ]
};