import {
  CONNECTIONS_LOADED_SUCCESSFULLY,
  ERROR_CONNECTIONS_LOADING,
  SEARCH_VALUE_CHANGED,
  TEXTINPUT_FOCUSED,
  TEXTINPUT_BLURRED,
  SORT_ASCENDING,
  SORT_DESCENDING,
  SORT_NONE,
} from './types';
import axios from 'axios';

export const fetchConnections = () => async dispatch => {
  try {
    let response = await axios.get(
      'https://run.mocky.io/v3/e6daf7f7-9ec2-42cf-b221-ef64f1c0c6a5',
    );
    dispatch({
      type: CONNECTIONS_LOADED_SUCCESSFULLY,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_CONNECTIONS_LOADING,
      payload: err.message,
    });
  }
};

const titleCase = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const handleTextChange = (text, data) => dispatch => {
  let filteredData;
  filteredData = data.filter(item => item?.firstname.includes(titleCase(text)));
  console.log(filteredData);
  return dispatch({
    type: SEARCH_VALUE_CHANGED,
    payload: {text, filteredData},
  });
};

export const handleOnFocus = () => dispatch => {
  return dispatch({
    type: TEXTINPUT_FOCUSED,
    payload: true,
  });
};

export const handleOnBlur = () => dispatch => {
  return dispatch({
    type: TEXTINPUT_BLURRED,
    payload: false,
  });
};

const sortAscending = (data, dispatch) => {
  let ascendingSortedData = [...data].sort((a, b) =>
    a?.firstname.localeCompare(b?.firstname),
  );
  let isSorted = true;
  return dispatch({
    type: SORT_ASCENDING,
    payload: {isSorted, ascendingSortedData},
  });
};

const sortDescending = (data, dispatch) => {
  let descendingSortedData = [...data]
    .sort((a, b) => a?.firstname.localeCompare(b?.firstname))
    .reverse();
  let isSorted = true;
  return dispatch({
    type: SORT_DESCENDING,
    payload: {isSorted, descendingSortedData},
  });
};

export const sortData = (item, data) => dispatch => {
  const sortArray = () => {
    if (item === 'ascending') {
      return sortAscending(data, dispatch);
    }
    if (item === 'descending') {
      return sortDescending(data, dispatch);
    }
    return dispatch({
      type: SORT_NONE,
      payload: {
        doSort: false,
      },
    });
  };
  sortArray();
};
