import { useEffect, useState } from 'react';
import { useApplicationStore } from '../../store/application.store';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { DefaultValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUpdatePersonalInfo } from '../../api/services/user/useUpdatePersonalInfo';

type Inputs = {
  id: number;
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
  role: string;
  phoneNumber: string;
};

export const ProfilePage = () => {
  const user = useApplicationStore((state) => state.user);
  const { updatePersonalInfo } = useUpdatePersonalInfo();
  const fetchLoggedUser = useApplicationStore((state) => state.fetchLoggedUser);
  const token = useApplicationStore((state) => state.loginStateRes.data);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const defaultValues: Inputs = {
    id: user?.id ?? -1,
    name: user?.name ?? '',
    surname: user?.surname ?? '',
    email: user?.email ?? '',
    role: user?.roles[0] ?? '',
    address: {
      street: user?.address.street ?? '',
      streetNumber: user?.address.streetNumber ?? '',
      city: user?.address.city ?? '',
      zipCode: user?.address.zipCode ?? '',
      country: user?.address.country ?? '',
    },
    phoneNumber: user?.phoneNumber ?? '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await updatePersonalInfo({ ...data, roles: [data.role] });
    await fetchLoggedUser(token ?? '');
    setIsUpdate(false);
  };
  const navigate = useNavigate();

  const calculateSeniority = (): string => {
    if (user?.roles.includes('ENGINEER')) {
      if (new Date(Date.now()) >= addYears(3)) return 'SENIOR';
      else if (new Date(Date.now()) >= addYears(2)) return 'MEDIOR';
      return 'JUNIOR';
    }
    return '';
  };

  const addYears = (year: number) => {
    const seniorityDate = new Date(user?.engineer?.seniority ?? '');
    const currentYear = seniorityDate.getFullYear();
    seniorityDate.setFullYear(currentYear + year);
    return seniorityDate;
  };

  return (
    <Flex justifyContent='center'>
      <Flex width='30%' gap='15px' direction='column' padding='30px 0'>
        <Flex justifyContent={'center'} justifyItems={'center'}>
          Personal information
        </Flex>
        <FormControl>
          <FormLabel mb={'0'}>Name</FormLabel>
          <Input
            defaultValue={defaultValues?.name}
            disabled={!isUpdate}
            {...register('name', { required: true })}
          />
        </FormControl>
        <FormControl>
          <FormLabel mb={'0'}>Surname</FormLabel>
          <Input
            defaultValue={defaultValues?.surname}
            disabled={!isUpdate}
            {...register('surname', { required: true })}
          />
        </FormControl>
        <FormControl>
          <FormLabel mb={'0'}>Email</FormLabel>
          <Input
            defaultValue={defaultValues?.email}
            disabled={true}
            {...register('email', { required: true })}
          />
        </FormControl>
        <FormControl>
          <FormLabel mb={'0'}>Street</FormLabel>
          <Input
            defaultValue={defaultValues?.address.street}
            disabled={!isUpdate}
            {...register('address.street', { required: true })}
          />
        </FormControl>
        <FormControl>
          <FormLabel mb={'0'}>Street number</FormLabel>
          <Input
            defaultValue={defaultValues?.address.streetNumber}
            disabled={!isUpdate}
            {...register('address.streetNumber', { required: true })}
          />
        </FormControl>
        <FormControl>
          <FormLabel mb={'0'}>City</FormLabel>
          <Input
            defaultValue={defaultValues?.address.city}
            disabled={!isUpdate}
            {...register('address.city', { required: true })}
          />
        </FormControl>
        <FormControl>
          <FormLabel mb={'0'}>Zip code</FormLabel>
          <Input
            defaultValue={defaultValues?.address.zipCode}
            disabled={!isUpdate}
            {...register('address.zipCode', { required: true })}
          />
        </FormControl>
        <FormControl>
          <FormLabel mb={'0'}>Country</FormLabel>
          <Input
            defaultValue={defaultValues?.address.country}
            disabled={!isUpdate}
            {...register('address.country', { required: true })}
          />
        </FormControl>
        <FormControl>
          <FormLabel mb={'0'}>Phone number</FormLabel>
          <Input
            defaultValue={defaultValues?.phoneNumber}
            disabled={!isUpdate}
            {...register('phoneNumber', { required: true })}
          />
        </FormControl>
        {user?.roles.includes('ENGINEER') && (
          <FormControl>
            <FormLabel>Seniority</FormLabel>
            <Input disabled={true} defaultValue={calculateSeniority()} />
          </FormControl>
        )}
        {isUpdate ? (
          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        ) : (
          <Button onClick={() => setIsUpdate(true)}>Update</Button>
        )}

        <Button onClick={() => navigate('/change-password')}>
          Change password
        </Button>
      </Flex>
    </Flex>
  );
};
