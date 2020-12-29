import { createLogger, format, transports } from 'winston';
import moment from 'moment';
import chalk from 'chalk';

const customFormat = format.printf((info) => {
  const parsedData =
    typeof info.message === 'string'
      ? info.message
      : JSON.stringify(info.message, null, 2);

  const timestamp = moment()
    .utcOffset('-0500')
    .format('[On] MMM DD, YYYY [At] hh:mm:ss A');

  const chalkLevel = logLevelColorizer(info.level.toUpperCase());
  const chalkTimestamp = chalk.magenta(`[${timestamp}]`);

  return `\n${chalkTimestamp}::${chalkLevel}\n${parsedData}`;
});

export const logger = createLogger({
  level: logLevel(),
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({
      format: format.combine(customFormat),
      handleExceptions: true
    })
  ]
});

function logLevel() {
  switch (process.env.NODE_ENV) {
    case 'test':
      return 'error';

    case 'production':
      return 'info';

    default:
      return 'silly';
  }
}

function logLevelColorizer(level: string) {
  switch (level) {
    case 'ERROR':
      return chalk.bold.red(level);
    case 'INFO':
      return chalk.bold.green(level);
    case 'DEBUG':
      return chalk.bold.yellow(level);
    default:
      return chalk.bold.magenta(level);
  }
}

process.on('unhandledRejection', (exceptions) => {
  logger.error('An unhandled promise rejection was thrown');
  throw exceptions;
});
