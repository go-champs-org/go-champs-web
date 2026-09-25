import { readdirSync, readFileSync, statSync } from 'fs';
import path from 'path';
import { CLIENT_NAMESPACES, pickClientMessages } from './clientMessages';

const SOURCE_ROOTS = ['../../app', '../../src', '../../../../packages/ui/src'].map(root =>
  path.resolve(__dirname, root)
);

const isSourceFile = (entry: string): boolean =>
  /\.tsx?$/.test(entry) && !/\.test\.tsx?$/.test(entry);

const fileEntry = (full: string, entry: string): string[] =>
  isSourceFile(entry) ? [full] : [];

const directoryEntry = (full: string, entry: string): string[] =>
  entry === 'node_modules' ? [] : sourceFiles(full);

const collectEntry = (full: string, entry: string): string[] => {
  if (statSync(full).isDirectory()) return directoryEntry(full, entry);
  return fileEntry(full, entry);
};

const sourceFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap(entry => collectEntry(path.join(dir, entry), entry));

const clientNamespaces = (): string[] =>
  SOURCE_ROOTS.flatMap(sourceFiles)
    .map(file => readFileSync(file, 'utf8'))
    .filter(source => source.startsWith("'use client'"))
    .flatMap(source => [...source.matchAll(/useTranslations\('([^']+)'\)/g)].map(match => match[1]));

describe('pickClientMessages', () => {
  it('lists every namespace a client component translates with', () => {
    expect([...CLIENT_NAMESPACES].sort()).toEqual(expect.arrayContaining([...new Set(clientNamespaces())].sort()));
  });

  it('keeps only the client namespaces', () => {
    expect(
      pickClientMessages({ home: { a: 'A' }, contact: { b: 'B' }, footer: { c: 'C' } })
    ).toEqual({ home: { a: 'A' }, contact: { b: 'B' } });
  });

  it('skips a listed namespace the catalogue does not have', () => {
    expect(pickClientMessages({ home: { a: 'A' } })).toEqual({ home: { a: 'A' } });
  });
});
