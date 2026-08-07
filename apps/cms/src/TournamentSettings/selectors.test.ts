import { NameCase, NameFormat } from '../Shared/dataMappers/nameFormatSettings';
import { tournamentSetting } from './selectors';
import {
  DEFAULT_TOURNAMENT_SETTING,
  initialState,
  TournamentSettingState
} from './state';

describe('tournamentSetting', () => {
  it('returns default when no tournament setting is loaded', () => {
    expect(tournamentSetting(initialState)).toEqual(DEFAULT_TOURNAMENT_SETTING);
  });

  it('returns the single loaded tournament setting', () => {
    const state: TournamentSettingState = {
      ...initialState,
      tournamentSettings: {
        'first-id': {
          id: 'first-id',
          nameFormat: NameFormat.FIRST_LAST,
          nameCase: NameCase.UPPER
        }
      }
    };

    expect(tournamentSetting(state)).toEqual({
      id: 'first-id',
      nameFormat: NameFormat.FIRST_LAST,
      nameCase: NameCase.UPPER
    });
  });

  it('returns default when more than one tournament setting is present', () => {
    const state: TournamentSettingState = {
      ...initialState,
      tournamentSettings: {
        'first-id': {
          id: 'first-id',
          nameFormat: NameFormat.FIRST_LAST,
          nameCase: NameCase.UPPER
        },
        'second-id': {
          id: 'second-id',
          nameFormat: NameFormat.FULL,
          nameCase: NameCase.ORIGINAL
        }
      }
    };

    expect(tournamentSetting(state)).toEqual(DEFAULT_TOURNAMENT_SETTING);
  });
});
