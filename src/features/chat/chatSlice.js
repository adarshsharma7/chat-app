import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    currentUser: 'User1',
  },
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    deleteMessageForMe: (state, action) => {
      state.messages = state.messages.filter((_, index) => index !== action.payload);
    },
    editMessage: (state, action) => {
      const { index, newText } = action.payload;
      state.messages[index].text = newText;
      state.messages[index].edited = true; // Mark the message as edited
    },
  },
});

export const { sendMessage, receiveMessage, deleteMessageForMe, editMessage } = chatSlice.actions;
export default chatSlice.reducer;


