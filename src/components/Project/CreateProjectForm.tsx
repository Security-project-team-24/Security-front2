import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProjectEmployee } from '../../api/services/project/types/projectEmployee.type';
import {
  CREATE_PROJECT_DEFAULT_VALUES,
  CREATE_PROJECT_VALIDATION_SCHEMA,
} from '../../utils/project.constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateProject } from '../../api/services/project/useCreateProject';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type Inputs = {
  id: number;
  name: string;
  duration: number;
  projectEmployees: ProjectEmployee[];
};

export const CreateProjectForm = ({ isOpen, onClose }: Props) => {
  const { createProject } = useCreateProject();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: CREATE_PROJECT_DEFAULT_VALUES,
    resolver: yupResolver(CREATE_PROJECT_VALIDATION_SCHEMA),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await createProject(data);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent width='50vw'>
              <ModalHeader textAlign='center'>Create project</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex flexDirection={'column'} gap={10}>
                  <FormControl isInvalid={errors.name != null}>
                    <Input
                      type='text'
                      placeholder='Name'
                      {...register('name')}
                    ></Input>
                    {errors.name && (
                      <FormErrorMessage>
                        {errors.name?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={errors.duration != null}>
                    <Input
                      type='number'
                      min='0'
                      placeholder='Duration (months)'
                      {...register('duration')}
                    ></Input>
                    {errors.duration && (
                      <FormErrorMessage>
                        {errors.duration?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <Flex justifyContent='center'>
                    <Button onClick={handleSubmit(onSubmit)} margin='15px 0'>
                      Create project
                    </Button>
                  </Flex>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};
