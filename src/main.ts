import { Logger } from "./classes/Logger";
import { ConsoleLogger } from "./strategy/ConsoleLogger";

const logger = Logger.getInstance();

logger.setOutputStrategy(new ConsoleLogger());
logger.setRateLimit(5);

logger.info("User signed in");
logger.debug("Fetching user profile");
logger.warn("Cache miss for user ID 42");
logger.error("Database connection failed");

setTimeout(() => {
  logger.info("User signed in");
}, 2000);

setTimeout(() => {
  logger.info("User signed in");
}, 6000);

logger.info("User signed out");
