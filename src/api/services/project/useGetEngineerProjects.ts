import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { ProjectEmployee } from './types/projectEmployee.type';

export const useGetEngineerProjects = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    setSuccess,
    state: getEngineerProjectsRes,
  } = useResponseState<ProjectEmployee[]>([]);

  const getEngineerProjects = async () => {
    try {
      setLoading();
      const res = await axios.get(`/project-employee/projects`);
      setSuccess(res.data);
    } catch (e) {
      setError();
    }
  };

  return {
    getEngineerProjectsRes,
    getEngineerProjects,
  };
};
