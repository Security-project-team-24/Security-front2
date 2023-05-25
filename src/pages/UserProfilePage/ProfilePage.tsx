import { useState } from 'react';
import { useApplicationStore } from '../../store/application.store';
import { Box, Button, Flex, Input } from '@chakra-ui/react';
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

  return (
    <Flex justifyContent='center'>
      <Flex width='30%' gap='15px' direction='column' padding='30px 0'>
        <Flex justifyContent={'center'} justifyItems={'center'}>
          Personal information
        </Flex>
        <Input
          defaultValue={defaultValues?.name}
          disabled={!isUpdate}
          placeholder='name'
          {...register('name', { required: true })}
        />
        <Input
          defaultValue={defaultValues?.surname}
          disabled={!isUpdate}
          placeholder='surname'
          {...register('surname', { required: true })}
        />
        <Input
          defaultValue={defaultValues?.email}
          disabled={true}
          placeholder='email'
          {...register('email', { required: true })}
        />
        <Input
          defaultValue={defaultValues?.address.street}
          disabled={!isUpdate}
          placeholder='street'
          {...register('address.street', { required: true })}
        />
        <Input
          defaultValue={defaultValues?.address.streetNumber}
          disabled={!isUpdate}
          placeholder='street number'
          {...register('address.streetNumber', { required: true })}
        />
        <Input
          defaultValue={defaultValues?.address.city}
          disabled={!isUpdate}
          placeholder='city'
          {...register('address.city', { required: true })}
        />
        <Input
          defaultValue={defaultValues?.address.zipCode}
          disabled={!isUpdate}
          placeholder='zip code'
          {...register('address.zipCode', { required: true })}
        />
        <Input
          defaultValue={defaultValues?.address.country}
          disabled={!isUpdate}
          placeholder='country'
          {...register('address.country', { required: true })}
        />
        <Input
          defaultValue={defaultValues?.phoneNumber}
          disabled={!isUpdate}
          placeholder='phone number'
          {...register('phoneNumber', { required: true })}
        />
        {isUpdate ? (
          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        ) : (
          <Button onClick={() => setIsUpdate(true)}>Update</Button>
        )}
        {user?.roles.includes('ADMIN') && (
          <Button onClick={() => navigate('/admin/change-password')}>
            Change password
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
