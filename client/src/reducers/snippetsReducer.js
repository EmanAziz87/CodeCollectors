import { createSlice } from '@reduxjs/toolkit';
import snippetService from '../services/snippets';

const snippetSlice = createSlice({
  name: 'snippet',
  initialState: [],
  reducers: {
    setSnippets(state, action) {
      return action.payload;
    },
    addSnippet(state, action) {
      return [...state, action.payload];
    },
  },
});

export const { addSnippet, setSnippets } = snippetSlice.actions;

export const inintializeSnippets = () => {
  return async (dispatch) => {
    const allSnippets = await snippetService.getAllSnippets();
    dispatch(setSnippets(allSnippets));
  };
};

export const createSnippet = (snippet) => {
  return async (dispatch) => {
    const createdSnippet = await snippetService.createSnippet(snippet);
    dispatch(addSnippet(createdSnippet));
  };
};

export default snippetSlice.reducer;
