// ARQUIVO QUE FAZ A PROTEÇAO DAS ROTAS ADMIN E SOCIAL
import { ReactNode, useState, useEffect } from "react";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}

export const Private = ({ children }: PrivateProps): any => {
  // quando abrir o componente e passar pelo private chamamos o useEffect
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // se o usuario estiver logado iremos salvar as info no localStorage
        const userData = {
          uid: user?.uid,
          email: user?.email,
        };
        localStorage.setItem("@reactlinks", JSON.stringify(userData));
        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
    });

    // depois que o  sistema de olheiro ver que o usuario esta logado, iremos desmontar o componente
    // desligando o sistema de olheiro, por que nao e mais necessario
    // quando o componente que esta usando essa private sair(nao existir mais, saindo da rota que tem o private) nao e mais necessario ficar monitorando o usuario

    return () => {
      unsub();
    };
  }, []);

  if (loading) {
    return <div></div>;
  }
  if (!signed) {
    return <Navigate to="/login" />;
  }
  return children;
};

// o private ira receber uma children, que sera a rota
// onAuthStateChanged verifica se o usuario esta logado
// depois que fizermos o controle iremos renderizar com base no controle
