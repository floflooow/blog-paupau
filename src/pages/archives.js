import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Archives = () => {
  const data = useStaticQuery(graphql`
    query Archives {
      allWpPost(
        sort: { fields: date, order: DESC }
        filter: {
          categories: {
            nodes: {
              elemMatch: {
                slug: { in: ["mode", "lifestyle", "voyages", "food", "beaute"] }
              }
            }
          }
        }
      ) {
        nodes {
          categories {
            nodes {
              name
              slug
            }
          }
          commentCount
          date(formatString: "DD MMMM YYYY", locale: "fr-FR")
          title
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    jpgOptions: { quality: 100 }
                    layout: FULL_WIDTH
                  )
                }
              }
              altText
            }
          }
          uri
        }
      }
    }
  `)
  const [showMoreCount, setShowMoreCount] = useState(12)
  let allArticle = data.allWpPost.nodes
  let finalArrayArticle = allArticle.slice(0, showMoreCount)
  let othersArticle = allArticle.slice(showMoreCount)
  return (
    <Layout>
      <Seo title="Archives" />
      <h2 className="text-4xl font-sans-serif font-thin text-center text-rouille m-0">
        Archives
      </h2>
      <div className="w-full grid grid-cols-4 gap-6 mt-6">
        {finalArrayArticle.map((article, key) => {
          return (
            <Link
              className="imageContainer relative flex flex-col"
              key={key}
              to={`/${article.categories.nodes[0].slug}${article.uri}`}
            >
              <div className="h-full">
                <GatsbyImage
                  className="imageWithoutFullHeight h-80/100"
                  alt={article.altText}
                  image={
                    article.featuredImage.node.localFile.childImageSharp
                      .gatsbyImageData
                  }
                ></GatsbyImage>
                <p className="text-black font-light font-sans-serif text-xl mx-0 mb-0 mt-3">
                  {article.title}
                </p>
                <div className="flex flex-row flex-no-wrap justify-start items-center w-auto">
                  <p className="text-black opacity-50 font-normal font-sans-serif text-xxs ml-0 mb-0 mt-0 mr-2">
                    {article.date}
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
                      {article.commentCount ? article.commentCount : 0}
                    </p>
                  </div>
                </div>
                <p className="absolute top-0 shadow-sm right-0 px-3 bg-white text-black font-sans-serif uppercase text-xxs">
                  {article.categories.nodes[0].name}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
      {othersArticle.length > 0 && (
        <div className="w-full flex justify-center">
          <button
            onClick={() => setShowMoreCount(showMoreCount + 12)}
            className="flex mt-3 mx-auto text-sm text-rouille font-thin font-serif hoverBorder"
          >
            Voir plus d'articles
          </button>
        </div>
      )}
    </Layout>
  )
}

export default Archives
