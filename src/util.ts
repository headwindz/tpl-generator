import path from 'path';
import * as Handlebars from 'handlebars';
import { Data } from './interface';

Handlebars.registerHelper("toHyphen", function(str = '') {
  const replacedStr = `${str.slice(0, 1)}${str.slice(1).replace(/([A-Z])/g, "-$1")}`;
  return replacedStr.toLowerCase();
});

export const resolvePath = (_path: string) => {
  if(path.isAbsolute(_path)) {
    return _path;
  }
  return path.join(process.cwd(), _path);
}

export const resolveVariables = (content: string, data: Data) => {
  const template = Handlebars.compile(content);
  return template(data);
}