import { Model } from './model';

interface ITimer {
  time: number;
  add: (seconds: number) => void;
  stop: () => void;
  reset: () => void;
  start: () => void;
}

export class Timer extends Model<ITimer> implements ITimer {
  private interval?: NodeJS.Timer | null;

  public time: number;

  constructor(private seconds: number) {
    super();

    this.time = seconds;
  }

  public add(seconds: number) {
    this.time += seconds;
  }

  public start(): void {
    if (this.interval) {
      return;
    }

    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.stop();

        return;
      }

      this.time--;
    }, 1000);
  }

  public stop(): void {
    if (!this.interval) {
      return;
    }

    clearInterval(this.interval);
    this.interval = null;
  }

  public reset(): void {
    this.time = this.seconds;
  }
}
