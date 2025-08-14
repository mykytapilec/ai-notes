import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import { role } from "./constants";

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.GITHUB_TOKEN || "",
      baseURL: process.env.OPENAI_API_BASE_URL || "",
    });
  }

  async generateSummary(text: string): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [{ role, content: `Summarize this note: ${text}` }],
    });

    return completion.choices[0].message?.content ?? "";
  }
}
