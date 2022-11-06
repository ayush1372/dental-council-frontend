import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uploadState: { uploadPercentage: '', uploadStatus: '' },
};

const uploadDocument = createSlice({
  name: 'upload-document-reducer',
  initialState,
  reducers: {
    uploadDocumentState: (state, action) => {
      state.uploadState = action.payload;
    },
  },
});

export const { uploadDocumentState } = uploadDocument.actions;

export default uploadDocument.reducer;
