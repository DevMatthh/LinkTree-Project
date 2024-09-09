import { InputHTMLAttributes } from "react";

// a tipatem inputProps esta extendendo todas as propriedades que o input recebe (classe,placeholder,value,onchange)
// quem usar o componente input pode me passar atraves dessas props as propriedades que tem dentro do input
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      className="border-0 h-9 rounded-md outline-none px-2 mb-3 "
      //   repassando as propriedades dentro do nosso tipo input
      {...props}
    ></input>
  );
}

export default Input;
