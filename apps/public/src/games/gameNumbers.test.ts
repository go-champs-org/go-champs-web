import { gameIdsByNumber } from './gameNumbers';

describe('gameIdsByNumber', () => {
  it('maps each game number to its game id', () => {
    expect(
      gameIdsByNumber([
        { id: 'g1', number: '47' },
        { id: 'g2', number: '48' }
      ])
    ).toEqual({ '47': 'g1', '48': 'g2' });
  });

  it('leaves out games that have no number', () => {
    expect(gameIdsByNumber([{ id: 'g1', number: '' }])).toEqual({});
  });
});
