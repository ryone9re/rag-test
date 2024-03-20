import { Ai } from "@cloudflare/ai";
import type { VectorizeIndex } from "@cloudflare/workers-types";
import { Hono } from "hono";
import { PostNote } from "../../../usecase/post-note";
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

root.post("/note", async (c) => {
  const postNote = new PostNote({
    aiRepository: new AIRepositoryImpl(new Ai(c.env.AI)),
    noteRepository: new NoteRepositoryImpl(c.env.DB),
    vectorRepository: new VectorRepositoryImpl(c.env.VEC),
  });

  const body = await c.req.json<{ knowledge: string }>();

  await postNote.query(body.knowledge);

  return c.json({ message: "success" });
});

export default { root };
