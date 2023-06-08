import { ResponseState } from '../../../store/response-state.type';
import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { toast } from 'react-toastify';

export const useUnblockUser = () => {
  const { axios } = useAxios();
  const { state: unblockUserRes } = useResponseState<any>(null);

  const unblockUser = async (id: number): Promise<ResponseState<null>> => {
    try {
      await axios.patch(`/user/unblock/${id}`, {});
      toast.success('User unblocked!');
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
    unblockUserRes,
    unblockUser,
  };
};
