import { ErrorResponseType } from './errorHandlerTypes';

const dev = import.meta.env.VITE_APP_NODE_ENV !== 'production';

export const loginErrorHandler = (err: ErrorResponseType): string => {
  if (dev) console.log(err);

  if (err?.data?.message) return err.data.message;

  if (!err?.originalStatus) {
    // isLoading: true until the timeout occurs
    return 'No Server Response';
  } else if (err?.originalStatus === 400) {
    return 'Missing Username or Password';
  } else if (err?.originalStatus === 401) {
    return 'Unauthorized';
  } else {
    return 'Login Failed';
  }
};

export const errorHandler = (err: ErrorResponseType): string => {
  if (dev) console.log(err);

  if (err?.data?.message) return err.data.message;

  if (!err?.originalStatus) {
    // isLoading: true until the timeout occurs
    return 'No Server Response';
  } else if (err?.originalStatus === 400) {
    return 'Missing Username or Password';
  } else if (err?.originalStatus === 401) {
    return 'Unauthorized';
  } else {
    return 'Ops Something went wrong!!!';
  }
};

export const signupErrorHandler = (err: ErrorResponseType): string => {
  if (dev) console.log(err);

  if (err?.data?.message) return err.data.message;

  if (err?.status === 403) {
    return 'User with the same email or phone number exists';
  } else if (err?.originalStatus === 401) {
    return 'Unauthorized';
  } else if (err?.status === 409) {
    return 'User with the same email or phone number exists';
  } else {
    return 'Ops Something went wrong!!!';
  }
};


