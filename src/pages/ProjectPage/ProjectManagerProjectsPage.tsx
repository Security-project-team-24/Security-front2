import {
  Button,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useApplicationStore } from '../../store/application.store';
import { ProjectEmployee } from '../../api/services/project/types/projectEmployee.type';
import { useGetEngineerProjects } from '../../api/services/project/useGetEngineerProjects';
import { useUpdateJobDescription } from '../../api/services/project/useUpdateJobDescription';
import { JobDescriptionForm } from '../../components/JobDescriptionForm/JobDescriptionForm';
import { useGetProjectEngineers } from '../../api/services/project/useGetProjectEngineers';
import { useGetProjectManagerProjects } from '../../api/services/project/useGetProjectManagerProjects';
import ProjectEngineersDisplay from '../../components/Project/ProjectEngineersDisplay';
import AddEmployee from '../../components/Project/AddEmployee';
import { Project } from '../../api/services/project/types/project.type';

export const ProjectManagerProjectsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { getProjectManagerProjects, getProjectManagerProjectsRes } =
    useGetProjectManagerProjects();
  const [project, setProject] = useState<Project>();
  const {
    isOpen: isOpenEngineersDisplay,
    onOpen: onOpenEngineersDisplay,
    onClose: onCloseEngineersDisplay,
  } = useDisclosure();
  const {
    isOpen: isOpenAddEmployee,
    onOpen: onOpenAddEmployee,
    onClose: onCloseAddEmployee,
  } = useDisclosure();

  useEffect(() => {
    setCurrentPage(0);
    getProjectManagerProjects();
  }, []);

  return (
    <>
      <TableContainer flex={1}>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption>Projects</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Duration (months)</Th>
              <Th>Start date</Th>
              <Th>End date</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {getProjectManagerProjectsRes.data &&
              getProjectManagerProjectsRes.data.map((item: ProjectEmployee) => (
                <Tr key={item.id}>
                  <Td>{item.project.name}</Td>
                  <Td>{item.project.duration}</Td>
                  <Td>
                    {new Date(item.startDate).toLocaleDateString('en-GB')}
                  </Td>
                  <Td>{new Date(item.endDate).toLocaleDateString('en-GB')}</Td>
                  <Td>
                    <Button onClick={onOpenEngineersDisplay}>Engineers</Button>
                    <ProjectEngineersDisplay
                      isOpen={isOpenEngineersDisplay}
                      onClose={onCloseEngineersDisplay}
                      project={item.project}
                    />
                  </Td>
                  <Td>
                    <Button onClick={onOpenAddEmployee}>Add employee</Button>
                    <AddEmployee
                      isOpen={isOpenAddEmployee}
                      onClose={onCloseAddEmployee}
                      project={item.project}
                      setProject={setProject}
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      {/* <ReactPaginate
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
        /> */}
    </>
  );
};
