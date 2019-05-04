import { complete } from '../src/code';
import { AppError } from '../src';

describe('code/complete', () => {
  test('No base. Code code is present.', () => {
    const Codes = complete({
      badRequest: {
        message: 'some',
        invalidCuit: {
          message: 'some',
        },
        invalidId: {
          message: 'some',
        },
      },
      internalError: {
        message: 'some',
      }
    });
    expect(Codes.internalError.code).toBe('internalError');
    expect(Codes.badRequest.code).toBe('badRequest');
    expect(Codes.badRequest.invalidCuit.code).toBe('badRequest.invalidCuit');
    expect(Codes.badRequest.invalidId.code).toBe('badRequest.invalidId');
  });
  test('No base. .is() works with empty values.', () => {
    const Codes = complete({
      badRequest: {
        message: 'some',
        invalidCuit: {
          message: 'some',
        },
        invalidId: {
          message: 'some',
        },
      },
      internalError: {
        message: 'some',
      }
    });

    expect(Codes.badRequest.invalidCuit.is(false)).toBeFalsy();
    expect(Codes.badRequest.invalidCuit.is('')).toBeFalsy();
    expect(Codes.badRequest.invalidCuit.is(0)).toBeFalsy();
    expect(Codes.badRequest.invalidCuit.is(undefined)).toBeFalsy();
    expect(Codes.badRequest.invalidCuit.is(null)).toBeFalsy();
  });
  test('No base. .is() works with objects with no code.', () => {
    const Codes = complete({
      badRequest: {
        message: 'some',
        invalidCuit: {
          message: 'some',
        },
        invalidId: {
          message: 'some',
        },
      },
      internalError: {
        message: 'some',
      }
    });

    expect(Codes.badRequest.invalidCuit.is(['Hello', 'World'])).toBeFalsy();
    expect(Codes.badRequest.invalidCuit.is(123)).toBeFalsy();
    expect(Codes.badRequest.invalidCuit.is({ hello: 'world' })).toBeFalsy();
  });
  test('No base. .is() works with objects with code.', () => {
    const Codes = complete({
      badRequest: {
        message: 'some',
        invalidCuit: {
          message: 'some',
        },
        invalidId: {
          message: 'some',
        },
      },
      internalError: {
        message: 'some',
      }
    });

    expect(Codes.badRequest.invalidCuit.is({ code: 'badRequest.invalidCuit' })).toBeTruthy();
    expect(Codes.badRequest.invalidCuit.is({ code: 'hello' })).toBeFalsy();
  });

  test('No base. .new() create a AppError', () => {
    const Codes = complete({
      badRequest: {
        message: 'some',
        invalidCuit: {
          message: 'some',
        },
        invalidId: {
          message: 'some',
        },
      },
      internalError: {
        message: 'some',
      }
    });

    expect(Codes.badRequest.new).toBeInstanceOf(Function);
    expect(Codes.badRequest.invalidCuit.new).toBeInstanceOf(Function);
    expect(Codes.badRequest.invalidId.new).toBeInstanceOf(Function);
    expect(Codes.internalError.new).toBeInstanceOf(Function);

    expect(Codes.badRequest.new()).toBeInstanceOf(AppError);
    expect(Codes.badRequest.invalidCuit.new()).toBeInstanceOf(AppError);
    expect(Codes.badRequest.invalidId.new()).toBeInstanceOf(AppError);
    expect(Codes.internalError.new()).toBeInstanceOf(AppError);

    expect(Codes.badRequest.new().code).toBe(Codes.badRequest.code);
    expect(Codes.badRequest.invalidCuit.new().code).toBe(Codes.badRequest.invalidCuit.code);
    expect(Codes.badRequest.invalidId.new().code).toBe(Codes.badRequest.invalidId.code);
    expect(Codes.internalError.new().code).toBe(Codes.internalError.code);
  });

  test('With base. Base is extended and completed.', () => {
    const BaseCodes1 = {
      badRequest: {
        message: 'some',
        invalidCuit: {
          message: 'some'
        },
      }
    };
    const BaseCodes2 = complete(BaseCodes1, {
      badRequest: {
        message: 'some',
        invalidId: {
          message: 'some'
        },
      },
      internalError: {
        message: 'some'
      }
    });
    const Codes = complete(BaseCodes2, {
      badRequest: {
        message: 'some',
        invalidCuit: {
          message: 'some',
          invalidPrefix: {
            message: 'some'
          }
        }
      }
    });

    expect(Codes.internalError.code).toBe('internalError');
    expect(Codes.badRequest.code).toBe('badRequest');
    expect(Codes.badRequest.invalidCuit.code).toBe('badRequest.invalidCuit');
    expect(Codes.badRequest.invalidCuit.invalidPrefix.code).toBe('badRequest.invalidCuit.invalidPrefix');
    expect(Codes.badRequest.invalidId.code).toBe('badRequest.invalidId');


    expect(Codes.internalError.is).toBeInstanceOf(Function);
    expect(Codes.badRequest.is).toBeInstanceOf(Function);
    expect(Codes.badRequest.invalidCuit.is).toBeInstanceOf(Function);
    expect(Codes.badRequest.invalidCuit.invalidPrefix.is).toBeInstanceOf(Function);
    expect(Codes.badRequest.invalidId.is).toBeInstanceOf(Function);
  });
});
