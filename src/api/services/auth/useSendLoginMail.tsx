import { useAxios } from '../../useAxios';
import { toast } from 'react-toastify';
import { useResponseState } from '../../useResponseState';

export const useSendLoginMail = () => {
  const { axios } = useAxios();
  const {
    setError,
    setSuccess,
    setLoading,
    state: sendLoginMailRes,
  } = useResponseState<void[]>([]);

  const sendLoginMail = async (email: string) => {
    try {
      setLoading();
      await axios.post(`/auth/send/login/${email}`, {});
      setSuccess();
      toast.success('Check your email for login link!');
    } catch (e: any) {
      setError(e.response.data.message);
      toast.error(e.response.data.message);
    }
  };

  return {
    sendLoginMail,
    sendLoginMailRes,
  };
};
