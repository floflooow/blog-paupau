import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import DerniersArticles from "../components/derniersArticles"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h2 className="font-sans-serif font-bold text-black">
      Mes derniers articles
    </h2>
    <DerniersArticles />
  </Layout>
)

export default IndexPage
