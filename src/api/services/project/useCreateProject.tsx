import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { Project } from './types/project.type';
import { toast } from 'react-toastify';

export const useCreateProject = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    setSuccess,
    state: createProjectRes,
  } = useResponseState<null>(null);
  const createProject = async (project: Project) => {
    try {
      setLoading();
      await axios.post(`/project`, project);
      setSuccess();
      toast.success('Successfully created project');
    } catch (e: any) {
      setError(e.response.data.message);
      toast.error(e.response.data.message);
    }
  };

  return {
    createProjectRes,
    createProject,
  };
};
