import { LogLevel } from "../enum/LogLevel";
import { ILogger } from "../interfaces/ILogger";

export class MemoryLogger implements ILogger {
  private logs: { level: LogLevel; message: string }[] = [];

  log(level: LogLevel, message: string): void {
    this.logs.push({ level, message });
  }

  getLogs(): { level: LogLevel; message: string }[] {
    return this.logs;
  }

  clear() {
    this.logs = [];
  }
}
