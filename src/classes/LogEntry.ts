import { LogLevel } from "../enum/LogLevel";

export class LogEntry {
  constructor(
    public readonly timestamp: Date,
    public readonly message: string,
    public readonly level: LogLevel
  ) {}
}
