export interface VectorRepository {
  save(indexes: { id: string; values: number[] }[]): Promise<string[]>;
  query(text: number[]): Promise<string[]>;
}
