export class Message {
  private _id: string;
  private _answer: string;

  constructor({ id, answer }: { id: string; answer: string }) {
    this._id = id;
    this._answer = answer;
  }

  public id() {
    return this._id;
  }

  public answer() {
    return this._answer;
  }

  public equals(other: Message): boolean {
    return this._id === other.id();
  }
}
