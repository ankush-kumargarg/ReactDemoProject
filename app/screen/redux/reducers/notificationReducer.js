import {
  NOTIFICATION_FAIL,
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
} from '../constant/notificationConstant'

const notificationReducer = (state = {notification: []}, action) => {
  switch (action.type) {
    case NOTIFICATION_REQUEST:
      return {
        notification: [],
      };
    case NOTIFICATION_SUCCESS:
      return {
        notification: action.payload,
      };
    case NOTIFICATION_FAIL:
      return {
        error: action.error,
      };
    default:
      return state;
  }
};

export default notificationReducer;
