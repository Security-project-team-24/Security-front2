import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  UnorderedList,
  VStack,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { User } from '../../store/auth-store/model/user.model';
import { useApplicationStore } from '../../store/application.store';
import { displayToast } from '../../utils/toast.caller';
import { format, parseISO } from 'date-fns';
import { Project } from '../../api/services/project/types/project.type';
import { useGetProjectEngineers } from '../../api/services/project/useGetProjectEngineers';
import { useRemmoveEmployee } from '../../api/services/project/useRemoveEmployee';
import { ProjectEmployee } from '../../api/services/project/types/projectEmployee.type';
import { useGetAvailableEmployees } from '../../api/services/project/useGetAvailableEmployees';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

const ProjectEngineersDisplay = ({ isOpen, onClose, project }: Props) => {
  const { getProjectEngineers, getProjectEngineersRes } =
    useGetProjectEngineers();
  const { getAvailableEmployees } = useGetAvailableEmployees();
  const loggedUser = useApplicationStore((state) => state.user);
  const { removeEmployee } = useRemmoveEmployee();

  useEffect(() => {
    if (!isOpen) return;
    fetchEngineers();
  }, [isOpen]);

  const fetchEngineers = async () => {
    console.log(project.id);
    if (project.id != -1) {
      await getProjectEngineers(project.id);
    }
  };

  const handleRemoveEmployeeFromProject = async (employeeId: number) => {
    await removeEmployee(project.id, employeeId);
    await getProjectEngineers(project.id);
    await getAvailableEmployees(project.id);
  };

  return (
    <>
      {isOpen && (
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent width='50vw'>
              <ModalHeader textAlign='center'>Engineers</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box height='400px' overflowY='auto' paddingLeft='5px'>
                  {getProjectEngineersRes.status == 'LOADING' && (
                    <>
                      <Flex justifyContent={'center'}>
                        <Spinner />
                      </Flex>
                    </>
                  )}
                  {getProjectEngineersRes.status != 'LOADING' && (
                    <>
                      <UnorderedList>
                        {getProjectEngineersRes.data.map((user) => (
                          <Flex key={user.id}>
                            <ListItem key={user.id}>
                              <>
                                Full name: {user.employee.name}{' '}
                                {user.employee.surname}
                                <br />
                                Job description: {user.jobDescription}
                                <br />
                                Working time:{' '}
                                {format(
                                  new Date(user.startDate),
                                  'dd/MM/yyyy'
                                )}{' '}
                                - {format(new Date(user.endDate), 'dd/MM/yyyy')}
                                <br />
                              </>
                            </ListItem>
                            <Flex gap={'10px'}>
                              {loggedUser?.roles.includes(
                                'PROJECT_MANAGER'
                              ) && (
                                <Button
                                  onClick={() =>
                                    handleRemoveEmployeeFromProject(
                                      user.employee.id
                                    )
                                  }
                                >
                                  Remove
                                </Button>
                              )}
                              {loggedUser?.roles.includes(
                                'PROJECT_MANAGER'
                              ) && (
                                <Button>
                                  <a
                                    href={user.engineer.cv_url}
                                    target='_blank'
                                    rel='noreferrer'
                                  >
                                    CV
                                  </a>
                                </Button>
                              )}
                            </Flex>
                          </Flex>
                        ))}
                      </UnorderedList>
                    </>
                  )}
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default ProjectEngineersDisplay;
