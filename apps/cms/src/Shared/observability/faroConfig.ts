type FaroEnv = {
  env?: string;
  url?: string;
  version?: string;
};

export const buildFaroConfig = ({ env, url, version }: FaroEnv) =>
  env === 'prod' && url
    ? {
        url,
        app: {
          name: 'go-champs-cms',
          version,
          environment: env
        }
      }
    : undefined;
