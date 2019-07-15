import React from 'react';
import { FieldRenderProps } from 'react-final-form';

interface Stat {
  key: string;
  title: string;
}

const initialTeamStatsStructureState: { value: Stat[] } = {
  value: []
};

const apiDataToFormArray = (initialValue: { [key: string]: string }) => {
  return {
    value: Object.keys(initialValue).map((key: string) => {
      return { key, title: initialValue[key], };
    }),
  };
};

type State = Readonly<typeof initialTeamStatsStructureState>;

class TeamStatsStructure extends React.Component<
  FieldRenderProps<any, HTMLElement>
  > {
  readonly state: { value: Stat[] };
  constructor(props: any) {
    super(props);
    this.state = props.input.value ? apiDataToFormArray(props.input.value) : initialTeamStatsStructureState;
  }

  render() {
    return (
      <div className="columns is-multiline">
        {this.state.value.map((stat: Stat, index: number) => {
          return (
            <div key={index} className="column is-12 columns is-gapless" style={{ marginBottom: 0 }}>
              <div className="column is-6">
                <input className="input" type="text" value={stat.title} onChange={this.onTitleChange(index)} />
              </div>

              <div className="column is-6">
                <div className="columns is-gapless is-mobile">
                  <div className="column is-10" style={{ marginLeft: '1rem', marginRight: '-1rem', }}>
                    <input className="input" type="text" value={stat.key} onChange={this.onKeyChange(index)} />
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
        })}

        <div className="column is-12">
          <button className="button is-secondary is-fullwidth" type="button"
            onClick={this.addStats.bind(this)}>
            New stat
          </button>
        </div>
      </div >
    );
  }

  onKeyChange = (index: number) => (event: any) => {
    const updatedStats = this.state.value.map((stat, stateIndex) => {
      if (index !== stateIndex) {
        return stat;
      } else {
        return {
          ...stat,
          key: event.target.value,
        };
      }
    });

    this.setState({ value: updatedStats });
    this.onChange(updatedStats);
  };

  onTitleChange = (index: number) => (event: any) => {
    const updatedStats = this.state.value.map((stat, stateIndex) => {
      if (index !== stateIndex) {
        return stat;
      } else {
        return {
          ...stat,
          title: event.target.value,
        };
      }
    });

    this.setState({ value: updatedStats });
    this.onChange(updatedStats);
  };

  addStats() {
    this.setState({
      value: [
        ...this.state.value,
        { key: '', title: '', },
      ]
    });
  }

  onBlur(event: any) {
    this.props.input.onBlur(event);
  }

  onChange(values: Stat[]) {
    const initialTeamStats = {};
    const teamStats = values ? values.reduce((acc: any, stat: Stat) => {
      return {
        ...acc,
        [stat.key]: stat.title,
      }
    }, initialTeamStats) : initialTeamStats;
    this.props.input.onChange(teamStats);
  }

  onFocus(event: any) {
    this.props.input.onFocus(event);
  }
}

export default ({ input, meta }: any) => (
  <TeamStatsStructure input={input} meta={meta} />
);
