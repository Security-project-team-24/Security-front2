import { useEffect, useState } from 'react';
import { useApplicationStore } from '../../store/application.store';
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
} from '@chakra-ui/react';
import { Project } from '../../api/services/project/types/project.type';
import { CreateProjectForm } from '../../components/Project/CreateProjectForm';
import AddEmployee from '../../components/Project/AddEmployee';
import ProjectEngineersDisplay from '../../components/Project/ProjectEngineersDisplay';
import ReactPaginate from 'react-paginate';
import '../../styles/pagination.css';
import { useGetProjects } from '../../api/services/project/useGetProjects';
import { useCreateProject } from '../../api/services/project/useCreateProject';

export const ProjectPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { getProjectsRes, getProjects } = useGetProjects();
  const { createProjectRes } = useCreateProject();

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

  useEffect(() => {
    setCurrentPage(0);
    fetchProjects(currentPage);
  }, [createProjectRes]);
  const fetchProjects = async (pageNumber: number) => {
    await getProjects(5, pageNumber);
  };
  const [project, setProject] = useState<Project>({
    id: -1,
    name: '',
    duration: -1,
    projectEmployees: [],
  });
  const addEmployee = (project: Project) => {
    setProject(project);
    onOpenAddEmployee();
  };
  const openEngineersDisplay = (project: Project) => {
    setProject(project);
    onOpenEngineersDisplay();
  };

  const handlePageClick = async (event: any) => {
    setCurrentPage(event.selected);
    fetchProjects(event.selected);
  };

  return (
    <>
      <Button onClick={onOpenCreateProject} mr='5px'>
        Create project
      </Button>
      <TableContainer flex={1}>
        <Table variant='striped' colorScheme='teal'>
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
                  <Td>
                    <Button onClick={() => openEngineersDisplay(item)}>
                      Engineers
                    </Button>
                  </Td>
                  <Td>
                    <Button onClick={() => addEmployee(item)}>
                      Add employee
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ReactPaginate
        activeClassName={'item active '}
        forcePage={currentPage}
        breakClassName={'item break-me '}
        breakLabel={'...'}
        containerClassName={'pagination'}
        disabledClassName={'disabled-page'}
        marginPagesDisplayed={2}
        nextClassName={'item next '}
        nextLabel='>'
        onPageChange={handlePageClick}
        pageCount={getProjectsRes.data.totalPages}
        pageClassName={'item pagination-page '}
        pageRangeDisplayed={2}
        previousClassName={'item previous'}
        previousLabel='<'
      />
      <CreateProjectForm
        isOpen={isOpenCreateProject}
        onClose={onCloseCreateProject}
      />
      <AddEmployee
        isOpen={isOpenAddEmployee}
        onClose={onCloseAddEmployee}
        project={project}
        setProject={setProject}
      />
      <ProjectEngineersDisplay
        isOpen={isOpenEngineersDisplay}
        onClose={onCloseEngineersDisplay}
        project={project}
      />
    </>
  );
};
