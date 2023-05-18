import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { ProjectEmployee } from './types/projectEmployee.type';

export const useGetProjectManagerProjects = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    setSuccess,
    state: getProjectManagerProjectsRes,
  } = useResponseState<ProjectEmployee[]>([]);

  const getProjectManagerProjects = async () => {
    try {
      setLoading();
      const res = await axios.get(`/project-employee/projects/manager`);
      setSuccess(res.data);
    } catch (e) {
      setError();
    }
  };

  return {
    getProjectManagerProjectsRes,
    getProjectManagerProjects,
  };
};
