import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {

    createNotification(state, action) {
      const notification = action.payload;
      return notification;
    },
    /*eslint-disable*/
    deleteNotification(state, action){
        return '';
    }
    /* eslint-enable */
  },
});

export const { createNotification, deleteNotification } = notificationSlice.actions;

export default notificationSlice.reducer;

let timerID;
export const setNotification = (notification, time) => async (dispatch) => {
  dispatch(createNotification(notification));

  if (timerID) { clearTimeout(timerID); }

  timerID = setTimeout(() => {
    dispatch(deleteNotification());
  }, time * 1000);
};
