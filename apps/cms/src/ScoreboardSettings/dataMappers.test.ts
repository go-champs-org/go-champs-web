import { ApiScoreboardSetting } from '../Shared/httpClient/apiTypes';
import {
  mapApiScoreboardSettingToScoreboardSettingEntity,
  mapScoreboardSettingEntityToApiScoreboardSettingPatchRequest,
  mapScoreboardSettingEntityToApiScoreboardSettingPostRequest
} from './dataMappers';
import {
  DEFAULT_SCOREBOARD_SETTING,
  ScoreboardSettingEntity,
  ScoreboardSettingLiveSiteUpdate,
  ScoreboardSettingRulesVersion
} from './state';

const scoreboardSettingEntity: ScoreboardSettingEntity = {
  id: 'scoreboard-setting-id',
  initialPeriodTime: 600,
  initialExtraPeriodTime: 300,
  liveSiteUpdate: ScoreboardSettingLiveSiteUpdate.FULL_LIVE_UPDATE,
  rulesVersion: ScoreboardSettingRulesVersion.FIBA_2026
};

describe('DEFAULT_SCOREBOARD_SETTING', () => {
  it('preselects fiba-2024 rules version', () => {
    expect(DEFAULT_SCOREBOARD_SETTING.rulesVersion).toBe(
      ScoreboardSettingRulesVersion.FIBA_2024
    );
  });
});

describe('mapScoreboardSettingEntityToApiScoreboardSettingPatchRequest', () => {
  it('maps rules_version', () => {
    expect(
      mapScoreboardSettingEntityToApiScoreboardSettingPatchRequest(
        scoreboardSettingEntity
      )
    ).toEqual({
      scoreboard_setting: {
        id: 'scoreboard-setting-id',
        initial_period_time: 600,
        initial_extra_period_time: 300,
        live_site_update: 'full-live-update',
        rules_version: 'fiba-2026'
      }
    });
  });
});

describe('mapScoreboardSettingEntityToApiScoreboardSettingPostRequest', () => {
  it('maps rules_version', () => {
    expect(
      mapScoreboardSettingEntityToApiScoreboardSettingPostRequest(
        scoreboardSettingEntity,
        'tournament-id'
      )
    ).toEqual({
      scoreboard_setting: {
        id: 'scoreboard-setting-id',
        initial_period_time: 600,
        initial_extra_period_time: 300,
        live_site_update: 'full-live-update',
        rules_version: 'fiba-2026',
        tournament_id: 'tournament-id'
      }
    });
  });
});

describe('mapApiScoreboardSettingToScoreboardSettingEntity', () => {
  it('maps rules_version', () => {
    const apiScoreboardSetting: ApiScoreboardSetting = {
      id: 'scoreboard-setting-id',
      initial_period_time: 600,
      initial_extra_period_time: 300,
      live_site_update: 'no-live-update',
      rules_version: 'fiba-2024'
    };

    expect(
      mapApiScoreboardSettingToScoreboardSettingEntity(apiScoreboardSetting)
    ).toEqual({
      id: 'scoreboard-setting-id',
      initialPeriodTime: 600,
      initialExtraPeriodTime: 300,
      liveSiteUpdate: ScoreboardSettingLiveSiteUpdate.NO_LIVE_UPDATE,
      rulesVersion: ScoreboardSettingRulesVersion.FIBA_2024
    });
  });
});
