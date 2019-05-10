import { createStore } from 'redux';

const simpleReducer = (state = {}, action = {}) => {
    return state;
}

export default createStore(simpleReducer);