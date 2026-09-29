try {
  if (typeof process.loadEnvFile === 'function') {
    process.loadEnvFile();
  }
} catch (e) {
  // .env file not present or not readable; default env vars will be used
}

export const config = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'khet-to-ghar-super-secret-sih2026-key',
  aiEngineUrl: process.env.AI_ENGINE_URL || 'http://localhost:8000',
  databaseUrl: process.env.DATABASE_URL || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
};
