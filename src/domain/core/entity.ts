type ID = string | number;

/**
 * An entity is a plain object that has an identity (ID)
 * and is potentially mutable. Each entity is uniquely
 * identified by an ID rather than by an attribute;
 */
export class Entity<T = ID> {
  id: T;

  constructor(init: Partial<Entity<T>> = {}) {
    this.id = init.id || (Entity.generateUID() as unknown as T);
  }

  static generateUID(): number {
    return -Math.random().toString(10).slice(2);
  }

  /**
   * Two entities can be considered equal if both of them
   * have the same ID even though they have different attributes.
   */
  equals(compare: Partial<Entity<T>>): boolean {
    return this.id === compare?.id;
  }
}
