import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Header = ({ siteTitle }) => (
  <>
    <div className="w-full flex flex-row flex-no-wrap justify-end items-center bg-beige bg-opacity-75 px-9">
      <p className="text-black font-serif text-xxs font-light text-rouille mr-2 mb-0">
        A propos
      </p>
      <p className="text-black font-serif text-xxs font-light text-rouille mr-2 mb-0">
        Archives
      </p>
      <p className="text-black font-serif text-xxs font-light text-rouille mr-2 mb-0">
        S'inscrire à la newsletter
      </p>
      <div className="flex flex-row flex-no-wrap ml-2 pl-2 border-l border-rouille my-2">
        <StaticImage
          src="../images/instagram.svg"
          width={12}
          className="mx-1"
          quality={95}
          formats={["AUTO", "WEBP", "AVIF"]}
          alt="Instagram Logo"
        />
        <StaticImage
          src="../images/pinterest.svg"
          width={12}
          className="mx-1"
          quality={95}
          formats={["AUTO", "WEBP", "AVIF"]}
          alt="Pinterest Logo"
        />
        <StaticImage
          src="../images/facebook.svg"
          width={12}
          className="mx-1"
          quality={95}
          formats={["AUTO", "WEBP", "AVIF"]}
          alt="Facebook Logo"
        />
      </div>
    </div>
    <header className="flex flex-row flex-no-wrap justify-between items-center w-full px-9 my-9">
      <div className="w-2/12 flex justify-start items-center">
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
      <div className="w-4/12 flex flex-row flex-no-wrap justify-between items-center mr-1">
      <Link to="/shopping">
        <p className="text-black font-sans-serif text-xs uppercase mb-0">
          Shopping
        </p>
        </Link>
        <Link to="/mode">
        <p className="text-black font-sans-serif text-xs uppercase mb-0">
          Mode
        </p>
        </Link>
        <Link to="/beaute">
        <p className="text-black font-sans-serif text-xs uppercase mb-0">
          Beauté
        </p>
        </Link>
        <Link to="/lifestyle">
        <p className="text-black font-sans-serif text-xs uppercase mb-0">
          Lifestyle
        </p>
        </Link>
        <Link to="/food">
        <p className="text-black font-sans-serif text-xs uppercase mb-0">
          Food
        </p>
        </Link>
        <Link to="/voyages">
        <p className="text-black font-sans-serif text-xs uppercase mb-0">
          Voyages
        </p>
        </Link>
        <StaticImage
          src="../images/loupe.svg"
          width={24}
          height={24}
          className="ml-2"
          quality={95}
          layout="fixed"
          formats={["AUTO", "WEBP", "AVIF"]}
          alt="Loupe recherche"
        />
      </div>
    </header>
    <div className="mx-9 border-b border-rouille border-opacity-25"></div>
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
