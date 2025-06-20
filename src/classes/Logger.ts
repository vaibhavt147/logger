import { LogLevel } from "../enum/LogLevel";
import { ILogger } from "../interfaces/ILogger";
import { ConsoleLogger } from "../strategy/ConsoleLogger";
import { LogEntry } from "./LogEntry";

export class Logger {
  private static instance: Logger;

  private logs: LogEntry[] = [];
  private lastLogTimestamps: Map<string, number> = new Map();
  private outputTarget: ILogger = new ConsoleLogger();
  private rateLimitSeconds = 10;
  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  setOutputStrategy(target: ILogger) {
    this.outputTarget = target;
  }

  setRateLimit(seconds: number) {
    this.rateLimitSeconds = seconds;
  }

  private shouldLog(level: LogLevel, message: string): boolean {
    const key = `${level}-${message}`;
    const now = Date.now();
    const last = this.lastLogTimestamps.get(key);
    if (last && now - last < this.rateLimitSeconds * 1000) {
      return false;
    }
    this.lastLogTimestamps.set(key, now);
    return true;
  }

  private log(level: LogLevel, message: string): void {
    if (!this.shouldLog(level, message)) {
      return;
    }
    const key = `${level}-${message}`;
    const entry = new LogEntry(new Date(), message, level);
    this.logs.push(entry);
    const finalMessage = `[${entry.timestamp.toISOString()}] ${message}`;
    this.outputTarget.log(level, finalMessage);
  }

  info(msg: string) {
    this.log(LogLevel.INFO, msg);
  }

  warn(msg: string) {
    this.log(LogLevel.WARN, msg);
  }

  error(msg: string) {
    this.log(LogLevel.ERROR, msg);
  }

  debug(msg: string) {
    this.log(LogLevel.DEBUG, msg);
  }

  getAllLogs(): LogEntry[] {
    return [...this.logs];
  }
}
