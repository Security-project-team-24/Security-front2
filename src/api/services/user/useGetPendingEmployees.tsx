import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { Page } from '../../../store/page.type';
import { User } from '../../../store/auth-store/model/user.model';

export const useGetPendingEmployees = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    setSuccess,
    state: getPendingEmployeesRes,
  } = useResponseState<Page<User>>({ totalPages: 0, content: [] });

  const getPendingEmployees = async (pageSize: number, pageNumber: number) => {
    try {
      setLoading();
      const res = await axios.get(`/user/pending/${pageSize}/${pageNumber}`);
      setSuccess(res.data);
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };

  return {
    getPendingEmployeesRes,
    getPendingEmployees,
  };
};
