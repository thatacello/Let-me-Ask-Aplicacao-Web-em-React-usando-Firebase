import firebase from 'firebase';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  // toda função assíncrona retorna uma Promise
  signInWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
    // quando eu quero importar um component que vem de dentro do react eu uso o import ReactNode
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
// depois que o usuário dá f5, todas as informações do useState se perdem
  const [user, setUser] = useState<User>();

  // monitora as informações, dispara uma função sempre que "algo" acontecer
  // useEffect(() => {1 - qual função quero executar}, [2 - array - quando quero executar essa função])
  // useEffect(() => {função}, [user]) -> ex: dispara a função toda vez que a variável user mudar
  // useEffect(() => {função}, []) -> array vazio, função é disparada uma única vez
  useEffect(() => {
    // onAuthStateChanged -> é um listener, busca se existe algum login preexistente
    // boa prática -> quando chamar um event listener dentro de um effect, é recomendável salvá-lo em uma variável para "desligá-lo" posteriormente
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // se houver login, executar a condição abaixo
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    // pára o event listener onAuthStateChanged
    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    // autenticação com o firebase
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      // não deixa o usuário logar se não tiver nome e foto
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }
  return (
    // a primeira chave indica que quero criar um código JS e a segunda chave indica que quero criar um objeto
    // aqui todas as páginas passam a ter acesso ao signInWithGoogle
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
        {props.children}
    </AuthContext.Provider>
  );
}
