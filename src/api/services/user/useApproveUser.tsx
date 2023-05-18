import { ResponseState } from '../../../store/response-state.type';
import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { toast } from 'react-toastify';

export const useApproveUser = () => {
  const { axios } = useAxios();
  const { state: approveUserRes } = useResponseState<any>(null);

  const approveUser = async (id: number): Promise<ResponseState<null>> => {
    try {
      await axios.patch(`/user/approve/${id}`, {});
      toast.success('User approved!');
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
    approveUserRes,
    approveUser,
  };
};
