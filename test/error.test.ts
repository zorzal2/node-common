import { ZorzalError } from '../src/error';

describe('ZorzalError', () => {
  test('toJSON', () => {
    let gerr = new TypeError('Generic error');
    let zz1 = new ZorzalError('Zorzal error 1', 'zz1', { 'zz': 1 }, gerr);
    let zz2 = new ZorzalError('Zorzal error 2', 'zz2', { 'zz': 2 }, zz1);

    let reconstructed = <ZorzalError>JSON.parse(JSON.stringify(zz2));

    expect(reconstructed.name).toBe('ZorzalError');
    expect(reconstructed.message).toBe('Zorzal error 2');
    expect(reconstructed.code).toBe('zz2');
    expect(reconstructed.stack).toBeTruthy();
    expect(reconstructed.info.zz).toBe(2);

    let cause = <ZorzalError>reconstructed.cause;

    expect(cause.name).toBe('ZorzalError');
    expect(cause.message).toBe('Zorzal error 1');
    expect(cause.stack).toBeTruthy();
    expect(cause.code).toBe('zz1');
    expect(cause.info.zz).toBe(1);

    let causeOfCause = cause.cause;

    expect(causeOfCause).toBeTruthy();
    if (causeOfCause) {
      expect(causeOfCause.name).toBe('TypeError');
      expect(causeOfCause.message).toBe('Generic error');
      expect(causeOfCause.stack).toBeTruthy();
    }
  });
});
