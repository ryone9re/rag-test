export class Note {
  private _id: string;
  private _text: string;

  constructor({ id, text }: { id: string; text: string }) {
    this._id = id;
    this._text = text;
  }

  public id() {
    return this._id;
  }

  public text() {
    return this._text;
  }

  public equals(other: Note) {
    return this._id === other.id();
  }
}
