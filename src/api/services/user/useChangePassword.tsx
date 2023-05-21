import { useApplicationStore } from '../../../store/application.store';
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

  const fetchLoggedUser = useApplicationStore((state) => state.fetchLoggedUser)
  const token = useApplicationStore((state) => state.loginStateRes.data)
  const changePassword = async (data: ChangePasswordRequest) => {
    try {
      setLoading();
      const res = await axios.put(`/user/change-password`, data);
      setSuccess(res.data);
      await fetchLoggedUser(token ?? "")
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
