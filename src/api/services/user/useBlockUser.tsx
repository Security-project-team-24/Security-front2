import { ResponseState } from '../../../store/response-state.type';
import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { toast } from 'react-toastify';

export const useBlockUser = () => {
  const { axios } = useAxios();
  const { state: blockUserRes } = useResponseState<any>(null);

  const blockUser = async (id: number): Promise<ResponseState<null>> => {
    try {
      await axios.patch(`/user/block/${id}`, {});
      toast.success('User blocked!');
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
    blockUserRes,
    blockUser,
  };
};
