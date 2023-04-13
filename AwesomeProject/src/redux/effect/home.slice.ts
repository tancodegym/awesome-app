import {createSlice} from '@reduxjs/toolkit';

export const homeSlice = createSlice({
  name: 'HOME_SLICE',
  initialState: {
    isUploading: false,
  },
  reducers: {
    uploadFile: state => {
      state.isUploading = true;
    },

    cancelUpload: state => {
      state.isUploading = false;
    },

    uploadDone: state => {
      state.isUploading = false;
    },
  },
});
export const {uploadFile, cancelUpload, uploadDone} = homeSlice.actions;
export default homeSlice.reducer;
