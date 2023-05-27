import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { Skill } from './types/skill';
import { toast } from 'react-toastify';

export const useUpdateSkill = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    setSuccess,
    state: updateSkillRes,
  } = useResponseState<any>(null);

  const updateSkill = async (skill: Skill) => {
    try {
      setLoading();
      const res = await axios.patch(`/user/skill`, {
        id: skill.id,
        skill: skill.skill,
        strength: skill.strength,
      });
      setSuccess(res.data);
      toast.success('Skill successfully updated!');
    } catch (e: any) {
      setError(e.response.data.message);
      toast.error(e.response.data.message);
    }
  };

  return {
    updateSkillRes,
    updateSkill,
  };
};
