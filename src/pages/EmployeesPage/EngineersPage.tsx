import { useEffect, useState } from 'react';
import { useApplicationStore } from '../../store/application.store';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
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
import { format } from 'date-fns';

export const EngineersPage = () => {
  const { engineersRes, getEngineers } = useGetEngineers();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [fromHireDate, setFromHireDate] = useState('');
  const [toHireDate, setToHireDate] = useState('');
  const user = useApplicationStore((state) => state.user)

  useEffect(() => {
    fetchEmployees(0);
  }, []);

  const fetchEmployees = async (pageNumber: number) => {
    if (fromHireDate == '' || toHireDate == '') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedDate = format(tomorrow, 'yyyy-MM-dd');
      await getEngineers(pageNumber, email, name, surname, '0001-01-01', formattedDate);
    }
    else {
      await getEngineers(pageNumber, email, name, surname, fromHireDate, toHireDate);
    }
  };

  const handlePageClick = async (event: any) => {
    setCurrentPage(event.selected);
    await fetchEmployees(event.selected);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setCurrentPage(0)
    fetchEmployees(0)
  };

  return (
    <> { user?.roles?.includes('ADMIN') && 
      <form onSubmit={handleSubmit}>
        <Flex flexDirection={'row'} padding={'15px'}>
          <FormControl>
            <FormLabel mb={0}>Email</FormLabel>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel mb={0}>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel mb={0}>Surname</FormLabel>
            <Input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel mb={0}>From hire date</FormLabel>
            <Input
              type="date"
              value={fromHireDate}
              onChange={(e) => setFromHireDate(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel mb={0}>To hire date</FormLabel>
            <Input
              type="date"
              value={toHireDate}
              onChange={(e) => setToHireDate(e.target.value)}
            />
          </FormControl>
          <Button type="submit" mt={'22px'} padding={'22px'}>Search</Button>
          </Flex>
        </form>
      }
      <TableContainer flex={1}>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption>Engineers</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Surname</Th>
              <Th>Address</Th>
              <Th>Email</Th>
              <Th>Phone number</Th>
              <Th>Seniority</Th>
              <Th>Hire date</Th>
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
                  <Td>{engineer.hireDate.toString()}</Td>
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
