import { TextDecoder, TextEncoder } from 'node:util';
import '@testing-library/jest-dom';

// jsdom ships neither, and libraries that encode text at runtime (react-qr-code)
// throw on import without them. Node's are the same implementations the browser
// provides.
Object.assign(globalThis, { TextDecoder, TextEncoder });
