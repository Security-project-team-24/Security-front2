import { ResponseState } from '../store/response-state.type';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function useResponseState<T>(defaultVal: T) {
  const [state, setState] = useState<ResponseState<T>>({
    error: null,
    status: 'IDLE',
    data: defaultVal,
  });

  const setLoading = () => {
    setState({
      ...state,
      status: 'LOADING',
    });
  };
  const setSuccess = (data?: T) => {
    setState({
      ...state,
      status: 'SUCCESS',
      data: data ?? state.data,
    });
  };

  const setError = (error?: string | null) => {
    console.error(error);
    setState({
      ...state,
      status: 'ERROR',
      error: error ?? state.error,
    });
  };

  const setSuccessWithToast = (message: string, data?: T) => {
    setSuccess(data);
    toast.success(message);
  };
  const setErrorWithToast = (message: string, error?: string | null) => {
    setError(error);
    toast.error(message);
  };

  return {
    state,
    setState,
    setLoading,
    setError,
    setSuccess,
    setErrorWithToast,
    setSuccessWithToast,
  };
}
