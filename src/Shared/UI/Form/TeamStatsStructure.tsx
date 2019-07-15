import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Field, FieldRenderProps, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import StringInput from './StringInput';


const initialTeamStatsStructureState = {
  value: {}
};

type State = Readonly<typeof initialTeamStatsStructureState>;

class TeamStatsStructure extends React.Component<
  FieldRenderProps<any, HTMLElement>
  > {
  readonly state: State = initialTeamStatsStructureState;

  render() {
    return (
      <div>
        <Form
          onSubmit={this.addStats}
          mutators={{
            ...arrayMutators
          }}
          render={({ form: {
            mutators: { push, pop }
          }, }) => {
            return (
              <div className="columns is-multiline">
                <FieldArray name="customers">
                  {({ fields }: any) =>
                    fields.map((name: any, index: any) => {
                      return (
                        <div key={name} className="column is-12 columns is-gapless" style={{ marginBottom: 0 }}>
                          <div className="column is-6">
                            <Field
                              name="title"
                              component={StringInput}
                              placeholder="Title"
                            />
                          </div>

                          <div className="column is-6">
                            <div className="columns is-gapless is-mobile">
                              <div className="column is-10" style={{ marginLeft: '1rem', marginRight: '-1rem', }}>
                                <Field
                                  name="key"
                                  component={StringInput}
                                  placeholder="key"
                                />
                              </div>

                              <div className="column is-2 has-text-right">
                                <button type="button" className="button">
                                  <span className="icon is-small">
                                    <i className="fas fa-plus" />
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  }
                </FieldArray>
                <div className="column is-12">
                  <button
                    className="button is-secondary is-fullwidth "
                    type="button"
                    onClick={() => push('customers', undefined)}>
                    New stat
                  </button>
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  }

  addStats(values: any) {
    console.log(values, 'arroz3');
    this.setState({
      value: {
        ...this.state.value
      }
    });
  }

  onBlur(event: any) {
    this.props.input.onBlur(event);
  }

  onChange(value: any) {
    console.log(value, 'arroz');
    this.props.input.onChange(value);
  }

  onFocus(event: any) {
    this.props.input.onFocus(event);
  }
}

export default ({ input, meta }: any) => (
  <TeamStatsStructure input={input} meta={meta} />
);
