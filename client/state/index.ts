
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {isSidebarCollapsed: boolean,isDarkMode:boolean,sideBarSize:number[]}

const initialState = {isSidebarCollapsed: false,isDarkMode: false,sideBarSize:[20,80]}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isSidebarCollapsed = action.payload;
        },
        setIsDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        },
        setSideBarSize: (state, action: PayloadAction<number[]>) => {
            state.sideBarSize = action.payload;
        },
        
    },
});

export const { setIsDarkMode,setIsSidebarCollapsed,setSideBarSize} = globalSlice.actions;

export default globalSlice.reducer;
