import axios from 'axios';
import {
  NOTIFICATION_FAIL,
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
} from '../constant/notificationconstant';

const getNotification =  () =>async dispatch => {
   
  try {
    dispatch({type: NOTIFICATION_REQUEST});
    const {data} = await axios.get(
      'https://jsonplaceholder.typicode.com/todos/1',
    );
    console.log(data)
    dispatch({type: NOTIFICATION_SUCCESS, payload: data});
  } catch (err) {
    dispatch({type: NOTIFICATION_FAIL, error: err});
  }
};
export default getNotification;