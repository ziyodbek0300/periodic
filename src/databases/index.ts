import { logger } from '@/utils/logger';
import { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE, NODE_ENV } from '@config';

export const dbConnection = {
  url: `mongodb://beelab:beelab-2022@185.251.89.97:27017/periodic`,
  options: {
    authSource: 'admin',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
  },
  error: (error: Error) => {
    if (error) {
      logger.error('DB: MongoDB Connection error:', error);
      process.exit(1);
    }
  },
};
