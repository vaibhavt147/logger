// FileLogger.ts
import * as fs from "fs";
import { ILogger } from "../interfaces/ILogger";
import { LogLevel } from "../enum/LogLevel";

export class FileLogger implements ILogger {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;

    // Create or clear file at the start
    fs.writeFileSync(this.filePath, "", "utf-8");
  }

  log(level: LogLevel, message: string): void {
    fs.appendFileSync(this.filePath, `[${level}] ${message}\n`);
  }
}
