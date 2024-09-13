import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RouteResponse } from "@types";

// Define the type for the state
export interface StreetState {
  isLoading: boolean;
  streetLists: RouteResponse[];
}

// Define the initial state using the type
const initialState: StreetState = {
  isLoading: true,
  streetLists: []
};

// Define the type for the response data
type StreetResponse = Array<{
  coordinates: [number, number][];
}>;

// Create the async thunk with the correct return type
export const getStreetsContent = createAsyncThunk<StreetResponse>(
  "/streets/content",
  async () => {
    try {
      const response = await axios.get<StreetResponse>("/street/getStreets");
      return response.data;
    } catch (error) {
      console.error("error", error);
      throw error;
    }
  }
);

// Create the slice with the correct state and action types
export const streetSlice = createSlice({
  name: "street",
  initialState,
  reducers: {
    addRoute: (state, action: PayloadAction<RouteResponse>) => {
      state.streetLists.push(action.payload);
    },
    addFirstRoute: (state, action: PayloadAction<RouteResponse>) => {
      state.streetLists = [action.payload];
    },
    addRoutes: (state, action: PayloadAction<RouteResponse[]>) => {
      state.streetLists = action.payload;
    },
    clearRoutes: (state) => {
      state.streetLists = [];
    }
  }
});

export const { addRoute, addFirstRoute, addRoutes, clearRoutes } =
  streetSlice.actions;

export default streetSlice.reducer;
