import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import { useWindowSize } from "./useWindowSize/useWindowSize"

const BeauteDerniersArticles = () => {
  const [width] = useWindowSize()
  const data = useStaticQuery(graphql`
    query beauteDerniersArticles {
      allWpPost(
        limit: 3
        sort: { fields: date, order: DESC }
        filter: {
          categories: { nodes: { elemMatch: { slug: { eq: "beaute" } } } }
        }
      ) {
        nodes {
          categories {
            nodes {
              name
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
  let articleList = data.allWpPost.nodes
  return (
    <div className="flex flex-col sm:pt-16 sm:pb-12 sm:px-20 sm:-mx-9">
      <div className="relative flex sm:pt-16 sm:pb-12 sm:px-20 sm:-mx-9 flex-col sm:flex-row sm:flex-no-wrap justify-between items-center">
        <div className="transform -rotate-90 absolute -left-24 top-28 sm:block hidden">
          <h3 className="text-4xl font-sans-serif font-thin text-center text-rouille m-0">
            Articles de beauté
          </h3>
        </div>
        <h3 className="text-4xl mt-6 font-sans-serif font-thin text-center text-rouille m-0 block sm:hidden">
          Articles de beauté
        </h3>
        <div className="flex flex-row flex-wrap sm:flex-no-wrap w-full">
          {articleList.map((article, key) => (
            <Link
              className="imageContainer relative sm:w-30/100 w-11/12 mx-auto mt-6 sm:mt-0 flex flex-col"
              key={key}
              to={`/beaute${article.uri}`}
            >
              <div className="h-full">
                <GatsbyImage
                  className="imageWithoutFullHeight h-80/100"
                  alt={article.featuredImage.node.altText}
                  image={
                    article.featuredImage.node.localFile.childImageSharp
                      .gatsbyImageData
                  }
                ></GatsbyImage>
                <p className="text-black font-light font-sans-serif sm:text-xl text-2xl mx-0 sm:mb-0 mb-2 sm:mt-3 mt-4">
                  {article.title}
                </p>
                <div className="flex flex-row flex-no-wrap justify-start items-center w-auto">
                  <p className="text-black opacity-50 font-normal font-sans-serif sm:text-xxs text-base ml-0 mb-0 mt-0 mr-2">
                    {article.date}
                  </p>
                  <div className="flex flex-row flex-no-wrap items-center">
                    {width <= 640 ? (
                      <StaticImage
                        src="../images/comments-black.svg"
                        width={24}
                        height={24}
                        className="mr-1 opacity-50"
                        quality={100}
                        formats={["AUTO", "WEBP", "AVIF"]}
                        alt="Nombre de commentaires"
                      />
                    ) : (
                      <StaticImage
                        src="../images/comments-black.svg"
                        width={16}
                        height={16}
                        className="mr-1 opacity-50"
                        quality={100}
                        formats={["AUTO", "WEBP", "AVIF"]}
                        alt="Nombre de commentaires"
                      />
                    )}
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
          ))}
        </div>
        <div className="transform rotate-90 absolute -right-24 bottom-28 sm:block hidden">
          <h3 className="text-4xl font-sans-serif font-thin text-center text-rouille m-0">
            Articles de beauté
          </h3>
        </div>
      </div>
      <Link
        className="flex mt-3 mx-auto text-sm text-rouille font-thin font-serif hoverBorder"
        to="/beaute"
      >
        Voir tout
      </Link>
    </div>
  )
}

export default BeauteDerniersArticles
