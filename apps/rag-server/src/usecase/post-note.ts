import type { AIRepository } from "../domain/ai-repository";
import type { NoteRepository } from "../domain/note-repository";
import type { VectorRepository } from "../domain/vector-repository";

export class PostNote {
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

  async query(knowledge: string): Promise<void> {
    const vector = await this._aiRepository.run(knowledge);

    const note = await this._noteRepository.save(knowledge);

    await this._vectorRepository.save([{ id: note.id(), values: vector }]);
  }
}
