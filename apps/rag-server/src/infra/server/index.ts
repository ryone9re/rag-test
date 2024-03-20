import { Hono } from "hono";
import aiRoot from "./routes/post-answer";
import knowledgeRoot from "./routes/post-note";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello World!");
});
app.route("ai", aiRoot.root);
app.route("knowledge", knowledgeRoot.root);

export default app;
