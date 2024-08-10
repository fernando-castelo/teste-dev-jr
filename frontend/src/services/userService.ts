import { User } from "../entites";

const API_URL = 'http://localhost:3000/users';

const getUsers = async () : Promise<User[]> => {
    const status = 'completed'
    
    const response = await fetch(`${API_URL}?status=${status}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
    })

    const data = await response.json();

    return data;

  }

  export { getUsers };
