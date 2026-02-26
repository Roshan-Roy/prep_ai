import { GoogleGenAI } from "@google/genai"

type PromptParams = {
    role: string;
    experience: string;
    topics: string;
    description: string;
}

const generateInterviewQuestionsPrompt = ({
    role,
    experience,
    topics,
    description,
}: PromptParams): string => {
    return `
ROLE:
You are an expert technical interviewer and career coach AI trained to generate realistic interview questions and natural, spoken-style answers.

CONTEXT:
- Job Role: ${role}
- Candidate Experience: ${experience} year
- Focus Topics: ${topics}
- Additional Description: ${description}

TASK:
Generate 10 technical interview questions tailored specifically to the context above.

REQUIREMENTS:
- Questions must match the candidate experience level.
- Focus strongly on the listed topics.
- Answers must sound like how a candidate would naturally speak in a real interview.
- Keep answers clear, confident, and easy to explain verbally.
- Avoid textbook definitions or overly formal language.
- Keep responses practical and real-world focused.
- Avoid duplicate or vague questions.
- DO NOT include any code samples, code blocks, or programming snippets in the answers.

OUTPUT RULES:
- Return ONLY valid JSON.
- Do NOT include extra commentary outside the JSON.

OUTPUT FORMAT:
[
  {
    "question": "Question text",
    "answer": "Natural interview-style answer that can be spoken aloud"
  },
  ...
]
`
}

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
})

const generateInterviewQuestions = async (params: PromptParams) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: generateInterviewQuestionsPrompt(params),
            config: {
                responseMimeType: "application/json"
            },
        })

        const responseText = response.text

        if (!responseText) {
            throw new Error("Gemini returned empty response")
        }

        let data = null

        try {
            data = JSON.parse(responseText)
        } catch {
            throw new Error("JSON parse failed")
        }

        return data
    } catch (e) {
        throw new Error("Failed to generate interview questions")
    }
}

export default generateInterviewQuestions