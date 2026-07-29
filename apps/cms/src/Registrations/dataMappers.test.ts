import { ApiRegistrationCustomField } from '../Shared/httpClient/apiTypes';
import { mapApiCustomFieldToCustomFieldEntity } from './dataMappers';

describe('mapApiCustomFieldToCustomFieldEntity', () => {
  it('uses the API id when present', () => {
    const apiCustomField: ApiRegistrationCustomField = {
      id: 'some-id',
      label: 'Shirt size',
      type: 'text',
      required: false
    };

    expect(mapApiCustomFieldToCustomFieldEntity(apiCustomField).id).toEqual(
      'some-id'
    );
  });

  it('falls back to the label when the API omits id, instead of colliding on an empty string', () => {
    const apiCustomField: ApiRegistrationCustomField = {
      label: 'Shirt size',
      type: 'text',
      required: false
    };

    expect(mapApiCustomFieldToCustomFieldEntity(apiCustomField).id).toEqual(
      'Shirt size'
    );
  });
});
