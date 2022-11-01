import path from 'path';
import os from 'os';
import { Command } from '@modern-js/utils';
import {
  CodeSmith,
  GeneratorCore,
  MaterialsManager,
  FsMaterial,
} from '@modern-js/codesmith';
import { AppAPI } from '@modern-js/codesmith-api-app';
import { Schema } from '@modern-js/codesmith-formily';
import { Schema as OriginSchema } from '@modern-js/easy-form-core';

const getPackageManagerSchema = (): Schema => {
  return {
    type: 'string',
    title: '包管理工具',
    enum: [
      {
        value: 'pnpm',
        label: 'pnpm',
      },
      {
        value: 'yarn',
        label: 'Yarn',
      },
    ],
  };
};

const testAction = async () => {
  const projectDir = path.join(os.tmpdir(), 'modern-js-test', 'common');
  const smith = new CodeSmith({});
  const mockGeneratorCore = new GeneratorCore({
    logger: smith.logger,
    materialsManager: new MaterialsManager(),
    outputPath: projectDir,
  });
  mockGeneratorCore.addMaterial('default', new FsMaterial(projectDir));
  mockGeneratorCore._context.current = {
    material: new FsMaterial(path.join(__dirname, '..')),
  };
  const appApi = new AppAPI(mockGeneratorCore._context, mockGeneratorCore);
  const ans = await appApi.getInputBySchemaFunc(() => ({
    type: 'object',
    properties: {
      packageManager: getPackageManagerSchema(),
    },
  }));
  console.info(ans);
};

const test2Action = async () => {
  const projectDir = path.join(os.tmpdir(), 'modern-js-test', 'common');
  const smith = new CodeSmith({});
  const mockGeneratorCore = new GeneratorCore({
    logger: smith.logger,
    materialsManager: new MaterialsManager(),
    outputPath: projectDir,
  });
  mockGeneratorCore.addMaterial('default', new FsMaterial(projectDir));
  mockGeneratorCore._context.current = {
    material: new FsMaterial(path.join(__dirname, '..')),
  };
  const appApi = new AppAPI(mockGeneratorCore._context, mockGeneratorCore);
  const ans = await appApi.getInputBySchema({
    key: 'packageManager',
    type: ['string'],
    label: '包管理工具',
    mutualExclusion: true,
    items: [
      {
        key: 'pnpm',
        label: 'pnpm',
      },
      {
        key: 'yarn',
        label: 'Yarn',
      },
    ],
  } as OriginSchema);
  console.info(ans);
};

export default function () {
  const program = new Command();

  program.command('test', { isDefault: true }).action(testAction);
  program.command('test-2').action(test2Action);

  program.parse(process.argv);
}
