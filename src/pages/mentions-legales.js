import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import parse, { domToReact } from "html-react-parser"

const MentionsLegales = () => {
  const data = useStaticQuery(graphql`
    query MentionsLegales {
      wpPage(slug: { eq: "mentions-legales" }) {
        content
      }
    }
  `)
  const options = {
    trim: true,
    replace: domNode => {
      if (domNode.name === "a") {
        return (
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-rouille font-sans-serif font-light"
            href={domNode.attribs.href}
          >
            {domToReact(domNode.children, options)}
          </a>
        )
      }
      if (domNode.name === "p") {
        return (
          <p className="text-sm font-sans-serif text-black font-light leading-tight m-0 mb-2">
            {domToReact(domNode.children, options)}
          </p>
        )
      }
      if (domNode.name === "hr") {
        return <hr className="mt-6 mb-4"></hr>
      }
    },
  }
  return (
    <Layout>
      <Seo title="A propos" />
      <h2 className="text-4xl font-sans-serif font-thin text-center text-rouille m-0 mt-3 sm:mt-0">
        Mentions légales
      </h2>
      <div className="w-11/12 sm:w-full mx-auto my-3">
        {parse(data.wpPage.content, options)}
      </div>
    </Layout>
  )
}

export default MentionsLegales
