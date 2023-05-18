import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { ProjectEmployeeRequest } from './types/project.employee.request.type';
import { toast } from 'react-toastify';

export const useRemmoveEmployee = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    setSuccess,
    state: removeEmployeeRes,
  } = useResponseState<any>(null);

  const removeEmployee = async (projectId: number, employeeId: number) => {
    try {
      setLoading();
      const res = await axios.delete(`/project-employee`, {
        data: {
          projectId: projectId,
          employeeId: employeeId,
        },
      });
      setSuccess(res.data);
      toast.success('Successfully removed employee');
    } catch (e: any) {
      setError(e.response.data.message);
      toast.error(e.response.data.message);
    }
  };

  return {
    removeEmployeeRes,
    removeEmployee,
  };
};
