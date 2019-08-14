import React from 'react';
import { Field, Form, FormRenderProps } from 'react-final-form';
import Select from '../../Shared/UI/Form/Select';
import StringInput from '../../Shared/UI/Form/StringInput';

const PhaseTypes = {
  standings: 'Standings',
  bracket: 'Bracket'
};

interface PhaseModel {
  name?: string;
}

const BracketEditor: React.FC = () => {
  return (
    <div>
      <div className="columns is-mobile is-vcentered">
        <div className="column is-8">
          <h2 className="subtitle">Bracket</h2>
        </div>
      </div>

      <div className="field">
        <label className="label">Bracket rounds</label>
        <div className="control">
          <Field name="name" component={StringInput} placeholder="Stat" />
        </div>
      </div>

      <div className="field">
        <label className="label">Round matches</label>
        <div className="control">
          <Field
            name="firstTeam"
            component={StringInput}
            placeholder="First team"
          />
        </div>

        <div className="control">
          <Field
            name="secondTeam"
            component={StringInput}
            placeholder="Second team"
          />
        </div>
      </div>
    </div>
  );
};

const StandingsEditor: React.FC = () => {
  return (
    <div>
      <div className="columns is-mobile is-vcentered">
        <div className="column is-8">
          <h2 className="subtitle">Standings</h2>
        </div>
      </div>

      <div className="field">
        <label className="label">Team stats</label>
        <div className="control">
          <Field name="name" component={StringInput} placeholder="Stat" />
        </div>
      </div>

      <div className="field">
        <label className="label">Team groups</label>
        <div className="control">
          <Field name="name" component={StringInput} placeholder="Group" />
        </div>
      </div>
    </div>
  );
};

interface PhaseProps extends FormRenderProps {
  phase: PhaseModel;
}

const Phase: React.FC<PhaseProps> = ({ handleSubmit, phase, values }) => {
  const TypeEditor =
    values.type === PhaseTypes.standings ? StandingsEditor : BracketEditor;
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <Field name="name" component={StringInput} placeholder="Name" />
        </div>
      </div>

      <div className="field">
        <label className="label">Type</label>
        <div className="control">
          <Field
            name="type"
            component={Select}
            selectOptions={Object.values(PhaseTypes)}
            getOptionLabel={(phaseType: string) => phaseType}
          />
        </div>
      </div>

      {values.type && <TypeEditor />}
    </form>
    // <div className="card">
    // 	<header className="card-header">
    // 		<p className="card-header-title">
    // 			{phase.name || 'Phase'}
    // 		</p>
    // 		<a href="#" className="card-header-icon" aria-label="more options">
    // 			<span className="icon">
    // 				<i className="fas fa-angle-down" aria-hidden="true"></i>
    // 			</span>
    // 		</a>
    // 	</header>

    // 	<div className="card-content">
    // 		<div className="content">

    // 		</div>
    // 	</div>

    // </div>
  );
};

class Edit extends React.Component {
  state: { phases: PhaseModel[] } = { phases: [] };
  render() {
    return (
      <div>
        {this.state.phases.map(phase => (
          <Form
            onSubmit={values => console.log(values)}
            initialValues={phase}
            render={props => <Phase phase={phase} {...props} />}
          />
        ))}
        <button
          className="button is-fullwidth"
          onClick={() => this.addPhases()}
        >
          Add phase
        </button>
      </div>
    );
  }

  addPhases() {
    this.setState({
      phases: [...this.state.phases, {}]
    });
  }
}

export default Edit;
