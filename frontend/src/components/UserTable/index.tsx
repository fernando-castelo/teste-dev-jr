import { Table, TableContainer, Tbody, Th, Thead, Tr, Td, AlertDialogHeader, Button, HStack, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React, { useState } from "react";
import { User } from "../../entites";
import { UserForm } from "../UserForm";

interface UserTableProps {
  users: User[];
}


const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const openEditModal = (user: User) => {
    setEditUser(user);
    setIsEditMode(true);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

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
                </HStack>
              </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>      
      </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Usuário</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UserForm
                user={editUser}
                isEditMode={isEditMode}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='red' mr={3} onClick={closeModal}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </div>   
  );
};

export { UserTable };
