import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { ChangePasswordRequest } from './types/changepassword.type';
import { toast } from 'react-toastify';

export const useChangePassword = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    setSuccess,
    state: changePasswordRes,
  } = useResponseState<any>(null);

  const changePassword = async (data: ChangePasswordRequest) => {
    try {
      setLoading();
      const res = await axios.put(`/user/change-password`, data);
      setSuccess(res.data);
      // await get().fetchLoggedUser(get().loginStateRes.data ?? '');
      toast.success('Successfully changed password!');
    } catch (e: any) {
      setError(e.response.data.message);
      toast.error(e.response.data.message);
    }
  };

  return {
    changePasswordRes,
    changePassword,
  };
};
