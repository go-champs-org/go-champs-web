// react-markdown ships as ESM only, which Jest cannot load from node_modules.
// Jest uses this file for every test, so a page that renders Markdown can be
// tested with its content shown as plain text.
export default function ReactMarkdown({ children }: { children: string }) {
  return <div data-testid="markdown">{children}</div>;
}
