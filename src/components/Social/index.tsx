import { ReactNode } from "react";

interface SocialProps {
  url: string;
  children: ReactNode; // tudo que vem dentro do componente, e temos que tipar como JSX
}

export function Social({ url, children }: SocialProps) {
  return (
    // recebendo a url que o usuario clicar
    <a href={url} rel="noopener noreferrer" target="_blank">
      {/* recebendo o icone */}
      {children}
    </a>
  );
}

export default Social;

// o children seria onde fica o icone
// noopener noreferrer = falando pro componente que sera um link externo
