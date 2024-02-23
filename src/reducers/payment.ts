import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from '../utils/action-type.util';
import { getAccessControlList } from 'src/reducers/acl';
import { getAll } from 'src/reducers/cart';
import { toast } from 'react-toastify';
import {loadStripe} from "@stripe/stripe-js";

const publishableKey = "pk_test_51HoLXeL1Qbpqxb2kSkbiJKUgRHWcXBUUhpiNe7LzJsqP9tWZ8yucnZVSjVEnvTkVvhcutrT7ZWpCfHHUGoqHuxnE00LfZvYYzk";

export const ACTION_TYPES = {
  PAYMENT: 'payment/CHECKOUT',
  RESET: 'payment/RESET'
};


const initialState = {
  loading: false,
  errorMessage: null as string,
  successMessage: null,
  order: null,
  paymentStatus: null
};

export type PaymentState = Readonly<typeof initialState>;

// Reducer
export default (state: PaymentState = initialState, action): PaymentState => {
  switch (action.type) {
    // REQUEST
    case REQUEST(ACTION_TYPES.PAYMENT):
      return {
        ...state,
        loading: true
      };
    // FAILURE
    case FAILURE(ACTION_TYPES.PAYMENT):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
        paymentStatus: false
      };
    // SUCCESS
    case SUCCESS(ACTION_TYPES.PAYMENT): {
      return {
        ...state,
        loading: false,
        order: action.payload.data,
        paymentStatus: true
      };
    }
    // no call axios
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const checkout = data => async (dispatch) => {
  let response = await axios.post(`/api/payment/checkout`, data)
    .then(async (res) => {
      let checkout = res.data;
      if (checkout.success) {
        // reload acl and cart
        await dispatch(getAccessControlList());
        await dispatch(getAll());
        toast.success("Payment success ...");
      } else {
        // Show error message
        toast.error(checkout.errorMessage || "Error payment! Please contact administrator for more information");
      }
    })
    .catch((e) => {
      let error = e.response.data.message.split(';');
      if (error.length > 0) {
        toast.error(error[0]);
      }else {
        toast.error( e.response.data.message);
      }
    });

};

export const createCheckoutSession = data => async (dispatch) => {
  let response = await axios.post(`/api/payment/create-checkout-session`, data);
  let checkout = response.data;
  const stripePromise = loadStripe(
    publishableKey
  );

  const stripe = await stripePromise;

  stripe.redirectToCheckout({
    sessionId: checkout.sessionId
  })
};

export const resetPayment = () => ({
  type: ACTION_TYPES.RESET
});