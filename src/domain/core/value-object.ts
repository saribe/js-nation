export class ValueObject<T> {
  /**
   * Very lazy equals 🤪
   */
  equals(vo: ValueObject<T>) {
    if (vo === null || vo === undefined) {
      return false;
    }

    return JSON.stringify(this) === JSON.stringify(vo);
  }
}
