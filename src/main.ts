import { Logger } from "./classes/Logger";
import { ConsoleLogger } from "./strategy/ConsoleLogger";
import { FileLogger } from "./strategy/FileLogger";
import { MemoryLogger } from "./strategy/MemoryLogger";

const logger = Logger.getInstance();
logger.clearOutputTargets();

const consoleLogger = new ConsoleLogger();
const memoryLogger = new MemoryLogger();
const fileLogger = new FileLogger("logs.txt");

logger.addOutputTarget(consoleLogger);
logger.addOutputTarget(memoryLogger);
logger.addOutputTarget(fileLogger);

logger.setRateLimit(3);

logger.info("System started");
logger.debug("Loading user preferences");
logger.warn("Low disk space");
logger.error("Failed to connect to database");

setTimeout(() => {
  logger.info("System started");
}, 2000);

setTimeout(() => {
  logger.info("System started");
}, 4000);

setTimeout(() => {
  console.log("\n🧠 Memory Logs:");
  console.log(memoryLogger.getLogs());
}, 5000);
