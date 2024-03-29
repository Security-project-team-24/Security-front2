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
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ADD_SKILL_VALIDATION_SCHEMA } from '../../utils/user.constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useApplicationStore } from '../../store/application.store';
import { useAddSkill } from '../../api/services/user/useAddSkill';
import { useGetEngineerSkills } from '../../api/services/user/useGetEngineerSkills';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type Inputs = {
  skills: string;
  strength: number;
};

export const SkillForm = ({ isOpen, onClose }: Props) => {
  const user = useApplicationStore((state) => state.user);
  const { addSkill } = useAddSkill();
  const { skillsRes, getEngineerSkills } = useGetEngineerSkills();
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(ADD_SKILL_VALIDATION_SCHEMA),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await addSkill(data);
    await getEngineerSkills(user?.engineer?.id ?? -1);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        skills: '',
        strength: 1,
      });
    }
  }, [formState, reset]);

  return (
    <Box>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add skill</ModalHeader>
            <ModalCloseButton onClick={onClose} />
            <ModalBody>
              <Flex padding={'15px'} gap={'15px'}>
                <Input
                  {...register('skills', { required: true })}
                  type='text'
                  width={'80%'}
                  placeholder={'Skill'}
                ></Input>
                <Input
                  {...register('strength', { required: true })}
                  type='number'
                  max={5}
                  min={1}
                  width={'20%'}
                  placeholder={'Strength'}
                ></Input>
              </Flex>
              <Flex direction={'column'} color={'red'}>
                <span>{errors.skills?.message}</span>
                <span>{errors.strength?.message}</span>
              </Flex>

              <Button onClick={handleSubmit(onSubmit)} width={'100%'}>
                Save
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};
