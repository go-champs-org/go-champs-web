import type { AbstractIntlMessages } from 'next-intl';

// Every other catalogue entry is read on the server; sending the whole file
// put ~10 KB into the RSC payload of every page. clientMessages.test.ts fails
// when a client component starts translating from a namespace missing here.
export const CLIENT_NAMESPACES = ['home', 'contact'] as const;

export const pickClientMessages = (
  messages: AbstractIntlMessages
): AbstractIntlMessages =>
  Object.fromEntries(
    CLIENT_NAMESPACES.filter(namespace => namespace in messages).map(namespace => [
      namespace,
      messages[namespace]
    ])
  );
