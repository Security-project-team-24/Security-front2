import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { Skill } from './types/skill';
import { toast } from 'react-toastify';

export const useDeleteSkill = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    setSuccess,
    state: deleteSkillRes,
  } = useResponseState<any>(null);

  const deleteSkill = async (skill: Skill) => {
    try {
      setLoading();
      const res = await axios.delete(`/user/engineer/skill/${skill.id}`);
      setSuccess(res.data);
      toast.success('Skill successfully deleted!');
    } catch (e: any) {
      setError(e.response.data.message);
      toast.error(e.response.data.message);
    }
  };

  return {
    deleteSkillRes,
    deleteSkill,
  };
};
