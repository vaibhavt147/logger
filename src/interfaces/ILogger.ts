import { LogLevel } from "../enum/LogLevel";

export interface ILogger {
  log(level: LogLevel, message: string): void;
}
