import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { Skill } from '../user/types/skill';
import { toast } from 'react-toastify';
import { UpdateJobDescriptionType } from './types/updateJobDescription';

export const useUpdateJobDescription = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    setSuccess,
    state: updateJobDescriptionRes,
  } = useResponseState<any>(null);

  const updateJobDescription = async (
    description: UpdateJobDescriptionType
  ) => {
    try {
      setLoading();
      const res = await axios.patch(
        `/project-employee/description/update`,
        description
      );
      setSuccess(res.data);
      toast.success('Job description successfully changed!');
    } catch (e: any) {
      setError(e.response.data.message);
      toast.error(e.response.data.message);
    }
  };

  return {
    updateJobDescriptionRes,
    updateJobDescription,
  };
};
