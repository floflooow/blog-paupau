import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import DerniersArticles from "../components/derniersArticles"
import ModeDerniersArticles from "../components/modeDerniersArticles"
import LooksDuJour from "../components/looksDuJour"
import Outfits from "../components/outfits"
import BeauteDerniersArticles from "../components/beauteDerniersArticles"
import { useWindowSize } from "../components/useWindowSize/useWindowSize"

const IndexPage = () => {
  const [width] = useWindowSize()
  return (
    <Layout>
      <Seo
        description="L'armoire de Pauline, un blog mode, beauté et lifestyle (food, bons plans, voyages et bonnes adresses) crée et tenu par Pauline Loiseau."
        title="L'armoire de Pauline - Blog mode et lifestyle"
      />
      {width <= 640 ? null : (
        <h2 className="text-3xl font-sans-serif font-thin text-rouille">
          Mes derniers articles
        </h2>
      )}
      <DerniersArticles />
      <ModeDerniersArticles />
      <Outfits />
      <LooksDuJour />
      <BeauteDerniersArticles />
    </Layout>
  )
}

export default IndexPage
