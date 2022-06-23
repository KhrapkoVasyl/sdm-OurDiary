import { globalActions, globalReducer } from './globalSlice';
import { TASK_FORM_MODES } from 'constants/popup-modes';

describe('global reducer', () => {
  const initialState = {
    isPopupOpen: false,
    taskFormMode: TASK_FORM_MODES.EDIT,
    isLoading: false,
  };

  it('should handle initial state', () => {
    expect(globalReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setting popup open', () => {
    const actual = globalReducer(
      initialState,
      globalActions.setIsPopupOpen(true)
    );
    expect(actual.isPopupOpen).toEqual(true);
  });

  it('should handle setting popup closed', () => {
    const actual = globalReducer(
      initialState,
      globalActions.setIsPopupOpen(false)
    );
    expect(actual.isPopupOpen).toEqual(false);
  });

  it('should handle setting isLoading', () => {
    const actual = globalReducer(
      initialState,
      globalActions.setIsLoading(true)
    );
    expect(actual.isLoading).toEqual(true);
  });

  it('should handle setting popup mode correctly', () => {
    const actual = globalReducer(
      initialState,
      globalActions.setTaskFormMode(TASK_FORM_MODES.EDIT)
    );
    expect(actual.taskFormMode).toEqual(TASK_FORM_MODES.EDIT);
  });
});
