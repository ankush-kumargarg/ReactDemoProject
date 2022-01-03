import {ADD_FOOD, DELETE_FOOD} from '../actions/types';

const initialState = {
  foodList: [],
};

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FOOD:
      return {
        ...state,
        foodList: state.foodList.concat({
          keyValue: Math.random(),
          name: action.data,
          photo:
            'https://t4.ftcdn.net/jpg/01/90/89/15/240_F_190891550_N7uKp2aHE3mOc20dmtDytj7atgvbhdOu.jpg',
        }),
      };
    case DELETE_FOOD:
      console.log('Item>KEyValue', action.key);
      return {
        ...state,
        foodList: state.foodList.filter(item => item.keyValue !== action.key),
      };
    default:
      return state;
  }
};

export default foodReducer;
