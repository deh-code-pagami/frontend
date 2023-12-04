import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GroupState {
  group?: Group
}

const initialState: GroupState = {};

export const groupSlice = createSlice({
  name: 'groupState',
  initialState,
  reducers: {
    setGroup: (state, action: PayloadAction<Group | undefined>) => {
      state.group = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setGroup } = groupSlice.actions

export default groupSlice.reducer