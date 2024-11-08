import Anthropic from '@anthropic-ai/sdk';
import { Message } from '@anthropic-ai/sdk/resources';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  async askAI(chatInput): Promise<Message> {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const msg = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1000,
      temperature: 0,
      system: 'Respond only with short poems.',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: chatInput,
            },
          ],
        },
      ],
    });

    return msg;
  }
}
