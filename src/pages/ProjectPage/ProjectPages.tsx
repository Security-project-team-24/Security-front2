import { useEffect } from "react";
import { useApplicationStore } from "../../store/application.store";
import {
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { displayToast } from "../../utils/toast.caller";
import { Project } from "../../store/project-store/types/project.type";
import { CreateProjectForm } from "../../components/Project/CreateProjectForm";

export const ProjectPage = () => {
 
    const getProjects = useApplicationStore(
    (state) => state.getProjects
    );
    const getProjectsRes = useApplicationStore(
    (state) => state.getProjectsRes
    );
    const createProjectRes = useApplicationStore(
        (state) => state.createProjectRes
    );
    const {
        isOpen: isOpenCreateProject,
        onOpen: onOpenCreateProject,
        onClose: onCloseCreateProject,
    } = useDisclosure();
    const toast = useToast()
    useEffect(() => {
        fetchProjects()
    }, [createProjectRes])
    const fetchProjects = async () => {
        await getProjects();
        if (createProjectRes.status == "SUCCESS") {
            displayToast(toast, "Successfully created project", "success")
        }
    };

    return (
    <>
        <Button onClick={onOpenCreateProject} mr="5px">
            Create project
        </Button>
        <TableContainer flex={1}>
        <Table variant="striped" colorScheme="teal">
            <TableCaption>Projects</TableCaption>
            <Thead>
            <Tr>
                <Th>Name</Th>
                <Th>Duration (months)</Th>
            </Tr>
            </Thead>
            <Tbody>
            {getProjectsRes.data &&
                getProjectsRes.data.map((item: Project) => (
                <Tr key={item.id}>
                    <Td>{item.name}</Td>
                    <Td>{item.duration}</Td>
                </Tr>
                ))}
            </Tbody>
        </Table>
        </TableContainer>
        <CreateProjectForm
        isOpen={isOpenCreateProject}
        onClose={onCloseCreateProject}
      />
    </>
    );
};
