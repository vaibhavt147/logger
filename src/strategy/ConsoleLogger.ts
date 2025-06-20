import { LogLevel } from "../enum/LogLevel";
import { ILogger } from "../interfaces/ILogger";

export class ConsoleLogger implements ILogger {
  log(level: LogLevel, message: string): void {
    console.log(`[${level}] ${message}`);
  }
}
