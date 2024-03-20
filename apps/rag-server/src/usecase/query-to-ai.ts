import type { AIRepository } from "../domain/ai-repository";
import type { NoteRepository } from "../domain/note-repository";
import type { VectorRepository } from "../domain/vector-repository";

export class QueryToAI {
  private _aiRepository: AIRepository;
  private _noteRepository: NoteRepository;
  private _vectorRepository: VectorRepository;

  constructor({
    aiRepository,
    noteRepository,
    vectorRepository,
  }: {
    aiRepository: AIRepository;
    noteRepository: NoteRepository;
    vectorRepository: VectorRepository;
  }) {
    this._aiRepository = aiRepository;
    this._noteRepository = noteRepository;
    this._vectorRepository = vectorRepository;
  }

  async query(question: string): Promise<{ answer: string[] }> {
    const vector = await this._aiRepository.run(question);

    const result = await this._vectorRepository.query(vector);

    const corespond = await this._noteRepository.searchByIds(result);

    return { answer: corespond };
  }
}
