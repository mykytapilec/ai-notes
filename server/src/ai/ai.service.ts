import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.GITHUB_TOKEN || '',
      baseURL: process.env.OPENAI_API_BASE_URL || 'https://models.inference.ai.azure.com',
    });
  }

  async generateTitle(content: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an assistant that generates short, concise titles for notes.',
          },
          {
            role: 'user',
            content: `Generate a short title for this note: ${content}`,
          },
        ],
        max_tokens: 20,
      });

      const title = response.choices[0]?.message?.content?.trim() || 'Untitled';
      return title;
    } catch (error) {
      this.logger.error(`OpenAI generateTitle error: ${error}`);
      throw error;
    }
  }
}
