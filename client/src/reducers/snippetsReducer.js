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

export const initializeSnippets = () => {
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

export const editSnippet = (snippetId, snippet) => {
  return async (dispatch, getState) => {
    await snippetService.editSnippet(snippetId, snippet);
    const snippets = getState().snippets;
    const updatedSnippetsList = snippets.filter(
      (snip) => snip.id !== snippetId
    );
    dispatch(setSnippets(updatedSnippetsList));
  };
};

export const deleteSnippet = (snippetId) => {
  return async (dispatch, getState) => {
    await snippetService.deleteSnippet(snippetId);

    const snippets = getState().snippets;
    const removedSnippetList = snippets.filter(
      (snippet) => snippet.id !== snippetId
    );
    dispatch(setSnippets(removedSnippetList));
  };
};

export default snippetSlice.reducer;
