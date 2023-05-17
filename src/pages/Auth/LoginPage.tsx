import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  LOGIN_DEFAULT_VALUES,
  LOGIN_VALIDATION_SCHEMA,
} from '../../utils/auth.constants';
import { useApplicationStore } from '../../store/application.store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSendLoginMail } from '../../api/services/auth/useSendLoginMail';

export type FormValues = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const login = useApplicationStore((state) => state.login);
  const loginStateRes = useApplicationStore((state) => state.loginStateRes);
  const user = useApplicationStore((state) => state.user);
  const { sendLoginMail, sendLoginMailRes } = useSendLoginMail();
  const navigate = useNavigate();
  const [canNavigate, setCanNavigate] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    defaultValues: LOGIN_DEFAULT_VALUES,
    resolver: yupResolver(LOGIN_VALIDATION_SCHEMA),
  });

  useEffect(() => {
    if (loginStateRes.status == 'SUCCESS' && canNavigate) {
      if (user?.role == 'ADMIN') navigate('/admin/projects');
      else navigate('/');

    }
  }, [loginStateRes]);

  useEffect(() => {
    if (sendLoginMailRes.status == 'SUCCESS' && canNavigate) {
      navigate('/');
    }
  }, [sendLoginMailRes]);

  const handleOnSubmit = async (values: FormValues) => {
    setCanNavigate(true);
    await login(values);
  };
  const handleOnMailLogin = async () => {
    setCanNavigate(true);
    await sendLoginMail(getValues("email"));
  };

  return (
    <Flex alignItems="center" justifyContent="center" height="80vh">
      <Box width="30%" boxShadow={"md"} padding={"30px"}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          Login
        </Flex>
        <FormControl isInvalid={errors.email != null} h={"100px"} mb={"2"}>
          <FormLabel>Email</FormLabel>
          <Input type="email" {...register("email")} />
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.password != null} h={"100px"}>
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register("password")} />
          {errors.password && (
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          )}
        </FormControl>
        <Button
          onClick={handleSubmit(handleOnSubmit)}
          mt={'4'}
          fontWeight={'bold'}
          bg={'#003b95'}
          _hover={{
            bg: '#136ed1',
          }}
          w='100%'
          mx={'auto'}
          color={'white'}
        >
          Login
        </Button>
        <Button
          onClick={() => handleOnMailLogin()}
          mt={'4'}
          fontWeight={'bold'}
          bg={'#003b95'}
          _hover={{
            bg: '#136ed1',
          }}
          w='100%'
          mx={'auto'}
          color={'white'}
        >
          Login with mail
        </Button>
      </Box>
    </Flex>
  );
};
