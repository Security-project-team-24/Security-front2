import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { ProjectEmployee } from './types/projectEmployee.type';

export const useGetProjectEngineers = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    setSuccess,
    state: getProjectEngineersRes,
  } = useResponseState<ProjectEmployee[]>([]);

  const getProjectEngineers = async (projectId: number) => {
    try {
      setLoading();
      const res = await axios.get(`/project-employee/${projectId}/engineers`);
      setSuccess(res.data);
    } catch (e) {
      setError();
    }
  };

  return {
    getProjectEngineers,
    getProjectEngineersRes,
  };
};
