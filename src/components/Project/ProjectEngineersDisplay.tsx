import { Box, Button, Checkbox, Flex, Heading, Input, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, Textarea, UnorderedList, VStack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { User } from "../../store/auth-store/model/user.model";
import { useApplicationStore } from "../../store/application.store";
import { displayToast } from "../../utils/toast.caller";


  
interface Props {
    isOpen: boolean;
    onClose: () => void;
    projectId: number
    setProjectId: (id: number) => void
  }

const ProjectEngineersDisplay = ({isOpen, onClose, projectId, setProjectId}: Props) => {
  const getProjectEngineers = useApplicationStore((state) => state.getProjectEngineers)
  const getProjectEngineersRes = useApplicationStore((state) => state.getProjectEngineersRes)
 
  
    useEffect(() => {
        fetchEngineers()
    }, [projectId])
    
    const fetchEngineers = async () => {
        if (projectId != -1) {
            await getProjectEngineers(projectId);
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
                       Employee: {user.employee.name} {user.employee.surname}<br/>
                       Job description: {user.jobDescription}
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