import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const BeauteDerniersArticles = () => {
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
                  fixed(quality: 100) {
                    src
                  }
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
    <div className="flex flex-col pt-16 pb-12 px-20 -mx-9">
      <div className="relative flex pt-16 pb-12 px-20 -mx-9 flex-row flex-no-wrap justify-between items-center">
        <div className="transform -rotate-90 absolute -left-24 top-28">
          <h3 className="text-4xl font-sans-serif font-thin text-center text-rouille m-0">
            Articles de beauté
          </h3>
        </div>
        <div className="flex flex-row flex-no-wrap w-full">
          {articleList.map((article, key) => (
            <Link
              className="imageContainer relative w-30/100 mx-auto flex flex-col"
              key={key}
              to={`/mode${article.uri}`}
            >
              <div className="h-full">
                <img
                  className="imageWithoutFullHeight h-80/100"
                  alt={article.altText}
                  src={
                    article.featuredImage.node.localFile.childImageSharp.fixed
                      .src
                  }
                ></img>
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
          ))}
        </div>
        <div className="transform rotate-90 absolute -right-24 bottom-28">
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
