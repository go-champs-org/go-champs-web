import type { AbstractIntlMessages } from 'next-intl';

// The rest of the catalogue is read only on the server; sending it bloats every page's RSC payload.
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
