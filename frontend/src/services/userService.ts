import { User, UserCreateDto } from "../entites";

const API_URL = 'http://localhost:3000/users';

const getUsers = async () : Promise<User[]> => {
    
    const response = await fetch(`${API_URL}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
    })

    const data = await response.json();

    return data;

  }

  const createUser = async (createUserDto: UserCreateDto):  Promise<User> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(createUserDto)
  })

  if(response.ok) {
      const responseData = await response.json();
      return responseData;
  } else {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  
  }

  const updateUser = async (userId : String, userUpdateDto : UserCreateDto) : Promise<User> => {
    const response = await fetch(`${API_URL}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userUpdateDto)
    })

    if(response.ok) {
        const responseData = await response.json();
        return responseData;
    } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
  }

  const deleteUser = async (userId : Number) : Promise<Response> => {
    const response = await fetch(`${API_URL}/${userId}`, {
        method: 'DELETE',
    })

    if(response.ok) {
        return response;
    } else {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
}



  export { getUsers, createUser, updateUser, deleteUser };
