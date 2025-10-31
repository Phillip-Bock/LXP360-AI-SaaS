import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { transcript } = await request.json()

    if (!transcript || typeof transcript !== "string") {
      return Response.json({ error: "Transcript is required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: `You are an expert educational content synthesizer. Given the following lecture transcript, create a well-structured course content that includes:

1. A clear title for the lesson
2. Key learning objectives (3-5 bullet points)
3. Main concepts and explanations
4. Important definitions or terminology
5. Examples or case studies mentioned
6. Summary of key takeaways

Format the output in a clear, readable structure with appropriate headings and sections.

Transcript:
${transcript}

Please synthesize this into comprehensive course content:`,
    })

    return Response.json({ content: text })
  } catch (error) {
    console.error("[v0] Error in synthesize API:", error)
    return Response.json({ error: "Failed to generate content" }, { status: 500 })
  }
}
