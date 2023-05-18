import { useAxios } from '../../useAxios';
import { toast } from 'react-toastify';

export const useUserActivation = () => {
  const { axios } = useAxios();

  const userActivation = async (token: string) => {
    try {
      await axios.patch(`/user/activate/${token}`, {});
      toast.success('Your account is activated!');
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  return {
    userActivation,
  };
};
