import { ResponseState } from '../../../store/response-state.type';
import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { toast } from 'react-toastify';

export const useForgotPassword = () => {
  const { axios } = useAxios();
  const { state: forgotPasswordRes } = useResponseState<any>(null);

  const forgotPassword = async (
    email: string
  ): Promise<ResponseState<null>> => {
    try {
      await axios.patch(`/user/forgot-password/${email}`, {});
      toast.success('Check your email for recovery!');
      return {
        data: null,
        error: null,
        status: 'SUCCESS',
      };
    } catch (e: any) {
      toast.error(e.response.data.message);
      return {
        data: null,
        error: e.response.data.message,
        status: 'ERROR',
      };
    }
  };

  return {
    forgotPasswordRes,
    forgotPassword,
  };
};
