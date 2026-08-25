import en from '@/messages/en.json';
import pt from '@/messages/pt.json';

type Messages = Record<string, Record<string, unknown>>;

const namespaceKeys = (messages: Messages): string[] =>
  Object.entries(messages)
    .flatMap(([namespace, values]) =>
      Object.keys(values).map(key => `${namespace}.${key}`)
    )
    .sort();

// A key written into the wrong namespace still parses, still lints and still
// passes every test that reads the other locale — it only shows up as a
// missing translation in production. Comparing the two files is what catches
// it, since pt is the locale the page tests render.
describe('messages', () => {
  it('declares the same keys in both locales', () => {
    expect(namespaceKeys(en as Messages)).toEqual(
      namespaceKeys(pt as Messages)
    );
  });
});
