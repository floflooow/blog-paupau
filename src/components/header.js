import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <>
  <div className="w-full flex flex-row flex-no-wrap justify-end">
    <p className="text-black mr-2">A propos</p>
    <p className="text-black mr-2">Archives</p>
    <p className="text-black mr-2">S'inscrire à la newsletter</p>
    <div className="flex flex-row flex-no-wrap"></div>
  </div>
  <header
    className="flex flex-row flex-no-wrap justify-between w-full"
  >
    <div
     className="w-2/12 flex justify-center items-center"
    >
      <h1 className="text-black mr-2">
        <Link
          to="/"
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
    <div className="w-6/12 flex flex-row flex-no-wrap justify-between">
      <p className="text-black">TestMAC</p>
      <p className="text-black">Test</p>
      <p className="text-black">Test</p>
      <p className="text-black">Test</p>
      <p className="text-black">Test</p>
    </div>
  </header>
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
