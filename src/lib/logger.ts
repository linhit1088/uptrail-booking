// Structured logger for production monitoring
// Phase 1: console-based. Can upgrade to Sentry/LogTail later.

type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: Record<string, unknown>;
}

function createEntry(level: LogLevel, message: string, data?: Record<string, unknown>): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    data,
  };
}

export const logger = {
  info(message: string, data?: Record<string, unknown>) {
    const entry = createEntry('info', message, data);
    if (process.env.NODE_ENV === 'production') {
      console.log(JSON.stringify(entry));
    } else {
      console.log(`[INFO] ${message}`, data || '');
    }
  },

  warn(message: string, data?: Record<string, unknown>) {
    const entry = createEntry('warn', message, data);
    if (process.env.NODE_ENV === 'production') {
      console.warn(JSON.stringify(entry));
    } else {
      console.warn(`[WARN] ${message}`, data || '');
    }
  },

  error(message: string, data?: Record<string, unknown>) {
    const entry = createEntry('error', message, data);
    if (process.env.NODE_ENV === 'production') {
      console.error(JSON.stringify(entry));
    } else {
      console.error(`[ERROR] ${message}`, data || '');
    }
  },
};
