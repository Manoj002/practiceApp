import {
  CONNECTIONS_LOADED_SUCCESSFULLY,
  ERROR_CONNECTIONS_LOADING,
  SEARCH_VALUE_CHANGED,
  TEXTINPUT_FOCUSED,
  TEXTINPUT_BLURRED,
  SORT_ASCENDING,
  SORT_DESCENDING,
  SORT_NONE,
} from '../actions/types';

const initialState = {
  data: [],
  searchValue: '',
  showSearchedData: false,
  searchedData: [],
  doSort: false,
  sortedData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CONNECTIONS_LOADED_SUCCESSFULLY:
      return {...state, data: action.payload};
    case ERROR_CONNECTIONS_LOADING:
      return {...state, errorMessage: action.payload};
    case SEARCH_VALUE_CHANGED:
      return {
        ...state,
        searchValue: action.payload.text,
        searchedData: action.payload.filteredData,
      };
    case TEXTINPUT_FOCUSED:
      return {...state, showSearchedData: action.payload};
    case TEXTINPUT_BLURRED:
      return {...state, showSearchedData: action.payload};
    case SORT_ASCENDING:
      return {
        ...state,
        doSort: action.payload.isSorted,
        sortedData: action.payload.ascendingSortedData,
      };
    case SORT_DESCENDING:
      return {
        ...state,
        doSort: action.payload.isSorted,
        sortedData: action.payload.descendingSortedData,
      };
    case SORT_NONE:
      return {
        ...state,
        doSort: false,
      };
    default:
      return state;
  }
}
