import traverse from 'traverse';
import deepExtend from 'deep-extend';
import { AppError } from './error';

const is = function (this: { code: string }, maybeError: any): boolean {
  if (!maybeError || !maybeError.code) return false;
  let code = String(maybeError.code);
  return code === this.code || code.startsWith(this.code + '.');
};


type withMessage = { message: string };
type Uncomplete = {
  [key in string]: (Uncomplete & withMessage) | string;
};

type ErrorInfo = { code: string; is: typeof is };
type ErrorCreator = {
  new: (info?: any, cause?: Error) => AppError;
};
type Completed<T> = {
  [key in keyof T]: Completed<T[key]> & ErrorCreator & ErrorInfo;
};

export function complete<T extends Uncomplete>(codeObject: T): Completed<T>;
export function complete<T extends Uncomplete, B extends Uncomplete>(base: T, codeObject: B): Completed<T> & Completed<B>;
export function complete<T extends Uncomplete, B extends Uncomplete>(o1: T, o2?: B): Completed<T & B> {
  const target: any = deepExtend({}, o1, o2);
  traverse(target).forEach(function (value: withMessage) {
    if (value && typeof (value) === 'object' && this.path.length > 0) {
      const code = this.path.join('.');
      const message = value.message;
      const node: any = {};
      node.new = (info?: any, cause?: Error) => new AppError(message, code, info, cause);
      node.code = code;
      node.is = is;
      this.update({ ...value, ...node});
    }
  });
  return <Completed<T & B>> target;
}
