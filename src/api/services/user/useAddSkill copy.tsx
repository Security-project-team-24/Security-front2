import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { Skill } from './types/skill';
import { toast } from 'react-toastify';

export const useAddSkill = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    setSuccess,
    state: addSkillRes,
  } = useResponseState<any>(null);

  const addSkill = async ({ skills, strength }: Skill) => {
    try {
      setLoading();
      const res = await axios.post(`/user/skill`, {
        skills: [
          {
            skill: skills,
            strength: strength,
          },
        ],
      });
      setSuccess(res.data);
      toast.success('Skill successfully added!');
    } catch (e: any) {
      setError(e.response.data.message);
      toast.error(e.response.data.message);
    }
  };

  return {
    addSkillRes,
    addSkill,
  };
};
