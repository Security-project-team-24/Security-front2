import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useApplicationStore } from '../../store/application.store';
import { CvForm } from '../CvForm/CvForm';
import { SkillForm } from '../SkillForm/SkillForm';
import { useEffect } from 'react';

export const Header = () => {
  const navigate = useNavigate();
  const user = useApplicationStore((state) => state.user);
  const logout = useApplicationStore((state) => state.logout);
  const token = useApplicationStore((state) => state.loginStateRes.data);
  const fetchLoggedUser = useApplicationStore((state) => state.fetchLoggedUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCv,
    onOpen: onOpenCv,
    onClose: onCloseCv,
  } = useDisclosure();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    fetchLoggedUser(token ?? '');
  }, [isOpenCv]);

  return (
    <>
      <Box width='100%' bg={'#3d997c'} p={'10px 25px'}>
        <Flex
          w={'100%'}
          h={'40px'}
          alignItems={'center'}
          justifyContent='space-between'
        >
          <Link to='/'>
            <Text color={'white'} fontWeight='700'>
              Security
            </Text>
          </Link>
          {user != null && (
            <Link to={'/profile'}>
              <Text color={'white'}>
                {user.name} {user.surname}
              </Text>
            </Link>
          )}
          <Flex gap='15px'>
            {user ? (
              <Text color={'white'} cursor={'pointer'} onClick={handleLogout}>
                Logout
              </Text>
            ) : (
              <Flex gap='15px'>
                <Link to='/login' color={'white'}>
                  Login
                </Link>
                <Link to='/register' color={'white'}>
                  Register
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
        {user?.roles?.includes('ADMIN') && (
          <>
            <Button onClick={() => navigate('/admin/projects')} mr='5px'>
              Projects
            </Button>
            <Button onClick={() => navigate('/admin/employees')} mr='5px'>
              Employees
            </Button>
            <Button
              onClick={() => navigate('/admin/pending/employees')}
              mr='5px'
            >
              Pending employees
            </Button>
            <Button onClick={() => navigate('/admin/register-admin')} mr='5px'>
              Register admin
            </Button>
            <Button
              onClick={() => navigate('/administrator/permissions')}
              mr='5px'
            >
              Permissions
            </Button>
          </>
        )}
        {user?.roles?.includes('ENGINEER') && (
          <Flex gap='15px'>
            <Button onClick={onOpen}>Add skill</Button>
            <SkillForm isOpen={isOpen} onClose={onClose} />
            <Button onClick={onOpenCv}>Upload cv</Button>
            <CvForm isOpen={isOpenCv} onClose={onCloseCv} />
            <Button onClick={() => navigate('/engineer/projects')}>
              Projects
            </Button>
            <Button onClick={() => navigate('/engineer/skills')}>
              My skills
            </Button>
            <Button>
              <a href={user.engineer?.cv_url} target='_blank'>
                My cv
              </a>
            </Button>
          </Flex>
        )}
        {user?.roles?.includes('PROJECT_MANAGER') && (
          <Flex gap='15px'>
            <Button onClick={() => navigate('/project-manager/projects')}>
              Projects
            </Button>
          </Flex>
        )}
      </Box>
    </>
  );
};
