import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Flex } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useApplicationStore } from '../../store/application.store';
import { useUploadCv } from '../../api/services/user/useUploadCv';
import { Textarea } from '@chakra-ui/textarea';
import { useUpdateJobDescription } from '../../api/services/project/useUpdateJobDescription';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  jobDescription: string;
  projectId: number;
}

type Inputs = {
  cv: File;
};

export const JobDescriptionForm = ({
  isOpen,
  onClose,
  jobDescription,
  projectId,
}: Props) => {
  const { uploadCv } = useUploadCv();
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<Inputs>();
  const [updatedDescription, setUpdatedDescription] =
    useState<string>(jobDescription);
  const { updateJobDescriptionRes, updateJobDescription } =
    useUpdateJobDescription();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await updateJobDescription({
      description: updatedDescription,
      projectId: projectId,
    });
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      onClose();
    }
  }, [formState, onClose]);

  return (
    <Box>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update job description</ModalHeader>
            <ModalCloseButton onClick={onClose} />
            <ModalBody>
              <Flex padding={'15px'} gap={'15px'}>
                <Textarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                ></Textarea>
              </Flex>

              <Button onClick={handleSubmit(onSubmit)} width={'100%'}>
                Update
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};
