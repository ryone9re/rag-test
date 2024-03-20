import type { Note } from "./note";

export interface NoteRepository {
  save(text: string): Promise<Note>;
  searchByIds(ids: string[]): Promise<string[]>;
}
