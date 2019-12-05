import { resolvePath, resolveVariables, registerHelper  } from "../../src/util";

describe('resolvePath', () => {
  test('should resolve relative path', () => {
    expect(resolvePath('../../__tests__').startsWith('/')).toBeTruthy();
  });

  test('should resolve absolute path', () => {
    expect(resolvePath('/abc/__tests__')).toBe('/abc/__tests__');
  });
});

describe("resolveVarialbes", () => {
  test("should resolve variables", () => {
    const content = resolveVariables(`Hello {{ title }}`, {
      title: 'tpl-generator'
    })
    expect(content).toBe('Hello tpl-generator');
  });
});


describe("registerHelper", () => {
  registerHelper('toHyphen', (str = '') => {
    const replacedStr = `${str.slice(0, 1)}${str.slice(1).replace(/([A-Z])/g, "-$1")}`;
    return replacedStr.toLowerCase();
  })

  const content = resolveVariables(`Hello {{ toHyphen title }}`, {
    title: 'TestAbc'
  });

  expect(content).toBe('Hello test-abc');
});
