import type { D1Database } from "@cloudflare/workers-types";
import { Note } from "../../domain/note";
import type { NoteRepository } from "../../domain/note-repository";

export class NoteRepositoryImpl implements NoteRepository {
  private _db: D1Database;

  constructor(db: D1Database) {
    this._db = db;
  }

  async save(text: string): Promise<Note> {
    const result = await this._db
      .prepare("INSERT INTO notes (text) VALUES (?) RETURNING *")
      .bind(text)
      .first();

    if (!result) {
      throw new Error("Failed to insertion. Returned value is null.");
    }

    if (!("id" in result) || !("text" in result)) {
      throw new Error("Failed to insertion. Row is invalid.");
    }

    return new Note({ id: result.id as string, text: result.text as string });
  }

  async searchByIds(ids: string[]): Promise<string[]> {
    const { results } = await this._db
      .prepare(`SELECT * FROM notes WHERE id IN (${ids.join(", ")})`)
      .bind()
      .all();

    return results
      .filter((note) => "text" in note)
      .map((ntoe) => ntoe.text as string);
  }
}
