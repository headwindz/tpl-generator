import fs from 'fs-extra';
import path from 'path';
import TGenProps from './interface';
import { resolvePath, resolveVariables, registerHelper } from './util';
import glob from 'glob';

export default function main(props: TGenProps) {
  const { from, to, data = {} } = props;
  const [_from, _to] = [from, to].map(resolvePath);
  const files = glob.sync('**/*', {
    cwd: _from,
    nodir: true,
    dot: true,
  });
  files.forEach((match) => {
    const filePath = path.join(_from, match);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const relative = path.relative(_from, filePath);
    const destFilePath = resolveVariables(path.join(_to, relative), data);
    const destFileContent = resolveVariables(fileContent, data);

    fs.outputFileSync(destFilePath, destFileContent);
  });
}

export { registerHelper };
