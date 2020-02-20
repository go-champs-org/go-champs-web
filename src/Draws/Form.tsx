import React from 'react';
import { TeamEntity } from '../Teams/state';
import { FormRenderProps } from 'react-final-form';
import { DrawEntity } from './state';

interface FromProps extends FormRenderProps<DrawEntity> {
  teams: { [key: string]: TeamEntity };
}

const Form: React.FC<FromProps> = () => <div>Draw form</div>;

export default Form;
