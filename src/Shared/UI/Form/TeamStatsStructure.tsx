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
    console.log(this.props, 'arroz');
    return (
      <div>
        <Form
          onSubmit={this.addStats}
          mutators={{
            ...arrayMutators
          }}
          render={props => {
            return (
              <div className="columns is-multiline">
                <FieldArray name="customers">
                  {({ fields }: any) =>
                    fields.map((name: any, index: any) => {
                      return (
                        <div key={name}>
                          <div className="column is-6">
                            <Field
                              name="title"
                              component={StringInput}
                              placeholder="Title"
                            />
                          </div>

                          <div className="column is-6">
                            <div className="columns is-gapless is-mobile">
                              <div className="column is-10">
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
    this.props.input.onChange(value);
  }

  onFocus(event: any) {
    this.props.input.onFocus(event);
  }
}

export default ({ input, meta }: any) => (
  <TeamStatsStructure input={input} meta={meta} />
);
