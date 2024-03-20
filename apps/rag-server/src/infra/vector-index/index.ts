import type { VectorizeIndex } from "@cloudflare/workers-types";
import type { VectorRepository } from "../../domain/vector-repository";

export class VectorRepositoryImpl implements VectorRepository {
  private static get SIMILARITY_CUTOFF() {
    return 0.3;
  }

  private _vector: VectorizeIndex;

  constructor(vector: VectorizeIndex) {
    this._vector = vector;
  }

  async save(indexes: { id: string; values: number[] }[]): Promise<string[]> {
    const result = await this._vector.upsert(indexes);
    return result.ids;
  }

  async query(vector: number[]): Promise<string[]> {
    const ids = await this._vector.query(vector, { topK: 1 });
    return ids.matches
      .filter((vec) => vec.score >= VectorRepositoryImpl.SIMILARITY_CUTOFF)
      .map((vec) => vec.id);
  }
}
