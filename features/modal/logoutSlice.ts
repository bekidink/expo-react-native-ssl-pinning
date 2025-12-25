import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RequestDataState = {
  type: string;
  data: any;
};

export type TransferType =
  | ""
  
  | "toDonation"
  | "toMerchant"
  | "toAgent"
  
  ;

type ModalState = {
  type: string;
  requestData: RequestDataState;
  qrData: RequestDataState;
  qrRequestData: RequestDataState;
  qrOldPayMerchantData:RequestDataState;
  statusDesc: string;
  isConfirmVisible: boolean;
  isWebViewConfirmVisible: boolean;
  isResponseVisible: boolean;
  isLogoutVisible: boolean;
  isPinAuthVisible: boolean;
  isPinAuth: boolean;
  webViewConfirmed: boolean;
  isPinVisible: boolean;
  isAuthed: boolean;
};

const initialState: ModalState = {
  type: "",
  requestData: { type: "", data: {} },
  qrData: { type: "", data: {} },
  qrRequestData: { type: "", data: {} },
  qrOldPayMerchantData:{ type: "", data: {} },
  statusDesc: "",
  isConfirmVisible: false,
  isWebViewConfirmVisible:false,
  isResponseVisible: false,
  isLogoutVisible: false,
  isPinAuth: false,
  isPinAuthVisible: false,
  webViewConfirmed: false,
  isAuthed: false,
  isPinVisible: false,
};

const modalSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    changeType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setRequestData: (
      state,
      action: PayloadAction<{ type: TransferType; data: any }>
    ) => {
      state.requestData = action.payload;
    },
    setQrData: (
      state,
      action: PayloadAction<{ type: TransferType; data: any }>
    ) => {
      state.qrData = action.payload;
    },
     setOldQrData: (
      state,
      action: PayloadAction<{ type: TransferType; data: any }>
    ) => {
      state.qrOldPayMerchantData = action.payload;
    },
    setQrRequestData: (
      state,
      action: PayloadAction<{ type: TransferType; data: any }>
    ) => {
      state.qrRequestData = action.payload;
    },
    setStatusDesc: (state, action: PayloadAction<string>) => {
      state.statusDesc = action.payload;
    },
    showConfirm: (state) => {
      state.type = "confirm";
      state.isConfirmVisible = true;
    },
    hideConfirm: (state) => {
      state.type = "";
      state.isConfirmVisible = false;
    },

    showPin: (state) => {
      state.type = "pinAuth";
      state.isPinAuthVisible = true;
    },
    hidePin: (state) => {
      state.type = "";
      state.isPinAuthVisible = false;
    },
    showPinAuth: (state) => {
      state.type = "";
      state.isPinAuth = true;
    },
    hidePinAuth: (state) => {
      state.type = "";
      state.isPinAuth = false;
    },
    showResponse: (state) => {
      state.type = "response";
      state.isResponseVisible = true;
    },
    hideResponse: (state) => {
      state.type = "";
      state.isResponseVisible = false;
    },
    showLogout: (state) => {
      state.type = "logout";
      state.isLogoutVisible = true;
    },
    hideLogout: (state) => {
      state.type = "";
      state.isLogoutVisible = false;
    },
    showWebConfirm: (state) => {
      state.type = "webConfirm";
      state.isWebViewConfirmVisible = true;
    },
    hideWebConfirm: (state) => {
      state.type = "";
      state.isWebViewConfirmVisible = false;
    },
    webConfirmed: (state) => {
      state.type = "";
      state.webViewConfirmed = true;
    },
    hidWebConfirmed: (state) => {
      state.type = "";
      state.webViewConfirmed = false;
    },
    showPinModal: (state) => {
      state.type = "reAuthenticate";
      state.isPinAuth = true;
    },
    hidePinModal: (state) => {
      state.type = "";
      state.isPinAuth = false;
    },
    IsAuthed: (state) => {
      state.type = "";
      state.isAuthed = true;
    },
    hideIsAuth: (state) => {
      state.type = "";
      state.isAuthed = false;
    },
  },
});

export const {
  setQrData,
  setQrRequestData,
  changeType,
  setRequestData,
  setStatusDesc,
  showLogout,
  hideLogout,
  showConfirm,
  hideConfirm,
  showResponse,
  hideResponse,
  showPin,
  showPinAuth,
  hidePin,
  hidePinAuth,
  webConfirmed,
  hidWebConfirmed,
  showWebConfirm,
  hideWebConfirm,
  showPinModal,
  hidePinModal,
  IsAuthed,
  hideIsAuth,
  setOldQrData
} = modalSlice.actions;

export const selectType = (state: any) => state.logout.type;
export const selectRequestData = (state: any) => state.logout.requestData;
export const selectQrData = (state: any) => state.logout.qrData;
export const selectOldQrData = (state: any) => state.logout.qrOldPayMerchantData;
export const selectQrRequestData = (state: any) => state.logout.qrRequestData;
export const selectStatusDesc = (state: any) => state.logout.statusDesc;
export const selectConfirm = (state: any) => state.logout.isConfirmVisible;
export const selectIsWebviewConfirm = (state: any) => state.logout.isWebViewConfirmVisible;
export const selectPinAuth = (state: any) => state.logout.isPinAuth;
// export const selectPinAuthVisible = (state: any) =>
//   state.logout.isPinAuthVisible;
export const selectPinAuthVisible = (state: any) =>
  state.logout.isPinAuth;
export const selectResponse = (state: any) => state.logout.isResponseVisible;
export const selectLogout = (state: any) => state.logout.isLogoutVisible;
export const selectWebViewConfirmed = (state: any) =>
  state.logout.webViewConfirmed;
export const selectIsAuth = (state: any) => state.logout.isAuthed;
export default modalSlice.reducer;
