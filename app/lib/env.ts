const VARS = ["OPENAI_API_KEY"] as const;

type AppEnv = Record<(typeof VARS)[number], string>;

class AppEnvInitError extends Error {
  readonly tag = "AppEnvInitError";

  constructor(readonly name: string) {
    super(`Expected env var ${name} to be present`);
  }
}

function init(): AppEnv {
  const env: Partial<AppEnv> = VARS.reduce(
    (acc, key) => ({ ...acc, [key]: "" }),
    {},
  );

  for (const name of VARS) {
    if (typeof process.env[name] !== "string") {
      throw new AppEnvInitError(name);
    }

    env[name] = process.env[name];
  }

  return env as AppEnv;
}

export const env = init();
