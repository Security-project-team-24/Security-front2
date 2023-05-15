import { Box, Button, Checkbox, Flex, Heading, Input, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, Textarea, UnorderedList, VStack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { User } from "../../store/auth-store/model/user.model";
import { useApplicationStore } from "../../store/application.store";
import { displayToast } from "../../utils/toast.caller";
import { format, parseISO } from 'date-fns';
import { Project } from "../../store/project-store/types/project.type";


  
interface Props {
    isOpen: boolean;
    onClose: () => void;
    project: Project
    setProject: (id: Project) => void
  }

const ProjectEngineersDisplay = ({isOpen, onClose, project, setProject}: Props) => {
  const getProjectEngineers = useApplicationStore((state) => state.getProjectEngineers)
  const getProjectEngineersRes = useApplicationStore((state) => state.getProjectEngineersRes)
 
  
    useEffect(() => {
        fetchEngineers()
    }, [project])
    
    const fetchEngineers = async () => {
      if (project.id != -1) {
          await getProjectEngineers(project.id);
      }
    };


  return (
    <>
    { isOpen && <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay/>
          <ModalContent  width="50vw">
            <ModalHeader textAlign='center'>Engineers</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Box height="400px" overflowY="auto" paddingLeft="5px">
                <UnorderedList>
                {getProjectEngineersRes.data.map((user) => (
                    <ListItem key={user.id}>
                       Full name: {user.employee.name} {user.employee.surname}<br/>
                       Job description: {user.jobDescription}<br/>
                       Working time: {format(new Date(user.startDate), 'dd/MM/yyyy')} - {format(new Date(user.endDate), "dd/MM/yyyy")}
                    </ListItem>
                 ))}
                </UnorderedList>
            </Box> 
            </ModalBody>
          </ModalContent>
        </Modal>
        </>}
        </>
  );
};

export default ProjectEngineersDisplay;