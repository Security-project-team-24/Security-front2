import { toast } from 'react-toastify';
import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';

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

  const uploadCv = async (cv: FileList) => {
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
    } catch (e: any) {
      setError(e.response.data.message);
      toast.error(e.response.data.message);
    }
  };

  return {
    uploadCvRes,
    uploadCv,
  };
};
