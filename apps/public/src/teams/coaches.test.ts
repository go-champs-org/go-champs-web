import { labelCoaches } from './coaches';

const translate = (key: string) => `translated:${key}`;

describe('labelCoaches', () => {
  it('labels the coach types the CMS knows', () => {
    const labelled = labelCoaches(
      [
        { id: 'c1', name: 'Treinador', type: 'head_coach' },
        { id: 'c2', name: 'Assistente', type: 'assistant_coach' }
      ],
      translate
    );

    expect(labelled).toEqual([
      { id: 'c1', name: 'Treinador', label: 'translated:headCoach' },
      { id: 'c2', name: 'Assistente', label: 'translated:assistantCoach' }
    ]);
  });

  it('leaves an unknown type unlabelled rather than leaking the raw slug', () => {
    const labelled = labelCoaches(
      [{ id: 'c1', name: 'Preparador', type: 'strength_coach' }],
      translate
    );

    expect(labelled).toEqual([
      { id: 'c1', name: 'Preparador', label: '' }
    ]);
  });
});
