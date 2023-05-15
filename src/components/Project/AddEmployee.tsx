import { Box, Button, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Radio, RadioGroup, Text, Textarea, VStack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { User } from "../../store/auth-store/model/user.model";
import { useApplicationStore } from "../../store/application.store";
import { displayToast } from "../../utils/toast.caller";
import { SubmitHandler, useForm } from "react-hook-form";
import { ADD_EMPLOYEE_DEFAULT_VALUES, ADD_EMPLOYEE_VALIDATION_SCHEMA } from "../../utils/project.constants";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    projectId: number
    setProjectId: (id: number) => void
  }

  
type Inputs = {
  employeeId: number
  projectId: number;
  jobDescription: string;
  startDate: Date
  endDate: Date
};


const AddEmployee = ({isOpen, onClose, projectId, setProjectId}: Props) => {
  const getAvailableEmployees = useApplicationStore((state) => state.getAvailableEmployees)
  const getAvailableEmployeesRes = useApplicationStore((state) => state.getAvailableEmployeesRes)

  const { register, handleSubmit, formState: { errors }, reset, setValue} = useForm<Inputs>({
    defaultValues: ADD_EMPLOYEE_DEFAULT_VALUES,
    resolver: yupResolver(ADD_EMPLOYEE_VALIDATION_SCHEMA),
  });

  const addEmployee = useApplicationStore((state) => state.addEmployee)
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await addEmployee(data)
        onClose()
        setProjectId(-1)
        reset()
    };

    useEffect(() => {
        reset()
        setValue("projectId", projectId)
        fetchEmployees()
    }, [projectId])
    
    const fetchEmployees = async () => {
        if (projectId != -1) {
            await getAvailableEmployees(projectId);
        }
    };

    const handleEmployeeId = (value: any) => {
      setValue("employeeId", value)
    }

  return (
    <>
    { isOpen && <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay/>
          <ModalContent  width="50vw">
            <ModalHeader textAlign='center'>Add employee</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Flex flexDirection={"column"}>
                  <FormControl isInvalid={errors.employeeId != undefined}>
                    <FormLabel>Employee</FormLabel>
                    <RadioGroup onChange={handleEmployeeId} display={'flex'} flexDirection={'column'} height={'100px'} overflowY={'auto'} paddingLeft={'10px'}>
                        {getAvailableEmployeesRes.data.map((user) => (
                          <Radio key={user.id} value={user.id.toString()}>
                            {user.name} {user.surname}
                          </Radio>
                        ))}
                      </RadioGroup>
                      {errors.employeeId && (
                        <FormErrorMessage>{errors.employeeId?.message}</FormErrorMessage>
                      )}
                  </FormControl>
                  <FormControl isInvalid={errors.jobDescription != undefined}>
                    <FormLabel>Job description</FormLabel>
                    <Textarea
                        {...register('jobDescription')}
                        mb="10px"
                        />
                        {errors.jobDescription && (
                        <FormErrorMessage>{errors.jobDescription?.message}</FormErrorMessage>
                      )}
                  </FormControl>
                  <FormControl isInvalid={errors.startDate != undefined}>
                    <FormLabel>Start date</FormLabel>
                     <Input type="date"
                        {...register('startDate')}
                        mb="10px"
                        />
                         {errors.startDate && (
                        <FormErrorMessage>{errors.startDate?.message}</FormErrorMessage>
                      )}
                  </FormControl>
                  <FormControl isInvalid={errors.endDate != undefined}>
                    <FormLabel>End date</FormLabel>
                     <Input type="date"
                        {...register('endDate')}
                        mb="10px"
                        />
                         {errors.endDate && (
                        <FormErrorMessage>{errors.endDate?.message}</FormErrorMessage>
                      )}
                  </FormControl>
                  <Button onClick={handleSubmit(onSubmit)}>Add</Button>
                </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
        </>}
        </>
  );
};

export default AddEmployee;