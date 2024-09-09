import { useEffect, useState } from "react";

import { Social } from "../../components/Social";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { db } from "../../services/firebaseConnection";
import {
  getDocs, // vai trazer uma lista de items
  collection,
  orderBy,
  query,
  doc,
  getDoc, // acessar apenas os links especificos
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}
interface SocialLinksProps {
  facebook: string;
  youtube: string;
  instagram: string;
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]); // state que traz todos os links
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>(); // state que traz apenas os links das redes sociais

  // quando entrar na pagina sera exibido os links cadastrados
  useEffect(() => {
    const loadLinks = () => {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));
      getDocs(queryRef).then((snapshot) => {
        const lista = [] as LinkProps[];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
          });
        });
        setLinks(lista);
      });
    };
    loadLinks();
  }, []);

  // esse outro useEffect ira buscar os links das redes sociais nos icones

  useEffect(() => {
    const loadSocialLinks = () => {
      const docRef = doc(db, "social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            youtube: snapshot.data()?.youtube,
          });
        }
      });
    };
    loadSocialLinks();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20 ">
        Dev Matth
      </h1>
      <span className="text-gray-50 mb-5 mt-3 ">Veja meus links 👇</span>

      {/* area principal do site, onde terao os links  */}
      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            style={{ backgroundColor: link.bg }}
            key={link.id}
            className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
          >
            <a href={link.url} target="_blank">
              <p
                className="text-base md:text-lg  font-bold"
                style={{ color: link.color }}
              >
                {link.name}
              </p>
            </a>
          </section>
        ))}

        {/* verificando se o socialLinks nao é undefined, depois com o object.keys verifica se há alguma propriedade dentro do socialLinks e ela é maior que 0,se tiver alguma propriedade renderizamos ela na tela */}
        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            {/* O compomente social nao espera receber a url e o children, entao precisamos ir la na pagina do compomente e criar uma interface para poder receber eles */}
            <Social url={socialLinks?.facebook}>
              <FaFacebook size={35} color="#FFFF" />
            </Social>
            <Social url={socialLinks?.youtube}>
              <FaYoutube size={35} color="#FFFF " />
            </Social>
            <Social url={socialLinks?.instagram}>
              <FaInstagram size={35} color="#FFFF" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
}

export default Home;
