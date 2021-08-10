import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function useAuth() {
    const value = useContext(AuthContext)

    return value;
}

// sempre que uma palavra inicia com "use", é um hook
// o hook é usado somente dentro do escopo do componente 