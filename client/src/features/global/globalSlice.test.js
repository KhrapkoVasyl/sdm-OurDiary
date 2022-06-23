import { globalActions, globalReducer } from './globalSlice';

describe('global reducer', () => {
  const initialState = {
    isPopupOpen: false,
    isLoading: false,
  };

  it('should handle initial state', () => {
    expect(globalReducer(undefined, { type: 'unknown' })).toEqual({
      isPopupOpen: false,
      isLoading: false,
    });
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
});
