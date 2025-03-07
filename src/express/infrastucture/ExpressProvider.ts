import { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export default class ExpressProvider {
  private static instance: ExpressProvider;
  private static config: {
    host: string;
    port: string;
    protocol: string;
  };
  private static app: Express | null = null;

  private constructor() {
    if (!ExpressProvider.config) {
      ExpressProvider.config = {
        host: process.env['HOST'] ?? 'localhost',
        port: process.env['PORT'] ?? '3000',
        protocol: process.env['PROTOCOL'] ?? 'http'
      };
    }
  }

  public static getInstance(): ExpressProvider {
    if (!ExpressProvider.instance) {
      ExpressProvider.instance = new ExpressProvider();
    }
    return ExpressProvider.instance;
  }

  public static getHost(): string {
    this.ensureInitialized();
    return ExpressProvider.config.host;
  }

  public static getPort(): string {
    this.ensureInitialized();
    return ExpressProvider.config.port;
  }

  public static getProtocol(): string {
    this.ensureInitialized();
    return ExpressProvider.config.protocol;
  }

  public static getAPIDomain(): string {
    this.ensureInitialized();
    return `${ExpressProvider.config.protocol}://${ExpressProvider.config.host}:${ExpressProvider.config.port}`;
  }

  public static setApp(app: Express): void {
    if (!app) {
      throw new Error('Cannot set null Express app');
    }
    ExpressProvider.app = app;
  }

  public static getApp(): Express {
    if (!ExpressProvider.app) {
      throw new Error('Express app has not been initialized. Call setApp() first.');
    }
    return ExpressProvider.app;
  }

  private static ensureInitialized(): void {
    if (!ExpressProvider.instance) {
      ExpressProvider.getInstance();
    }
  }
}