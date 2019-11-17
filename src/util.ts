import path from 'path';
import { Data } from './interface';

export const resolvePath = (_path: string) => {
  if(path.isAbsolute(_path)) {
    return _path;
  }
  return path.join(process.cwd(), _path);
}

const replacer = (data: Data) => (match: string, property: string) => {
  const val = data[property];
  if (val == null) {
    return property;
  }
  return val;
}

export const resolveVariables = (content: string, data: Data) => {
  const regexp = new RegExp(`\\{\\{([^(\}\})]*?)\\}\\}`, "g");
  return content.replace(regexp, replacer(data))
}