import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import DerniersArticles from "../components/derniersArticles"
import ModeDerniersArticles from "../components/modeDerniersArticles"
import LooksDuJour from "../components/looksDuJour"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h2 className="font-sans-serif font-bold text-black">
      Mes derniers articles
    </h2>
    <DerniersArticles />
    <ModeDerniersArticles />
    <LooksDuJour />
  </Layout>
)

export default IndexPage
