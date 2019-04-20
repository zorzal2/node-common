import traverse from 'traverse';
import deepExtend from 'deep-extend';

const is = function (this: { code: string }, maybeError: any): boolean {
  if (!maybeError || !maybeError.code) return false;
  let code = String(maybeError.code);
  return code === this.code || code.startsWith(this.code + '.');
};

type ErrorInfo = { code: string; is: typeof is };
type Completed<T> = { [key in keyof T]: Completed<T[key]> } & ErrorInfo;

export function complete<T extends object>(codeObject: T): Completed<T>;
export function complete<T extends object, B extends object>(base: T, codeObject: B): Completed<T> & Completed<B>;
export function complete<T extends object, B extends object>(o1: T, o2?: B): Completed<T & B> {
  const target = deepExtend({}, o1, o2);
  traverse(target).forEach(function (value) {
    if (value && typeof (value) === 'object' && this.path.length > 0) {
      value.code = this.path.join('.');
      value.is = is;
    }
  });
  return <Completed<T & B>> target;
}
