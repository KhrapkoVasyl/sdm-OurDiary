import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

export const useActions = (actions) => {
  const dispatch = useDispatch();
  const bindedActions = bindActionCreators(actions, dispatch);
  return bindedActions;
};
