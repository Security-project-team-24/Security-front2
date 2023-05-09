import { Box, Button, Checkbox, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, Textarea, VStack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { User } from "../../store/auth-store/model/user.model";
import { useApplicationStore } from "../../store/application.store";
import { displayToast } from "../../utils/toast.caller";


  
interface Props {
    isOpen: boolean;
    onClose: () => void;
    projectId: number
  }

const AddEmployee = ({isOpen, onClose, projectId}: Props) => {
  const getAvailableEmployees = useApplicationStore((state) => state.getAvailableEmployees)
  const getAvailableEmployeesRes = useApplicationStore((state) => state.getAvailableEmployeesRes)
  const [selectedUser, setSelectedUser] = useState(-1);
  const [jobDescription, setJobDescription] = useState("");

  const handleTextChange = (event: any) => {
    setJobDescription(event.target.value);
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user.id);
  };

  const addEmployee = useApplicationStore((state) => state.addEmployee)
  const addEmployeeRes = useApplicationStore((state) => state.addEmployeeRes)
    const toast = useToast()
    const handleButtonClick = async () => {
        await addEmployee({projectId: projectId, employeeId: selectedUser, jobDescription: jobDescription})
        if (addEmployeeRes.status == "SUCCESS") {
            displayToast(toast, "Succuessfully added employee", "success")
            onClose()
        }
    };

    useEffect(() => {
        fetchEmployees()
    }, [projectId])
    
    const fetchEmployees = async () => {
        if (projectId != -1) {
            await getAvailableEmployees(projectId);
        }
    };


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
                <Box h="150px" overflowY="auto">
                    <VStack align="start">
                    {getAvailableEmployeesRes.data.map((user) => (
                        <Checkbox
                        key={user.id}
                        isChecked={selectedUser === user.id}
                        onChange={() => handleUserSelect(user)}
                        >
                        <Text>{user.name} {user.surname}, {user.role}</Text>
                        </Checkbox>
                    ))}
                    </VStack>
                    </Box>
                     <Textarea
                        value={jobDescription}
                        onChange={handleTextChange}
                        placeholder="Enter job description"
                        mb="10px"
                        />
                    <Button onClick={handleButtonClick}>Add</Button>
                </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
        </>}
        </>
  );
};

export default AddEmployee;