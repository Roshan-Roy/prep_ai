import { GoogleGenAI } from "@google/genai"

type PromptParams = {
    role: string;
    experience: string;
    topics: string;
    description: string;
}

type ExistingQA = {
    question: string;
}

const generateMoreInterviewQuestionsPrompt = (
    {
        role,
        experience,
        topics,
        description,
    }: PromptParams,
    existingQuestions: ExistingQA[]
): string => {
    return `
ROLE:
You are an expert technical interviewer and career coach AI trained to generate realistic interview questions and natural, spoken-style answers.

CONTEXT:
- Job Role: ${role}
- Candidate Experience: ${experience} year
- Focus Topics: ${topics}
- Additional Description: ${description}

ALREADY GENERATED QUESTIONS (DO NOT REPEAT OR REPHRASE THESE):
${existingQuestions.map(q => `- ${q.question}`).join("\n")}

TASK:
Generate 5 MORE technical interview questions tailored specifically to the context above.

REQUIREMENTS:
- Questions must match the candidate experience level.
- Focus strongly on the listed topics.
- Answers must sound like how a candidate would naturally speak in a real interview.
- Keep answers clear, confident, and easy to explain verbally.
- Avoid textbook definitions or overly formal language.
- Keep responses practical and real-world focused.
- Avoid duplicate or vague questions.
- DO NOT include any code samples, code blocks, or programming snippets in the answers.
- DO NOT repeat or slightly modify any existing questions listed above.

OUTPUT RULES:
- Return ONLY valid JSON.
- Do NOT include extra commentary outside the JSON.

OUTPUT FORMAT:
[
  {
    "question": "Question text",
    "answer": "Natural interview-style answer that can be spoken aloud"
  }
]
`
}

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
})

const generateMoreInterviewQuestions = async (params: PromptParams, existingQuestions: ExistingQA[]) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: generateMoreInterviewQuestionsPrompt(params, existingQuestions),
        config: {
            responseMimeType: "application/json"
        },
    })

    const responseText = response.text

    if (!responseText) {
        throw new Error("AI returned empty response")
    }

    try {
        return JSON.parse(responseText)
    } catch {
        throw new Error("Invalid JSON returned by AI")
    }
}

export default generateMoreInterviewQuestions