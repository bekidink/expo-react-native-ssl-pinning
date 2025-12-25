// modalSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  view: boolean;
  confirm: boolean;
}

const initialState: ModalState = {
  view: false,
  confirm: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    show: (state) => {
      state.view = true;
    },
    hide: (state) => {
      state.view = false;
    },
    toggleModal: (state) => {
      state.view = !state.view;
    },
    showConfirm: (state) => {
      state.confirm = true;
    },
    hideConfirm: (state) => {
      state.confirm = false;
    },
    
  },
});

export const { show, hide, toggleModal, showConfirm, hideConfirm } =
  modalSlice.actions;

export const selectView = (state: any) => state.modal.view;
export const selectConfirm = (state: any) => state.modal.confirm;

export default modalSlice.reducer;
