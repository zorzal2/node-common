import { complete } from '../src/code';

describe('code/complete', () => {
  test('No base. Code code is present.', () => {
    const Codes = complete({
      badRequest: {
        invalidCuit: {},
        invalidId: {},
      },
      internalError: {}
    });

    expect(Codes.internalError.code).toBe('internalError');
    expect(Codes.badRequest.code).toBe('badRequest');
    expect(Codes.badRequest.invalidCuit.code).toBe('badRequest.invalidCuit');
    expect(Codes.badRequest.invalidId.code).toBe('badRequest.invalidId');
  });
  test('No base. .is() works with empty values.', () => {
    const Codes = complete({
      badRequest: {
        invalidCuit: {},
        invalidId: {},
      },
      internalError: {}
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
        invalidCuit: {},
        invalidId: {},
      },
      internalError: {}
    });

    expect(Codes.badRequest.invalidCuit.is(['Hello', 'World'])).toBeFalsy();
    expect(Codes.badRequest.invalidCuit.is(123)).toBeFalsy();
    expect(Codes.badRequest.invalidCuit.is({ hello: 'world' })).toBeFalsy();
  });
  test('No base. .is() works with objects with code.', () => {
    const Codes = complete({
      badRequest: {
        invalidCuit: {},
        invalidId: {},
      },
      internalError: {}
    });

    expect(Codes.badRequest.invalidCuit.is({ code: 'badRequest.invalidCuit' })).toBeTruthy();
    expect(Codes.badRequest.invalidCuit.is({ code: 'hello' })).toBeFalsy();
  });
  test('With base. Base is extended and completed.', () => {
    const BaseCodes1 = {
      badRequest: {
        invalidCuit: {},
      }
    };
    const BaseCodes2 = complete(BaseCodes1, {
      badRequest: {
        invalidId: {},
      },
      internalError: {}
    });
    const Codes = complete(BaseCodes2, {
      badRequest: {
        invalidCuit: {
          invalidPrefix: {}
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
