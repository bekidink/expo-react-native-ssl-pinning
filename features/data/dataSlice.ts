import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


interface DataState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
}

const initialState: DataState<any> = {
  isLoading: false,
  isError: false,
  data: null,
};

interface FetchDataResponse<T> {
  data: T;
}

// export const fetchAndSetData = createAsyncThunk(
//   "data/fetchAndSetData",
//   async (apiUrl: string) => {
//     try {
//       const response = await fetchData<any, any>(apiUrl);
//       return response.data;
//     } catch (error) {
//       throw new Error("Error fetching data");
//     }
//   }
// );

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(fetchAndSetData.pending, (state) => {
  //         state.isLoading = true;
  //         state.isError = false;
  //       })
  //       .addCase(
  //         fetchAndSetData.fulfilled,
  //         (state, action: PayloadAction<any>) => {
  //           state.isLoading = false;
  //           state.isError = false;
  //           state.data = action.payload;
  //         }
  //       )
  //       .addCase(fetchAndSetData.rejected, (state) => {
  //         state.isLoading = false;
  //         state.isError = true;
  //       });
  //   },
});

export const { setIsLoading } = dataSlice.actions;

export default dataSlice.reducer;

export const selectIsLoading = (state: { data: DataState<any> }) =>
  state.data.isLoading;
export const selectIsError = (state: { data: DataState<any> }) =>
  state.data.isError;
export const selectData = <T>(state: { data: DataState<T> }) => state.data.data;
