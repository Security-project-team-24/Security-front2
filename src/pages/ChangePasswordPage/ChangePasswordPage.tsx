import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useApplicationStore } from '../../store/application.store';
import { useState } from 'react';
import {
  CHANGE_PASSWORD_DEFAULT_VALUES,
  CHANGE_PASSWORD_VALIDATION_SCHEMA,
} from '../../utils/user.constants';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useChangePassword } from '../../api/services/user/useChangePassword';

export type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const ChangePasswordPage = () => {
  const { changePassword } = useChangePassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: CHANGE_PASSWORD_DEFAULT_VALUES,
    resolver: yupResolver(CHANGE_PASSWORD_VALIDATION_SCHEMA),
  });

  const handleOnSubmit = async (values: FormValues) => {
    await changePassword(values);
  };

  const [showPasswords, setShowPasswords] = useState([false, false, false]);

  const handlePasswordVisibility = (index: number) => {
    const updatedPasswords = [...showPasswords];
    updatedPasswords[index] = !showPasswords[index];
    setShowPasswords(updatedPasswords);
  };

  return (
    <Flex alignItems='center' justifyContent='center' height='80vh'>
      <Box width='30%' boxShadow={'md'} padding={'30px'}>
        <Flex alignItems={'center'} justifyContent={'center'}>
          Change password
        </Flex>
        <FormControl
          isInvalid={errors.newPassword != null}
          h={'100px'}
          mb={'2'}
        >
          <FormLabel>New password</FormLabel>
          <InputGroup>
            <Input
              {...register('newPassword')}
              pr='4.5rem'
              type={showPasswords[0] ? 'text' : 'password'}
            />
            <InputRightElement>
              <IconButton
                h='1.75rem'
                size='sm'
                onClick={() => handlePasswordVisibility(0)}
                icon={showPasswords[0] ? <HiEyeOff /> : <HiEye />}
                aria-label={''}
              />
            </InputRightElement>
          </InputGroup>
          {errors.newPassword && (
            <FormErrorMessage>{errors.newPassword.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.confirmPassword != null} h={'100px'}>
          <FormLabel>Confirm password</FormLabel>
          <InputGroup>
            <Input
              {...register('confirmPassword')}
              pr='4.5rem'
              type={showPasswords[1] ? 'text' : 'password'}
            />
            <InputRightElement>
              <IconButton
                h='1.75rem'
                size='sm'
                onClick={() => handlePasswordVisibility(1)}
                icon={showPasswords[1] ? <HiEyeOff /> : <HiEye />}
                aria-label={''}
              />
            </InputRightElement>
          </InputGroup>
          {errors.confirmPassword && (
            <FormErrorMessage>
              {errors.confirmPassword?.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.oldPassword != null} h={'100px'}>
          <FormLabel>Old password</FormLabel>
          <InputGroup>
            <Input
              {...register('oldPassword')}
              pr='4.5rem'
              type={showPasswords[2] ? 'text' : 'password'}
            />
            <InputRightElement>
              <IconButton
                h='1.75rem'
                size='sm'
                onClick={() => handlePasswordVisibility(2)}
                icon={showPasswords[2] ? <HiEyeOff /> : <HiEye />}
                aria-label={''}
              />
            </InputRightElement>
          </InputGroup>
          {errors.oldPassword && (
            <FormErrorMessage>{errors.oldPassword?.message}</FormErrorMessage>
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
          Change password
        </Button>
      </Box>
    </Flex>
  );
};
