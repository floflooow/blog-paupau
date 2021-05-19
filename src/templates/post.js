import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Post = ({ pageContext }) => {
  console.log(pageContext.post)
  return (
    <Layout>
      <SEO title="Post" />
      <div className="flex flex-col w-9/12 mx-auto mt-12 mb-6">
        <p className="bg-beige text-xxs px-2 w-max text-rouille font-thin font-sans-serif m-0">
          {pageContext.post.categories.nodes[0].name}
        </p>
        <h2 className="text-4xl font-sans-serif font-bold text-black my-3">
          {pageContext.post.title}
        </h2>
        <div className="flex flex-row flex-no-wrap justify-start items-center w-auto">
          <p className="text-black opacity-50 font-normal font-sans-serif text-xxs ml-0 mb-0 mt-0 mr-2">
            {pageContext.post.date}
          </p>
          <div className="flex flex-row flex-no-wrap items-center">
            <StaticImage
              src="../images/comments-black.svg"
              width={16}
              height={16}
              className="mr-1 opacity-50"
              quality={100}
              formats={["AUTO", "WEBP", "AVIF"]}
              alt="Nombre de commentaires"
            />
            <p className="text-black opacity-50 font-normal font-sans-serif text-xxs m-0">
              {pageContext.post.commentCount
                ? pageContext.post.commentCount
                : 0}
            </p>
          </div>
        </div>
        <div className="w-full flex flex-row flex-no-wrap">
          <div className="w-8/12 my-9 pr-20 flex flex-col border-r border-rouille border-opacity-20">
            <GatsbyImage
              alt={pageContext.post.featuredImage.node.altText}
              image={
                pageContext.post.featuredImage.node.localFile.childImageSharp
                  .gatsbyImageData
              }
            ></GatsbyImage>
          </div>
          <div className="w-4/12 pl-20 my-9 flex flex-col">
            <div className="w-full bg-beige px-6">
              <div className="w-10/12 mx-auto flex flex-col pt-6 pb-4">
                <StaticImage
                  src="../images/paupau_presentation.jpg"
                  height={160}
                  className="rounded-full"
                  quality={100}
                  formats={["AUTO", "WEBP", "AVIF"]}
                  alt="Pauline LOISEAU"
                />
              </div>
              <p className="font-thin font-serif text-sm text-black mb-1">
                Pauline Loiseau
              </p>
              <p className="font-thin font-sans-serif text-xxs text-black opacity-75 leading-3">
                Je suis Pauline, j'ai 20 ans, rédactrice de mon propre blog mode
                et lifestyle, L'armoire de Pauline. Sur celui-ci, je partage mes
                coups de cœur mode, beauté et lifestyle. Bonne lecture.
              </p>
            </div>
            <h3 className="text-sm font-sans-serif font-bold text-black text-center mt-6 mb-3">
              Suivez moi sur mes réseaux
            </h3>
            <div className="flex flex-row flex-no-wrap mx-auto">
              <StaticImage
                src="../images/instagram.svg"
                width={28}
                className=""
                quality={95}
                formats={["AUTO", "WEBP", "AVIF"]}
                alt="Instagram Logo"
              />
              <StaticImage
                src="../images/pinterest.svg"
                width={28}
                className="ml-3 mr-2"
                quality={95}
                formats={["AUTO", "WEBP", "AVIF"]}
                alt="Pinterest Logo"
              />
              <StaticImage
                src="../images/facebook.svg"
                width={28}
                className=""
                quality={95}
                formats={["AUTO", "WEBP", "AVIF"]}
                alt="Facebook Logo"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Post
