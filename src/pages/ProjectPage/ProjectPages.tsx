import { useEffect, useState } from "react";
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
import AddEmployee from "../../components/Project/AddEmployee";
import ProjectEngineersDisplay from "../../components/Project/ProjectEngineersDisplay";

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
    const {
        isOpen: isOpenAddEmployee,
        onOpen: onOpenAddEmployee,
        onClose: onCloseAddEmployee,
    } = useDisclosure();
    const {
        isOpen: isOpenEngineersDisplay,
        onOpen: onOpenEngineersDisplay,
        onClose: onCloseEngineersDisplay,
    } = useDisclosure();
    const toast = useToast()
    useEffect(() => {
        fetchProjects()
    }, [createProjectRes])
    const fetchProjects = async () => {
        await getProjects();
    };
    const [projectId, setProjectId] = useState(-1)
    const addEmployee = (projectId: number) => {
        setProjectId(projectId)
        onOpenAddEmployee()
    }
    const openEngineersDisplay = (projectId: number) => {
        setProjectId(projectId)
        onOpenEngineersDisplay()
    }
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
                    <Td><Button onClick={() => openEngineersDisplay(item.id)}>Engineers</Button></Td>
                    <Td><Button onClick={() => addEmployee(item.id)}>Add employee</Button></Td>
                </Tr>
                ))}
            </Tbody>
        </Table>
        </TableContainer>
        <CreateProjectForm
        isOpen={isOpenCreateProject}
        onClose={onCloseCreateProject}
        />
      <AddEmployee
        isOpen={isOpenAddEmployee}
        onClose={onCloseAddEmployee}
        projectId={projectId}
        setProjectId={setProjectId}/>
        <ProjectEngineersDisplay
        isOpen={isOpenEngineersDisplay}
        onClose={onCloseEngineersDisplay}
        projectId={projectId}
        setProjectId={setProjectId}
        />
    </>
    );
};
