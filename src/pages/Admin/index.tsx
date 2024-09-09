import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { FiTrash } from "react-icons/fi";

import { useState, FormEvent, useEffect } from "react";
import {
  addDoc, // add um documento dentro de uma coleçao, gera um id aleatorio
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");
  const [links, setLinks] = useState<LinkProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links"); // acessando a coleçao dos links
    const queryRef = query(linksRef, orderBy("created", "asc")); // faz uma busca personalizada ou ordenaçao (crescente ou decrescente)
    const unsub = onSnapshot(queryRef, (snapshot) => {
      const lista = [] as LinkProps[]; // falando pra variavel lista que iremos receber um array de objetos contendo as propriedades do link (id,name,url,bg,color)

      //acessando e  percorrendo a lista com os links, e dentro temos acesso a cada doc

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });
      // busca tudo do banco, organiza dentro de um array lista e passamos para a useState links
      setLinks(lista);
    });

    // quando terminarmos de buscar os links e mudarmos para outra pagina, desativaremos o snapshot com uma func component amount para economizar processamento

    return () => {
      unsub();
    };
  }, []);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (nameInput === "" || urlInput === "") {
      alert("Preencha todos os campos.");
      return;
    }
    try {
      await addDoc(collection(db, "links"), {
        name: nameInput,
        url: urlInput,
        bg: backgroundColorInput,
        color: textColorInput,
        created: new Date(),
      });
      console.log("CADASTRADO COM SUCESSO");
      setNameInput("");
      setUrlInput("");
    } catch (e) {
      console.log("ERRO AO CADASTRAR NO BANCO" + e);
    }
  };

  const handleDeleteLink = async (id: string) => {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  };
  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2 ">
      <Header />
      <form
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
        onSubmit={handleRegister}
      >
        <label className="text-white font-medium mt-2 mb-2 ">
          Nome do Link
        </label>
        <Input
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2 ">Url do Link</label>
        <Input
          type="url"
          placeholder="Digite a url "
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2 ">
              Cor do Link
            </label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            ></input>
          </div>
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2 ">
              Fundo do Link
            </label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            ></input>
          </div>
        </section>

        {/*  quando formos cadastrar o link e começar a digitar algo, sera mostrado um preview de como esta ficando o link */}
        {/* verificando se o nameInput esta diferente de vazio, caso esteja, sera renderizado a tela dos links */}
        {nameInput !== "" && (
          <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-3 ">
              {" "}
              Veja como esta ficando
            </label>
            {/* article ira simbolizar o link em que estou montando */}
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded-4 px-1 py-3 "
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundColorInput,
                borderRadius: 8,
              }}
            >
              <p
                className="font-bold"
                style={{
                  color: textColorInput,
                }}
              >
                {nameInput}
              </p>
            </article>
          </div>
        )}
        <button
          type="submit"
          className=" mb-7 bg-blue-600 h-9 rounded-md text-white font-bold gap-4 flex justify-center items-center"
        >
          {" "}
          Cadastrar
        </button>
      </form>
      {/*  Criando a parte onde ficara exibindo os links */}
      <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>
      {links.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
          style={{ backgroundColor: link.bg, color: link.color }}
        >
          <p className="font-bold">{link.name}</p>
          <div>
            <button
              className="border border-dashed p-1 rounded bg-gray-500 "
              onClick={() => handleDeleteLink(link.id)}
            >
              <FiTrash size={18} color="#FFF" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default Admin;
