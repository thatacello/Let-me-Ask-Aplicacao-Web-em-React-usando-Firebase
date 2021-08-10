import illustrationImg from '../assets/images/images/illustration.svg';
import logoImg from '../assets/images/images/logo.svg';
import googleIconImg from '../assets/images/images/google-icon.svg';
import { useHistory } from 'react-router-dom';
import { Button } from '../components/Button';

import '../styles/auth.scss';
// o useAuth é o import { useContext } from 'react' e import { AuthContext } from '../contexts/AuthContext';
import { useAuth } from '../hooks/useAuth';

export function Home() {
  // toda função que começa com "use" é chama de Hook e todo Hook precisa estar dentro do componente ou ele não funciona
  const history = useHistory();
  const { signInWithGoogle, user } = useAuth();

  async function handleCreateRoom() {
    if(!user){
      await signInWithGoogle()
    }
    history.push('/rooms/new');
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

          {/* não usar navigateToNewRoom() com parênteses */}
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
