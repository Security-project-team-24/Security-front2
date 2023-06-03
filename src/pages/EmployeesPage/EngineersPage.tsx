import { useEffect, useState } from 'react';
import { useApplicationStore } from '../../store/application.store';
import {
  Button,
  Flex,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { User } from '../../store/auth-store/model/user.model';
import ReactPaginate from 'react-paginate';
import { useGetEmployees } from '../../api/services/user/useGetEmployees';
import { useGetEngineers } from '../../api/services/user/useGetEngineers';
import { Engineer } from '../../store/auth-store/model/engineer.model';

export const EngineersPage = () => {
  const { engineersRes, getEngineers } = useGetEngineers();
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    fetchEmployees(0);
  }, []);

  const fetchEmployees = async (pageNumber: number) => {
    await getEngineers(pageNumber);
    console.log('eng', engineersRes);
  };

  const handlePageClick = async (event: any) => {
    setCurrentPage(event.selected);
    await fetchEmployees(event.selected);
  };

  return (
    <>
      <TableContainer flex={1}>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption>Employees</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Surname</Th>
              <Th>Address</Th>
              <Th>Email</Th>
              <Th>Phone number</Th>
              <Th>Seniority</Th>
              <Th>CV</Th>
            </Tr>
          </Thead>
          <Tbody>
            {engineersRes.data.content &&
              engineersRes.data.content.map((engineer: Engineer) => (
                <Tr key={engineer.id}>
                  <Td>{engineer.user.name}</Td>
                  <Td>{engineer.user.surname}</Td>
                  <Td>
                    {engineer.user.address.street}{' '}
                    {engineer.user.address.streetNumber}{' '}
                    {engineer.user.address.zipCode} {engineer.user.address.city}
                    , {engineer.user.address.country}
                  </Td>
                  <Td>{engineer.user.email}</Td>
                  <Td>{engineer.user.phoneNumber}</Td>
                  <Td>{engineer.seniority}</Td>
                  <Td>
                    <Button>
                      <a
                        href={engineer.cv_url}
                        target='_blank'
                        rel='noreferrer'
                      >
                        CV
                      </a>
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      {engineersRes.status == 'LOADING' && (
        <>
          <Flex justifyContent={'center'}>
            <Spinner />
          </Flex>
        </>
      )}
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
        pageCount={engineersRes.data.totalPages}
        pageClassName={'item pagination-page '}
        pageRangeDisplayed={2}
        previousClassName={'item previous'}
        previousLabel='<'
      />
    </>
  );
};
