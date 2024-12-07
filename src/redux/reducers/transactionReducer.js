import { TRANSACTIONS_LOADING, TRANSACTIONS_SUCCESS } from '../actions/types';

const initialState = {
  transactions: [],
  loading: false,
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTIONS_LOADING:
      return { ...state, loading: action.payload };
      case TRANSACTIONS_SUCCESS:
      return { ...state, transactions: action.payload };
    default:
      return state;
  }
};

export default transactionReducer;
