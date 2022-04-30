export class Model<T extends object> {
  private eventListeners = new Map<keyof T, [(value: any) => void]>();

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
    if (this.eventListeners.has(property)) {
      this.eventListeners.get(property)?.push(callback);

      return;
    }

    this.eventListeners.set(property, [callback]);
  }

  protected notify<K extends keyof T>(property: K, value: T[K]) {
    this.eventListeners.get(property)?.forEach((callback) => callback(value));
  }
}
