import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { User } from '../../../store/auth-store/model/user.model';
import { toast } from 'react-toastify';

export const useUpdatePersonalInfo = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    setSuccess,
    state: updatePersonalInfoRes,
  } = useResponseState<User | null>(null);

  const updatePersonalInfo = async (user: User) => {
    try {
      setLoading();
      const res = await axios.patch(`/user/update`, user);
      setSuccess(res.data);
      toast.success('Successfully updated personal info');
    } catch (e: any) {
      setError(e.response.data.message);
      toast.error(e.response.data.message);
    }
  };
  return {
    updatePersonalInfoRes,
    updatePersonalInfo,
  };
};
