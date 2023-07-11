import {execSync} from 'child_process';
import {ExecutorContext} from "@nx/devkit";

import {getRoot} from "../helpers/projects.helpers";

import {NpmPublishExecutorSchema} from './schema';

export default async function runExecutor(options: NpmPublishExecutorSchema,
                                          context: ExecutorContext
) {
  const sourceRoot = `./dist/${getRoot(context)}`;
  execSync(
    `cd ${sourceRoot} && echo '//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}' > .npmrc && npm publish`
  );
  return {
    success: true,
  };
}
