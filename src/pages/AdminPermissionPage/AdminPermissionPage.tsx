import { Button, Flex, Select, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Permission } from '../../store/auth-store/model/permission.model';
import { useGetPermissionsForRole } from '../../api/services/auth/useGetPermissionsForRole';
import { useGetRoles } from '../../api/services/auth/useGetRoles';
import { useCommitPermissions } from '../../api/services/auth/useCommitPermissions';
import { toast } from 'react-toastify';

export const AdminPermissionPage = () => {
  const [roles, setRoles] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | undefined>();
  const [permissionsGranted, setPermissionsGranted] = useState<Permission[]>(
    []
  );
  const [permissionsNotGranted, setPermissionsNotGranted] = useState<
    Permission[]
  >([]);

  const { getRoles } = useGetRoles();
  const { getPermissionsForRole } = useGetPermissionsForRole();
  const { commitPermissions, commitPermissionsState } = useCommitPermissions();
  const [draggedLeft, setDraggedLeft] = useState<Permission | null>();
  const [draggedRight, setDraggedRight] = useState<Permission | null>();

  const onDropFromLeft = () => {
    console.log(draggedLeft);
    if (draggedLeft == null) return;
    setPermissionsGranted([...permissionsGranted, draggedLeft]);
    setPermissionsNotGranted(
      permissionsNotGranted.filter((p) => p.id !== draggedLeft.id)
    );
    setDraggedLeft(null);
  };
  const onDropFromRight = () => {
    console.log(draggedRight);
    if (draggedRight == null) return;
    setPermissionsNotGranted([...permissionsNotGranted, draggedRight]);
    setPermissionsGranted(
      permissionsGranted.filter((p) => p.id !== draggedRight.id)
    );
    setDraggedRight(null);
  };

  const handleCommitPermissions = async () => {
    if (!selectedRole) {
      toast.error('Role must be selected!');
      return;
    }
    console.log(selectedRole, permissionsGranted);
    await commitPermissions(selectedRole, permissionsGranted);
    await loadPermissions(selectedRole);
  };

  const loadPermissions = async (role: string) => {
    const permissions = await getPermissionsForRole(role);
    setPermissionsGranted(permissions.granted);
    setPermissionsNotGranted(permissions.notGranted);
  };

  useEffect(() => {
    getRoles().then((res) => {
      setRoles(res);
    });
  }, []);

  useEffect(() => {
    if (!selectedRole) return;
    loadPermissions(selectedRole);
  }, [selectedRole]);

  return (
    <Flex
      gap={10}
      h={'100%'}
      padding={'20px'}
      direction={'column'}
      position={'relative'}
    >
      <Select
        value={selectedRole}
        placeholder={'Select role'}
        onChange={(e) => setSelectedRole(e.target.value)}
      >
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </Select>
      <Flex gap={10}>
        <Flex
          flex={1}
          direction={'column'}
          border={'1px solid lightgray'}
          minH={'90%'}
        >
          <Flex
            direction={'column'}
            minH={'600px'}
            maxH={'600px'}
            overflowY={'scroll'}
          >
            <Text fontSize={'2rem'} textAlign={'center'}>
              Permissions not granted
            </Text>
            {permissionsNotGranted.map((permission, index) => (
              <Text
                onDragStart={() => setDraggedLeft(permission)}
                onDragEnd={() => onDropFromLeft()}
                draggable={true}
                onDragOver={(e) => e.preventDefault()}
                key={permission.id}
                borderBottom={'1px solid lightgray'}
                borderTop={index === 0 ? '1px solid lightgray' : undefined}
                cursor={'pointer'}
                padding={2}
                textAlign={'center'}
              >
                {permission.name}
              </Text>
            ))}
          </Flex>
        </Flex>
        <Flex
          direction={'column'}
          flex={1}
          minH={'90%'}
          border={'1px solid lightgray'}
        >
          <Flex
            direction={'column'}
            minH={'600px'}
            maxH={'600px'}
            overflowY={'scroll'}
          >
            <Text fontSize={'2rem'} textAlign={'center'}>
              Permissions granted
            </Text>
            {permissionsGranted.map((permission, index) => (
              <Text
                onDragStart={() => setDraggedRight(permission)}
                onDragEnd={() => onDropFromRight()}
                draggable={true}
                onDragOver={(e) => e.preventDefault()}
                key={permission.id}
                borderBottom={'1px solid lightgray'}
                borderTop={index === 0 ? '1px solid lightgray' : undefined}
                cursor={'pointer'}
                padding={2}
                textAlign={'center'}
              >
                {permission.name}
              </Text>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Button
        color={'white'}
        background={'green'}
        width={'150px'}
        height={'50px'}
        alignSelf={'flex-end'}
        onClick={handleCommitPermissions}
      >
        Submit
      </Button>
      {commitPermissionsState.status === 'LOADING' && (
        <Flex
          justifyContent={'center'}
          w={'100%'}
          h={'100%'}
          background={'rgba(0, 0, 0, 0.3)'}
          position={'absolute'}
          top={'0'}
          left={'0'}
          alignItems={'center'}
        >
          <Spinner size={'xl'} />
        </Flex>
      )}
    </Flex>
  );
};
