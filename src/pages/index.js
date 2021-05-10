import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import DerniersArticles from "../components/derniersArticles"
import ModeDerniersArticles from "../components/modeDerniersArticles"
import LooksDuJour from "../components/looksDuJour"
import Outfits from "../components/outfits"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h2 className="text-3xl font-sans-serif font-thin text-rouille">
      Mes derniers articles
    </h2>
    <DerniersArticles />
    <ModeDerniersArticles />
    <Outfits />
    <div className="mx-9 border-b border-rouille border-opacity-25"></div>
    <LooksDuJour />
  </Layout>
)

export default IndexPage
