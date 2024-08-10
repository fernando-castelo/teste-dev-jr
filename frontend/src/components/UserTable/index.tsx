import { Table, TableContainer, Tbody, Th, Thead, Tr, Td, Button, HStack, Text, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { User } from "../../entites";
import { UserForm } from "../UserForm";
import GenericModal from "../GenericModal.tsx";
import { deleteUser } from "../../services/userService.ts";

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setIsOpen(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  }

  const closeModal = () => setIsOpen(false);

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleDelete = async () => {
    if (selectedUser) {
      try {
        deleteUser(selectedUser.id);

        closeDeleteModal();
        window.location.reload()
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="UserTable">
      <TableContainer maxW="100%" overflowX="auto">
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.nomeCompleto}</Td>
                <Td>{user.email}</Td>
                <Td>
                <HStack>
                  <Button colorScheme="blue" onClick={() => openEditModal(user)}>Editar</Button>
                  <Button colorScheme="red" onClick={() => openDeleteModal(user)}>Remover</Button>
                </HStack>
              </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>      
      </TableContainer>

      <GenericModal
        isOpen={isOpen}
        onClose={closeModal}
        header="Editar Usuário"
        body={<UserForm user={selectedUser} closeModal={closeModal} isEditMode={isEditMode} />}
      />

      <GenericModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        header="Confirmar Exclusão"
        body={
          <Stack spacing={4} p={4}>
            <Text fontSize="lg" mb={4}>
              Tem certeza que deseja remover o usuário {selectedUser?.nomeCompleto}?
            </Text>
            <Stack direction="row" spacing={4}>
              <Button colorScheme="red" onClick={handleDelete}>
                Remover
              </Button>
              <Button colorScheme="gray" onClick={closeDeleteModal}>
                Cancelar
              </Button>
            </Stack>
          </Stack>
        }
      />
    </div>   
  );
};

export { UserTable };
