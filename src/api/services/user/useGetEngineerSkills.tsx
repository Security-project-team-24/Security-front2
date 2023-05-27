import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { Skill } from './types/skill';
import { toast } from 'react-toastify';

export const useGetEngineerSkills = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    setSuccess,
    state: skillsRes,
  } = useResponseState<any>(null);

  const getEngineerSkills = async (engineerId: number) => {
    try {
      setLoading();
      const res = await axios.get(`/user/${engineerId}/skills`);
      setSuccess(res.data);
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };

  return {
    skillsRes,
    getEngineerSkills,
  };
};
