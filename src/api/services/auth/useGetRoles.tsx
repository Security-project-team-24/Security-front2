import { useAxios } from '../../useAxios';

export const useGetRoles = () => {
  const { axios } = useAxios();

  const getRoles = async () => {
    try {
      const resp = await axios.get('/auth/roles');
      return resp.data;
    } catch (e: any) {
      console.log(e);
      return [];
    }
  };

  return {
    getRoles,
  };
};
