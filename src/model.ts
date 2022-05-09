export class Model<T extends object> {
  private eventListeners = new Map<keyof T, Array<(value: any) => void>>();

  constructor() {
    const _this = this;

    return new Proxy(_this, {
      set(target, property, value, receiver) {
        _this.notify(property as keyof T, value);

        return Reflect.set(target, property, value, receiver);
      },
    });
  }

  subscribe<K extends keyof T>(property: K, callback: (value: T[K]) => void) {
    const handlers = this.eventListeners.get(property) || [];

    this.eventListeners.set(property, [...handlers, callback]);
  }

  unsubscribe<K extends keyof T>(property: K, callback: (value: T[K]) => void) {
    const handlers = this.eventListeners.get(property) || [];

    this.eventListeners.set(
      property,
      handlers.filter((handler) => handler !== callback)
    );
  }

  protected notify<K extends keyof T>(property: K, value: T[K]) {
    this.eventListeners.get(property)?.forEach((callback) => callback(value));
  }
}
