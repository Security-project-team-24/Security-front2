import { Engineer } from '../../../store/auth-store/model/engineer.model';
import { Page } from '../../../store/page.type';
import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { Skill } from './types/skill';
import { toast } from 'react-toastify';

export const useGetEngineers = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    setSuccess,
    state: engineersRes,
  } = useResponseState<Page<Engineer>>({ totalPages: 0, content: [] });

  const getEngineers = async (
    pageNumber: number,
    email: string,
    name: string,
    surname: string,
    fromDate: String,
    toDate: String
  ) => {
    try {
      setLoading();
      const res = await axios.get(
        `/user/engineers?pageNumber=${pageNumber}&email=${email}&name=${name}&surname=${surname}&fromDate=${fromDate}&toDate=${toDate}`
      );
      console.log(res.data);
      setSuccess(res.data);
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };

  return {
    engineersRes,
    getEngineers,
  };
};
