import { useAxios } from '../../useAxios';
import { toast } from 'react-toastify';
import { Register } from '../../../store/auth-store/types/register.type';
import { useResponseState } from '../../useResponseState';

export const useRegisterUser = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    setSuccess,
    state: registerUserRes,
  } = useResponseState<void[]>([]);

  const registerUser = async (body: Register) => {
    try {
      setLoading();
      await axios.post(`/auth/register`, body);
      setSuccess();
      toast.success('Successfully registered!');
    } catch (e: any) {
      setError(e.response.data.message);
      toast.error(e.response.data.message);
    }
  };

  return {
    registerUserRes,
    registerUser,
  };
};
