import { useEffect, useRef, useState } from 'react';
import { useApplicationStore } from '../../store/application.store';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { DefaultValues, SubmitHandler, useForm } from 'react-hook-form';
import {
  REGISTER_USER_DEFAULT_VALUES,
  REGISTER_VALIDATION_SCHEMA,
} from '../../utils/auth.constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useRegisterUser } from '../../api/services/auth/useRegisterUser';

export enum Role {
  ENGINEER = 'ENGINEER',
  PROJECT_MANAGER = 'PROJECT_MANAGER',
  HR_MANAGER = 'HR_MANAGER',
}

export enum Seniority {
  JUNIOR = 'JUNIOR',
  MEDIOR = 'MEDIOR',
  SENIOR = 'SENIOR',
}

type Inputs = {
  name: string;
  surname: string;
  email: string;
  address: {
    street: string;
    streetNumber: string;
    city: string;
    zipCode: string;
    country: string;
  };
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export const RegisterUserPage = () => {
  const { registerUser } = useRegisterUser();
  const [role, setRole] = useState<string>(Role.ENGINEER);
  const [seniority, setSeniority] = useState<string>(Seniority.JUNIOR);

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(REGISTER_VALIDATION_SCHEMA),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    await registerUser({ ...data, roles: [role], seniority });
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset(REGISTER_USER_DEFAULT_VALUES);
    }
  }, [formState, reset]);

  return (
    <Flex justifyContent='center'>
      <Flex width='30%' gap='15px' direction='column' padding='30px 0'>
        <FormControl isInvalid={errors.name != null}>
          <FormLabel>Name</FormLabel>
          <Input {...register('name', { required: true })} />
          {errors.name && (
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.surname != null}>
          <FormLabel>Surname</FormLabel>
          <Input {...register('surname', { required: true })} />
          {errors.surname && (
            <FormErrorMessage>{errors.surname?.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.email != null}>
          <FormLabel>Email</FormLabel>
          <Input {...register('email', { required: true })} />
          {errors.email && (
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.address?.street != null}>
          <FormLabel>Street</FormLabel>
          <Input {...register('address.street', { required: true })} />
          {errors.address?.street && (
            <FormErrorMessage>
              {errors.address?.street?.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.address?.streetNumber != null}>
          <FormLabel>Street number</FormLabel>
          <Input {...register('address.streetNumber', { required: true })} />
          {errors.address?.streetNumber && (
            <FormErrorMessage>
              {errors.address?.streetNumber?.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.address?.city != null}>
          <FormLabel>City</FormLabel>
          <Input {...register('address.city', { required: true })} />
          {errors.address?.city && (
            <FormErrorMessage>{errors.address?.city?.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.address?.zipCode != null}>
          <FormLabel>Zip code</FormLabel>
          <Input {...register('address.zipCode', { required: true })} />
          {errors.address?.zipCode && (
            <FormErrorMessage>
              {errors.address?.zipCode?.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.address?.country != null}>
          <FormLabel>Country</FormLabel>
          <Input {...register('address.country', { required: true })} />
          {errors.address?.country && (
            <FormErrorMessage>
              {errors.address?.country?.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.phoneNumber != null}>
          <FormLabel>Phone number</FormLabel>
          <Input {...register('phoneNumber', { required: true })} />
          {errors.phoneNumber && (
            <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl>
          <RadioGroup onChange={setRole} value={role}>
            <Stack direction='row'>
              <Radio value={Role.ENGINEER}>ENGINEER</Radio>
              <Radio value={Role.PROJECT_MANAGER}>PROJECT MANAGER</Radio>
              <Radio value={Role.HR_MANAGER}>HR MANAGER</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        {role === 'ENGINEER' && (
          <FormControl>
            <RadioGroup onChange={setSeniority} value={seniority}>
              <Stack direction='row'>
                <Radio value={Seniority.JUNIOR}>Junior</Radio>
                <Radio value={Seniority.MEDIOR}>Medior</Radio>
                <Radio value={Seniority.SENIOR}>Senior</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        )}

        <FormControl isInvalid={errors.password != null}>
          <FormLabel>Password</FormLabel>
          <Input
            type={'password'}
            {...register('password', { required: true })}
          />
          {errors.password && (
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.confirmPassword != null}>
          <FormLabel>Confirm password</FormLabel>
          <Input
            type={'password'}
            {...register('confirmPassword', { required: true })}
          />
          {errors.confirmPassword && (
            <FormErrorMessage>
              {errors.confirmPassword?.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <Button onClick={handleSubmit(onSubmit)}>Register</Button>
      </Flex>
    </Flex>
  );
};
