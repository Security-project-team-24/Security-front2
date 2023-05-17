import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { Page } from '../../../store/page.type';
import { User } from '../../../store/auth-store/model/user.model';

export const useGetEmployees = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    setSuccess,
    state: getEmployeesRes,
  } = useResponseState<Page<User>>({ totalPages: 0, content: [] });

  const getEmployees = async (pageSize: number, pageNumber: number) => {
    try {
      setLoading();
      const res = await axios.get(`/user/employees/${pageSize}/${pageNumber}`);
      setSuccess(res.data);
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };

  return {
    getEmployeesRes,
    getEmployees,
  };
};
