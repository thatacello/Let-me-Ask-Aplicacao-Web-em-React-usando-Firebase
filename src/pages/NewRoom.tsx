import illustrationImg from '../assets/images/images/illustration.svg';
import logoImg from '../assets/images/images/logo.svg';
import googleIconImg from '../assets/images/images/google-icon.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';

import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';

export function NewRoom() {
  const { user } = useAuth();
  // '' dentro do useState significa que recebe uma string
  const [newRoom, setNewRoom] = useState('');

  // função que cria a sala
  // event -> permite que eu acesse as tags dentro do formulário
  async function handleCreateRoom(event: FormEvent) {
    // previne que a página atualize, pois por padrão o formulário sempre irá atualizar a página
    event.preventDefault();

    // validação -> caso o usuário tenha digitado apenas espaços vazios
    if(newRoom.trim() === ''){
      return;
    }
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="logo Letmeask" />
          <h2>Criar uma nova sala</h2>
          {/* a função tem que estar dentro do onSubmit do formulário para evitar q o usuário ative a função sem preencher o formulário antes */}
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              // onChange -> avisa toda vez que o input for modificado 
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            {/* o Link substitui o "a" */}
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
