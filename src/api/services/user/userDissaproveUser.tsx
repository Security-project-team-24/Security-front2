import { ResponseState } from '../../../store/response-state.type';
import { useAxios } from '../../useAxios';
import { toast } from 'react-toastify';

export const useDisapproveUser = () => {
  const { axios } = useAxios();

  const disapproveUser = async (
    id: number,
    reason: string
  ): Promise<ResponseState<null>> => {
    try {
      await axios.patch(`/user/disapprove/${id}/${reason}`, {});
      toast.success('User dissapproved!');
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
    disapproveUser,
  };
};
