import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Wrap,
    WrapItem,
    useToast,
  } from '@chakra-ui/react';
  import React, { useEffect, useState } from 'react';
  import { SubmitHandler, useForm } from 'react-hook-form';
  import { useApplicationStore } from '../../store/application.store';
  import { ProjectEmployee } from '../../store/project-store/types/projectEmployee.type';
import { displayToast } from '../../utils/toast.caller';
import { CREATE_PROJECT_DEFAULT_VALUES, CREATE_PROJECT_VALIDATION_SCHEMA } from '../../utils/project.constants';
import { yupResolver } from '@hookform/resolvers/yup';
  
  interface Props {
    isOpen: boolean;
    onClose: () => void;
  }
  
  type Inputs = {
    id: number
    name: string;
    duration: number;
    projectEmployees: ProjectEmployee[]
  };
  
  export const CreateProjectForm = ({ isOpen, onClose }: Props) => {
    const createProject = useApplicationStore(
      (state) => state.createProject
    );
    const { register, handleSubmit, formState: { errors }, reset} = useForm<Inputs>({
      defaultValues: CREATE_PROJECT_DEFAULT_VALUES,
      resolver: yupResolver(CREATE_PROJECT_VALIDATION_SCHEMA),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
      await createProject(data);
      onClose()
    };
  

    return (
      <>
      { isOpen && <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent  width="50vw">
          <ModalHeader textAlign='center'>Create project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection={"column"} gap={10}>
                <FormControl isInvalid={errors.name != null}>
                  <Input
                    type='text'
                    placeholder='Name'
                    {...register('name')}
                  ></Input>
                  {errors.name && (
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.duration != null}>
                  <Input
                    type='number'
                    min='0'
                    placeholder='Duration'
                    {...register('duration')}
                  ></Input>
                  {errors.duration && (
                    <FormErrorMessage>{errors.duration?.message}</FormErrorMessage>
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
      </>}
      </>
    );
  };
  