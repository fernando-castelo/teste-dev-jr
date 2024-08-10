import { useEffect, useState } from 'react';
import { Heading, Container, useDisclosure, Button, ModalOverlay, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Text } from '@chakra-ui/react';
import { UserTable } from './components/UserTable';
import { getUsers } from './services/userService';
import { User } from './entites';
import { UserForm } from './components/UserForm';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('An unknown error occurred'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
    >
      <Heading mb={4}>Tabela de Usuários</Heading>
      <Button onClick={onOpen}>Cadastrar Usuário</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastrar Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UserForm user={null} isEditMode={false}/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <UserTable users={users} />
    </Container>
  );
}

export default App;
