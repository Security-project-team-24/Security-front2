import { useNavigate, useParams } from 'react-router-dom';
import { Spinner, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useUserActivation } from '../../api/services/user/useUserActivation';

export const ActivateRedirectPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { userActivation } = useUserActivation();
  useEffect(() => {
    handleUserActivation();
    navigate('/');
  }, []);
  const handleUserActivation = async () => {
    if (token === undefined) return;
    await userActivation(token);
  };
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      h={'calc(100vh - 95px)'}
    >
      <Spinner boxSize={36} thickness='10px' color={'#3d997c'} />
    </Flex>
  );
};
