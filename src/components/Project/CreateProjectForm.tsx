import {
    Button,
    Checkbox,
    Flex,
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
    const createProjectRes = useApplicationStore(
      (state) => state.createProjectRes
    );
    const { register, handleSubmit } = useForm<Inputs>();
    const toast = useToast()  

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
      await createProject(data);
      if (createProjectRes.status == "SUCCESS") {
        displayToast(toast, "Successfully created project", "success")
        onClose()
    }
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
            <Flex gap={10}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '1',
                  gap: '5px',
                }}
              >
                <Input
                  type='text'
                  placeholder='Name'
                  {...register('name')}
                ></Input>
                <Input
                  type='number'
                  min='0'
                  placeholder='Duration'
                  {...register('duration')}
                ></Input>
                <Flex justifyContent='center'>
                  <Button type='submit' margin='15px 0'>
                    Create project
                  </Button>
                </Flex>
              </form>
             </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      </>}
      </>
    );
  };
  