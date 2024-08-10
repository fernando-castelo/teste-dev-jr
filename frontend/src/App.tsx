import { useEffect, useState } from 'react';
import { Heading, Container, useDisclosure, Button } from '@chakra-ui/react';
import { UserTable } from './components/UserTable';
import { getUsers } from './services/userService';
import { User } from './entites';
import { UserForm } from './components/UserForm';
import GenericModal from './components/GenericModal.tsx';

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
      maxW="100%"
      overflowX="auto"
      p={4}  
    >
      <Heading>Tabela de Usuários</Heading>
      <Button onClick={onOpen}>Cadastrar Usuário</Button>

      <GenericModal
        isOpen={isOpen}
        onClose={onClose}
        header="Cadastrar Usuário"
        body={<UserForm user={null} closeModal={close} isEditMode={false} />}
      />
      <UserTable users={users} />
    </Container>
  );
}

export default App;
