type CustomAttributes = {
  [key: string]: string | number;
};

type LoggerMeta = CustomAttributes & {
  page_name: string;
};

export interface ILogger {
  log: (args: unknown) => void;
  warn: (args: unknown) => void;
  error: (error: Error, customAttributes?: CustomAttributes) => void;
  info: (args: unknown) => void;
  debug: (args: unknown) => void;
}

export class Logger implements ILogger {
  private meta: LoggerMeta;
  private verbose: boolean;
  private prefix: string;

  constructor(meta: LoggerMeta) {
    this.meta = meta;
    this.verbose = process.env.NODE_ENV !== "production";
    this.prefix = `[${meta.page_name.toUpperCase()}]`;
  }

  error = (error: Error, customAttributes?: CustomAttributes) => {
    const custom = {
      ...this.meta,
      ...customAttributes,
    };

    console.error(error, custom);
  };

  log = (...args: any) => {
    if (this.verbose) {
      console.log(this.prefix, ...args);
    }
  };

  warn = (...args: any) => {
    if (this.verbose) {
      console.warn(this.prefix, ...args);
    }
  };

  info = (...args: any) => {
    if (this.verbose) {
      console.info(this.prefix, ...args);
    }
  };

  debug = (...args: any) => {
    if (this.verbose) {
      console.debug(this.prefix, ...args);
    }
  };
}

export const createLogger = (meta: LoggerMeta) => new Logger(meta);
