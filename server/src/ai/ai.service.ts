import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';


@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateTitle(text: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Generate a short title (max 5 words) for the following note: "${text}"`,
          },
        ],
        temperature: 0.7,
        max_tokens: 20,
      });

      const title = response.choices[0].message.content?.trim();
      return title || this.fallbackTitle();
    } catch (error) {
      console.error('OpenAI generateTitle error:', error);
      return this.fallbackTitle();
    }
  }

  private fallbackTitle(): string {
    const date = new Date();
    return `Note ${date.toLocaleDateString()} ${date.toLocaleTimeString().slice(0, 5)}`;
  }
}
