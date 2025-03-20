import type { CodegenConfig } from '@graphql-codegen/cli';
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const config: CodegenConfig = {
  overwrite: true,
  schema: `${baseUrl}/graphql`,
  generates: {
    'schema/schema.json': {
      plugins: ['introspection'],
      config: {
        minify: false,
      },
    },
    'schema/schema.graphql': {
      plugins: ['schema-ast'],
    },
    'src/configs/apollo/possibleTypes.json': {
      plugins: ['fragment-matcher'],
    },
  },
  config: {
    namingConvention: 'keep',
    apolloClientVersion: 3,
  },
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
};

export default config;
