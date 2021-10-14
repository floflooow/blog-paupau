import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Footer = () => (
  <footer className="flex flex-col w-full pt-9">
    <div className="flex flex-col sm:flex-row sm:flex-no-wrap sm:justify-between items-center w-full px-9 bg-beige py-3">
      <div className="w-full sm:w-1/3 sm:flex hidden flex-row sm:flex-col items-center justify-center sm:my-9 sm:border-r sm:border-rouille sm:border-opacity-25">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/larmoiredepauline__/"
        >
          <div className="flex flex-row justify-center items-center my-1">
            <StaticImage
              src="../images/instagram.svg"
              width={16}
              className="mr-2"
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Instagram Logo"
            />
            <p className="text-rouille font-serif text-sm m-0">
              @larmoiredepauline__
            </p>
          </div>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.pinterest.fr/larmoiredepauline/"
        >
          <div className="flex flex-row justify-center items-center my-1">
            <StaticImage
              src="../images/pinterest.svg"
              width={16}
              className="mr-2"
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Pinterest Logo"
            />
            <p className="text-rouille font-serif text-sm m-0">
              L'armoire de Pauline
            </p>
          </div>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/profile.php?id=100072022658768"
        >
          <div className="flex flex-row justify-center items-center my-1">
            <StaticImage
              src="../images/facebook.svg"
              width={16}
              className="mr-2"
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Facebook Logo"
            />
            <p className="text-rouille font-serif text-sm m-0">
              L'armoire de Pauline
            </p>
          </div>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.tiktok.com/@larmoiredepauline"
        >
          <div className="flex flex-row justify-center items-center my-1">
            <StaticImage
              src="../images/tik-tok.svg"
              width={16}
              className="mr-2"
              quality={95}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Tiktok Logo"
            />
            <p className="text-rouille font-serif text-sm m-0">
              @larmoiredepauline
            </p>
          </div>
        </a>
      </div>
      <div className="sm:w-1/3 flex flex-col items-center justify-center sm:my-9 mb-3 sm:border-r sm:border-rouille sm:border-opacity-25">
        <Link to="/">
          <StaticImage
            src="../images/logo_par_default.png"
            width={100}
            quality={95}
            formats={["AUTO", "WEBP", "AVIF"]}
            alt="Logo L'armoire de Pauline"
          />
        </Link>
      </div>
      <div className="w-full sm:w-1/3 sm:hidden flex flex-col items-center justify-center sm:my-9 py-6 sm:border-r border-rouille border sm:border-opacity-25">
        <div className="flex flex-row justify-center items-center my-1">
          <StaticImage
            src="../images/instagram.svg"
            width={16}
            className="mr-2"
            quality={95}
            formats={["AUTO", "WEBP", "AVIF"]}
            alt="Instagram Logo"
          />
          <p className="text-rouille font-serif text-sm m-0">
            @larmoiredepauline
          </p>
        </div>
        <div className="flex flex-row justify-center items-center my-1">
          <StaticImage
            src="../images/pinterest.svg"
            width={16}
            className="mr-2"
            quality={95}
            formats={["AUTO", "WEBP", "AVIF"]}
            alt="Pinterest Logo"
          />
          <p className="text-rouille font-serif text-sm m-0">
            @larmoiredepauline
          </p>
        </div>
        <div className="flex flex-row justify-center items-center my-1">
          <StaticImage
            src="../images/facebook.svg"
            width={16}
            className="mr-2"
            quality={95}
            formats={["AUTO", "WEBP", "AVIF"]}
            alt="Facebook Logo"
          />
          <p className="text-rouille font-serif text-sm m-0">
            @larmoiredepauline
          </p>
        </div>
      </div>
      <div className="w-full sm:w-1/3 flex flex-row sm:flex-col items-center justify-between sm:justify-center sm:my-9 mt-3">
        <Link
          to="/a-propos"
          className="font-serif text-sm font-light text-rouille my-1"
        >
          À propos
        </Link>
        <Link
          to="/mentions-legales"
          className="font-serif text-sm font-light text-rouille my-1 block sm:hidden"
        >
          Mentions légales
        </Link>
        <Link
          to="/archives"
          className="font-serif text-sm font-light text-rouille my-1"
        >
          Archives
        </Link>

        <Link
          to="/mentions-legales"
          className="font-serif text-sm font-light text-rouille my-1 hidden sm:block"
        >
          Mentions légales
        </Link>
        <Link
          to="/confidentialite"
          className="font-serif text-sm font-light text-rouille my-1 hidden sm:block"
        >
          Confidentialité
        </Link>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row flex-wrap justify-end sm:justify-between items-center sm:mx-9 mx-3 my-1">
      <p className="font-serif text-xxs font-light my-0 sm:my-1">
        Blog mode et lifestyle par Pauline Loiseau
      </p>
      <p className="font-serif text-xxs font-light my-0 sm:my-1">
        2021 &copy; Tous droits réservés &#124; Florian Triboulin
      </p>
    </div>
  </footer>
)

export default Footer
