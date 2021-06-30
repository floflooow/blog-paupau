import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.css"
import Footer from "./footer"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      localSearchAllContent {
        index
        store
      }
    }
  `)
  return (
    <div className="relative w-full min-h-screen">
      <Header
        layoutChildren={children}
        searchData={data.localSearchAllContent}
        siteTitle={data.site.siteMetadata?.title || `Title`}
      ></Header>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
