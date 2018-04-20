/**
 * Defines the allowable logging levels.
 */
export enum LogLevel {
    TRACE = 'trace',
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    CRITICAL = 'critical',
}

/**
 * An extremly basic logging implementation.
 */
export class Logger {
    level: LogLevel;

    constructor(config: Config = {}) {
        this.level = config.level || LogLevel.INFO;
    }

    /**
     * Set the logging level
     * @param level
     */
    setLevel(level: LogLevel) {
        this.level = level;
    }

    /**
     * Log critical critical.
     * @param args
     */
    critical(...args: any[]) {
        if (!(levelMap.critical >= levelMap[this.level])) { return; }
        console.error.apply(console, args);
    }

    /**
     * Log debug data.
     * @param args
     */
    debug(...args: any[]) {
        if (!(levelMap.debug >= levelMap[this.level])) { return; }
        console.debug.apply(console, args);
    }

    /**
     * Log error data.
     * @param args
     */
    error(...args: any[]) {
        if (!(levelMap.error >= levelMap[this.level])) { return; }
        console.error.apply(console, args);
    }

    /**
     * Log info data.
     * @param args
     */
    info(...args: any[]) {
        if (!(levelMap.info >= levelMap[this.level])) { return; }
        console.info.apply(console, args);
    }

    /**
     * Log trace info.
     * @param args
     */
    trace(...args: any[]) {
        if (!(levelMap.trace >= levelMap[this.level])) { return; }
        console.log.apply(console, args);
    }

    /**
     * Log warn info.
     * @param args
     */
    warn(...args: any[]) {
        if (!(levelMap.warn >= levelMap[this.level])) { return; }
        console.warn.apply(console, args);
    }
}

const loggers = new Map<string, Logger>();
export const defaultLogger = getLogger('default');
export default defaultLogger;

/**
 * Get a logger for a given name.
 * @param name
 * @param level
 */
export function getLogger(name: string = 'default', level: LogLevel = LogLevel.INFO) {
    let logger = loggers.get(name);
    if (logger) { return logger; }
    logger = new Logger({level});
    loggers.set(name, logger);
    return logger;
}

/**
 * Dispose a Logger instance.
 * @param name
 */
export function dispose(name: string) {
    loggers.delete(name);
}

/**
 * Basic logger configuration.
 */
export interface Config {
    level?: LogLevel;
}


// Map level name to an integer value
const levelMap = {
    trace: 0,
    debug: 10,
    info: 20,
    warn: 30,
    error: 40,
    critical: 50,
};
