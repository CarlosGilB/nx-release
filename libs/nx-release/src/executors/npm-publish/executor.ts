import {execSync} from 'child_process';
import {ExecutorContext} from "@nx/devkit";

import {getRoot} from "../helpers/projects.helpers";

import {NpmPublishExecutorSchema} from './schema';

export default async function runExecutor(options: NpmPublishExecutorSchema,
                                          context: ExecutorContext
) {
  const sourceRoot = `./dist/${getRoot(context)}`;
  const registry: string = process.env.NPM_REGISTRY || 'registry.npmjs.org'
  execSync(
    `cd ${sourceRoot} && echo '//${registry}/:_authToken=${process.env.NPM_TOKEN}' > .npmrc && npm publish`
  );
  return {
    success: true,
  };
}
