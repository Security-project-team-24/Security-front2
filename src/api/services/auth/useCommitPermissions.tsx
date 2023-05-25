import { Permission } from '../../../store/auth-store/model/permission.model';
import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';

export const useCommitPermissions = () => {
  const { axios } = useAxios();
  const {
    setLoading,
    setSuccess,
    setErrorWithToast,
    state: commitPermissionsState,
  } = useResponseState<void[]>([]);

  const commitPermissions = async (role: string, permissions: Permission[]) => {
    try {
      setLoading();
      await axios.post(`/auth/permissions/${role}/commit`, permissions);
      setSuccess();
    } catch (e: any) {
      setErrorWithToast(e.response.data.message);
      console.log(e);
    }
  };

  return {
    commitPermissions,
    commitPermissionsState,
  };
};
