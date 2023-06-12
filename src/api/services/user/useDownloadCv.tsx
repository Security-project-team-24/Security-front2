import { toast } from 'react-toastify';
import { useAxios } from '../../useAxios';
import { useResponseState } from '../../useResponseState';
import { ResponseState } from '../../../store/response-state.type';
import { saveAs } from 'file-saver';

export const useDownloadCv = () => {
  const { axios } = useAxios();
  const {
    setError,
    setLoading,
    state: downloadCvRes,
  } = useResponseState<any>(null);

  const downloadCv = async (): Promise<ResponseState<null>> => {
    try {
      setLoading();
      await axios
        .get(`/user/cv/download`, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          const blob = new Blob([response.data], { type: 'application/xml' });
          saveAs(blob, 'cv.xml');
        });

      toast.success('CV successfully downloaded!');
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
    downloadCvRes,
    downloadCv,
  };
};
