/**
 * How long the sign up form waits on a username request before giving up.
 *
 * A request that never settles — an endpoint that is not answering, a preflight
 * that hangs — would otherwise leave the field spinning forever. The value is
 * far above the 200ms p95 both endpoints are held to, and far below the point
 * where an answer would still be useful inline. Giving up means no verdict and
 * no suggestion, never a blocked form: the user types on and the server decides
 * at submit time.
 */
export const USERNAME_REQUEST_TIMEOUT_MS = 2500;

export const wait = (delayMs: number) =>
  new Promise<void>(resolve => setTimeout(resolve, delayMs));

export const withTimeout = <T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T | undefined> =>
  Promise.race([promise, wait(timeoutMs).then(() => undefined)]);
