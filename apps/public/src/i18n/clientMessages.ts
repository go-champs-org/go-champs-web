import type { AbstractIntlMessages } from 'next-intl';

// Rest of the catalogue is server-only; sending it all added ~10 KB per page's RSC payload.
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
