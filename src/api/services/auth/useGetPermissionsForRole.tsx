import { toast } from 'react-toastify';
import { useAxios } from '../../useAxios';

export const useGetPermissionsForRole = () => {
  const { axios } = useAxios();

  const getPermissionsForRole = async (role: string) => {
    try {
      const resp = await axios.get(`/auth/permissions/${role}`);
      return resp.data;
    } catch (e: any) {
      toast.error("No permission to alter permission settings!")
      console.log(e);
      return {
        granted: [],
        notGranted: []
      }
    }
  };

  return {
    getPermissionsForRole,
  };
};
