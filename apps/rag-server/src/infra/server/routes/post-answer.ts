import { Ai } from "@cloudflare/ai";
import type { VectorizeIndex } from "@cloudflare/workers-types";
import { Hono } from "hono";
import { QueryToAI } from "../../../usecase/query-to-ai";
import { AIRepositoryImpl } from "../../ai";
import { NoteRepositoryImpl } from "../../database";
import { VectorRepositoryImpl } from "../../vector-index";

type Bindings = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  AI: any;
  DB: D1Database;
  VEC: VectorizeIndex;
};

const root = new Hono<{ Bindings: Bindings }>();

root.post("/ask", async (c) => {
  const queryToAI = new QueryToAI({
    aiRepository: new AIRepositoryImpl(new Ai(c.env.AI)),
    noteRepository: new NoteRepositoryImpl(c.env.DB),
    vectorRepository: new VectorRepositoryImpl(c.env.VEC),
  });

  const body = await c.req.json<{ question: string }>();

  const output = await queryToAI.query(body.question);

  return c.json({ answer: output.answer });
});

export default { root };
