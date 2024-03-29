import { toast } from 'react-toastify';
import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { ResponseState } from '../../../store/response-state.type';

export const useUploadCv = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    setSuccess,
    state: uploadCvRes,
  } = useResponseState<any>(null);

  const fileListToFormData = (cv: FileList) => {
    const formData = new FormData();
    Array.from(cv).forEach((cv) => {
      formData.append('file', cv);
    });
    return formData;
  };

  const uploadCv = async (cv: FileList): Promise<ResponseState<null>> => {
    try {
      setLoading();
      const data = fileListToFormData(cv);
      const res = await axios.post(`/user/cv/upload`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(res.data);
      toast.success('CV successfully uploaded!');
      return {
        data: null,
        error: null,
        status: 'SUCCESS',
      };
    } catch (e: any) {
      setError(e.response.data.message);
      toast.error(e.response.data.message);
      return {
        data: null,
        error: e.response.data.message,
        status: 'ERROR',
      };
    }
  };

  return {
    uploadCvRes,
    uploadCv,
  };
};
