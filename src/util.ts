import path from 'path';
import * as Handlebars from 'handlebars';
import { Data } from './interface';

export const resolvePath = (_path: string) => {
  if (path.isAbsolute(_path)) {
    return _path;
  }
  return path.join(process.cwd(), _path);
};

export const resolveVariables = (content: string, data: Data) => {
  const template = Handlebars.compile(content);
  return template(data);
};

export const registerHelper = (name, fn) => {
  return Handlebars.registerHelper(name, fn);
};
