import type { Ai } from "@cloudflare/ai";
import type { AiTextGenerationOutput } from "@cloudflare/ai/dist/ai/tasks/text-generation";
import type { AIRepository } from "../../domain/ai-repository";
import type { Message } from "../../domain/message";
import { MessageFactory } from "../../domain/message-factory";

export class AIRepositoryImpl implements AIRepository {
  private _ai: Ai;

  constructor(ai: Ai) {
    this._ai = ai;
  }

  async ask(question: string): Promise<Message> {
    const answer = (await this._ai.run("@cf/meta/llama-2-7b-chat-int8", {
      messages: [{ role: "user", content: question }],
      stream: false,
    })) as AiTextGenerationOutput;

    if (!("response" in answer)) {
      throw new Error("Response not found.");
    }

    if (!answer.response) {
      throw new Error("Response not found.");
    }

    return MessageFactory(answer.response);
  }

  async run(text: string): Promise<number[]> {
    const { data } = await this._ai.run("@cf/baai/bge-base-en-v1.5", {
      text: [text],
    });

    return data[0];
  }
}
