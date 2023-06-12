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
import { useGetEngineerSkills } from '../../api/services/user/useGetEngineerSkills';
import { ResponseState } from '../../store/response-state.type';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type Inputs = {
  cv: File;
};

export const CvForm = ({ isOpen, onClose }: Props) => {
  const { uploadCv } = useUploadCv();
  const { handleSubmit, formState } = useForm<Inputs>();
  const [cvFile, setCvFile] = useState<FileList | null>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await uploadCv(cvFile ?? new FileList()).then(
      (response: ResponseState<null>) => {
        onClose();
      }
    );
  };

  return (
    <Box>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Upload cv</ModalHeader>
            <ModalCloseButton onClick={onClose} />
            <ModalBody>
              <Flex padding={'15px'} gap={'15px'}>
                <Input
                  onChange={(e) => setCvFile(e.target.files)}
                  type='file'
                  width={'80%'}
                ></Input>
              </Flex>

              <Button onClick={handleSubmit(onSubmit)} width={'100%'}>
                Upload cv
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};
