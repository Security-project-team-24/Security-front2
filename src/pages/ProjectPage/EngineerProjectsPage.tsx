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

export const EngineerProjectsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { getEngineerProjects, getEngineerProjectsRes: engineerProjects } =
    useGetEngineerProjects();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setCurrentPage(0);
    getEngineerProjects();
  }, [isOpen]);

  return (
    <>
      <TableContainer flex={1}>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption>Projects</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Duration (months)</Th>
              <Th>Job description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {engineerProjects.data &&
              engineerProjects.data.map((item: ProjectEmployee) => (
                <Tr key={item.id}>
                  <Td>{item.project.name}</Td>
                  <Td>{item.project.duration}</Td>
                  <Td>
                    <>{item.jobDescription}</>

                    <Button onClick={onOpen} marginLeft={'10px'}>
                      Update
                    </Button>
                    <JobDescriptionForm
                      isOpen={isOpen}
                      onClose={onClose}
                      jobDescription={item.jobDescription}
                      projectId={item.project.id}
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
