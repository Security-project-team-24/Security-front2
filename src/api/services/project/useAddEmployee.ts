import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { ProjectEmployeeRequest } from './types/project.employee.request.type';
import { toast } from 'react-toastify';

export const useAddEmployee = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    setSuccess,
    state: addEmployeeRes,
  } = useResponseState<any>(null);

  const addEmployee = async (data: ProjectEmployeeRequest) => {
    try {
      setLoading();
      const res = await axios.post(`/project-employee`, data);
      setSuccess(res.data);
      toast.success('Successfully added employee');
    } catch (e: any) {
      setError(e.response.data.message);
      toast.error(e.response.data.message);
    }
  };

  return {
    addEmployeeRes,
    addEmployee,
  };
};
