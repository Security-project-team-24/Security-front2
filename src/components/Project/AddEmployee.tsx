import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { User } from '../../store/auth-store/model/user.model';
import { useApplicationStore } from '../../store/application.store';
import { displayToast } from '../../utils/toast.caller';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  ADD_EMPLOYEE_DEFAULT_VALUES,
  ADD_EMPLOYEE_VALIDATION_SCHEMA,
} from '../../utils/project.constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { Project } from '../../api/services/project/types/project.type';
import { toast } from 'react-toastify';
import { useGetAvailableEmployees } from '../../api/services/project/useGetAvailableEmployees';
import { useAddEmployee } from '../../api/services/project/useAddEmployee';
import { useGetProjectEngineers } from '../../api/services/project/useGetProjectEngineers';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  setProject: (project: Project) => void;
}

type Inputs = {
  employeeId: number;
  projectId: number;
  jobDescription: string;
  startDate: Date;
  endDate: Date;
};

const AddEmployee = ({ isOpen, onClose, project, setProject }: Props) => {
  const { getAvailableEmployees, getAvailableEmployeesRes } =
    useGetAvailableEmployees();
  const { getProjectEngineers, getProjectEngineersRes } =
    useGetProjectEngineers();
  const { addEmployee } = useAddEmployee();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Inputs>({
    defaultValues: ADD_EMPLOYEE_DEFAULT_VALUES,
    resolver: yupResolver(ADD_EMPLOYEE_VALIDATION_SCHEMA),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    var calculatedEndDate = new Date(data.startDate);
    calculatedEndDate.setMonth(calculatedEndDate.getMonth() + project.duration);
    if (calculatedEndDate > new Date(data.endDate)) {
      await addEmployee(data);
      onClose();
      setProject({ id: -1, name: '', duration: -1, projectEmployees: [] });
      reset();
      await getProjectEngineers(project.id);
    } else {
      toast.error('Selected time range exceed the duration of the project!');
    }
  };

  useEffect(() => {
    reset();
    setValue('projectId', project.id);
    fetchEmployees();
  }, [project.id]);

  const fetchEmployees = async () => {
    if (project.id != -1) {
      await getAvailableEmployees(project.id);
    }
  };

  const handleEmployeeId = (value: any) => {
    setValue('employeeId', value);
  };

  return (
    <>
      {isOpen && (
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent width='50vw'>
              <ModalHeader textAlign='center'>Add employee</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex flexDirection={'column'}>
                  <FormControl isInvalid={errors.employeeId != undefined}>
                    <FormLabel>Employee</FormLabel>
                    <RadioGroup
                      onChange={handleEmployeeId}
                      display={'flex'}
                      flexDirection={'column'}
                      height={'100px'}
                      overflowY={'auto'}
                      paddingLeft={'10px'}
                    >
                      {getAvailableEmployeesRes.data.map((user) => (
                        <Radio key={user.id} value={user.id.toString()}>
                          {user.name} {user.surname}, {user.role}
                        </Radio>
                      ))}
                    </RadioGroup>
                    {errors.employeeId && (
                      <FormErrorMessage>
                        {errors.employeeId?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={errors.jobDescription != undefined}>
                    <FormLabel>Job description</FormLabel>
                    <Textarea {...register('jobDescription')} mb='10px' />
                    {errors.jobDescription && (
                      <FormErrorMessage>
                        {errors.jobDescription?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={errors.startDate != undefined}>
                    <FormLabel>Start date</FormLabel>
                    <Input type='date' {...register('startDate')} mb='10px' />
                    {errors.startDate && (
                      <FormErrorMessage>
                        {errors.startDate?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={errors.endDate != undefined}>
                    <FormLabel>End date</FormLabel>
                    <Input type='date' {...register('endDate')} mb='10px' />
                    {errors.endDate && (
                      <FormErrorMessage>
                        {errors.endDate?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <Button onClick={handleSubmit(onSubmit)}>Add</Button>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default AddEmployee;
