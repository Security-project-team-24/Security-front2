import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { User } from '../../../store/auth-store/model/user.model';

export const useGetAvailableEmployees = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    setSuccess,
    state: getAvailableEmployeesRes,
  } = useResponseState<User[]>([]);

  const getAvailableEmployees = async (projectId: number) => {
    try {
      setLoading();
      const res = await axios.get(`/project-employee/available/${projectId}`);
      setSuccess(res.data);
    } catch (e) {
      setError();
    }
  };

  return {
    getAvailableEmployeesRes,
    getAvailableEmployees,
  };
};
