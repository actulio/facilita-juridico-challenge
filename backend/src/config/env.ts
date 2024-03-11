const requireEnv = (key: string) => {
  const envVar = process.env[key];
  if (!envVar) {
    throw new Error(`Please set ${key} in environment`);
  }
  return envVar;
};

export function validateEnvVars() {
  try {
    requireEnv('POSTGRES_USER');
    requireEnv('POSTGRES_PASSWORD');
    requireEnv('POSTGRES_DB');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
