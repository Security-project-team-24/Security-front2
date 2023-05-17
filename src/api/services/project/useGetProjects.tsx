import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { Page } from '../../../store/page.type';
import { Project } from './types/project.type';

export const useGetProjects = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    setSuccess,
    state: getProjectsRes,
  } = useResponseState<Page<Project>>({ totalPages: 0, content: [] });

  const getProjects = async (pageSize: number, pageNumber: number) => {
    try {
      setLoading();
      const res = await axios.get(`/project/${pageSize}/${pageNumber}`);
      setSuccess(res.data);
    } catch (e) {
      setError();
    }
  };

  return {
    getProjects,
    getProjectsRes,
  };
};
