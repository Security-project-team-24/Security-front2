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
import ReactPaginate from "react-paginate";
import "../../styles/pagination.css";

export const ProjectPage = () => {

    const [currentPage, setCurrentPage] = useState<number>(0);
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
        fetchProjects(0)
    }, [createProjectRes])
    const fetchProjects = async (pageNumber: number) => {
        await getProjects(5, pageNumber);
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

    const handlePageClick = async (event: any) => {
        setCurrentPage(event.selected);
        fetchProjects(event.selected)
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
            {getProjectsRes.data.content &&
                getProjectsRes.data.content.map((item: Project) => (
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
        <ReactPaginate
          activeClassName={"item active "}
          forcePage={currentPage}
          breakClassName={"item break-me "}
          breakLabel={"..."}
          containerClassName={"pagination"}
          disabledClassName={"disabled-page"}
          marginPagesDisplayed={2}
          nextClassName={"item next "}
          nextLabel=">"
          onPageChange={handlePageClick}
          pageCount={getProjectsRes.data.totalPages}
          pageClassName={"item pagination-page "}
          pageRangeDisplayed={2}
          previousClassName={"item previous"}
          previousLabel="<"
        />
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
