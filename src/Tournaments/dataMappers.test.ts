import { ApiPlayerStatResponse } from '../Shared/httpClient/apiTypes';
import {
  mapApiPlayerStatResponseToPlayerStatEntity,
  PRIVATE_STAT_SLUGS
} from './dataMappers';
import { DEFAULT_TOURNAMENT } from './state';

describe('mapApiPlayerStatResponseToPlayerStatEntity', () => {
  it('returns a player stat entity with public visibility by default', () => {
    const apiPlayerStatResponse: ApiPlayerStatResponse = {
      id: 'some-id',
      title: 'some-stat'
    };
    expect(
      mapApiPlayerStatResponseToPlayerStatEntity(apiPlayerStatResponse)
        .visibility
    ).toEqual('public');
  });

  it('returns a player stat entity with private visibility for PRIVATE_STAT_SLUGS', () => {
    PRIVATE_STAT_SLUGS.forEach(privateStatSlug => {
      const apiPlayerStatResponse: ApiPlayerStatResponse = {
        id: 'some-id',
        title: 'some-stat',
        slug: privateStatSlug
      };

      expect(
        mapApiPlayerStatResponseToPlayerStatEntity(apiPlayerStatResponse)
          .visibility
      ).toEqual('private');
    });
  });
});
