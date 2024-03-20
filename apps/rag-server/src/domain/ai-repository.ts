import type { Message } from "./message";

export interface AIRepository {
  ask(question: string): Promise<Message>;
  run(text: string): Promise<number[]>;
}
