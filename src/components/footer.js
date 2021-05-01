import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Footer = () => (
  <footer className="flex flex-col w-full pt-9">
    <div className="flex flex-row flex-no-wrap justify-between items-center w-full px-9 bg-beige py-3">
      <div className="w-1/3 flex flex-col items-center justify-center my-9 border-r border-rouille border-opacity-25">
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
      <div className="w-1/3 flex flex-col items-center justify-center my-9 border-r border-rouille border-opacity-25">
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
      <div className="w-1/3 flex flex-col items-center justify-center my-9">
        <p className="font-serif text-sm font-light text-rouille my-1">
          À propos
        </p>
        <p className="ont-serif text-sm font-light text-rouille my-1">
          Archives
        </p>
        <p className="font-serif text-sm font-light text-rouille my-1">
          Mentions légales
        </p>
      </div>
    </div>
    <div className="flex flex-row justify-between items-center mx-9 my-1">
      <p className="font-serif text-xxs font-light my-1">
        Blog mode et lifestyle par Pauline Loiseau
      </p>
      <p className="font-serif text-xxs font-light my-1">
        2021 &copy; Tous droits réservés &#124; Florian Triboulin
      </p>
    </div>
  </footer>
)

export default Footer
