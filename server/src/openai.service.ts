import { Injectable } from "@nestjs/common";
import OpenAI from "openai";

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateSummary(text: string): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: `Summarize this note: ${text}` }],
    });

    return completion.choices[0].message?.content ?? "";
  }
}
