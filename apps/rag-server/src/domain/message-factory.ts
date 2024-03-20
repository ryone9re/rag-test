import { Message } from "./message";

export function MessageFactory(answer: string) {
  return new Message({ id: "idid", answer });
}
