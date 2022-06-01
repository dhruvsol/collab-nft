import { createSlice } from "@reduxjs/toolkit";

interface members {
  Name: string;
  WalletAddress: string;
  Role: string;
  XpPercent: number;
}
interface FormInfo {
  MemberArray: Array<members>;
  memberCount: number;
}

const initialState: FormInfo = {
  memberCount: 0,
  MemberArray: [],
};
export const FormMemberSlice = createSlice({
  name: "FormSlice",
  initialState,
  reducers: {
    addNewMember: (state: FormInfo, action: any) => {
      state.MemberArray = [...state.MemberArray, action.payload];
      state.memberCount = state.memberCount + 1;
    },
    removeMember: (state: FormInfo, action: any) => {
      state.MemberArray = state.MemberArray.filter((arr: members) => {
        return arr.WalletAddress != action.payload;
      });
      state.memberCount -= 1;
    },
  },
});

export const { removeMember, addNewMember } = FormMemberSlice.actions;

export default FormMemberSlice.reducer;
