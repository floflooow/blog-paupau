import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Obfuscate from "react-obfuscate"

const APropos = () => (
  <Layout>
    <Seo title="A propos" />
    <div className="w-10/12 sm:w-9/12 mx-auto grid sm:grid-cols-2 sm:gap-12 mt-12">
      <div className="w-full">
        <StaticImage
          src="../images/paupau_presentation.jpg"
          layout="fullWidth"
          quality={100}
          formats={["AUTO", "WEBP", "AVIF"]}
          alt="Pauline LOISEAU"
        />
      </div>
      <div className="w-full h-full flex flex-col justify-center mt-6 sm:mt-0">
        <p className="text-2xl font-bold text-black font-sans-serif">
          Je suis Pauline, 20 ans, créatrice et rédactrice de mon blog mode et
          lifestyle : L'armoire de Pauline.
        </p>
        <p className="text-black text-sm font-sans-serif">
          Sur ce blog, je partage des articles sur différent sujets qui me
          passionnent, notamment des articles de mode, beauté et lifestyle
          (food, bons plans, déco, voyages, culture…).
        </p>
      </div>
    </div>
    <div className="w-10/12 sm:w-9/12 mx-auto bg-beige px-8 py-16 flex flex-col mt-6">
      <h3 className="text-xl text-rouille font-sans-serif font-thin mb-2">
        Une demande de collaborations ou de partenariats ? C'est par ici :
      </h3>
      <div className="w-min">
        <Obfuscate
          className="text-sm font-sans-serif font-thin"
          email="linepau2986@gmail.com"
        />
      </div>
    </div>
  </Layout>
)

export default APropos
