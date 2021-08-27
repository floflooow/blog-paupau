import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"

const DerniersArticles = () => {
  const data = useStaticQuery(graphql`
    query derniersArticles {
      allWpPost(
        limit: 5
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
  let firstArticle = data.allWpPost.nodes[0]
  let othersArticles = data.allWpPost.nodes.slice(1)
  let firstImage = firstArticle.featuredImage.node
  return (
    <div className="flex flex-row flex-wrap sm:flex-no-wrap justify-between items-start w-full">
      <Link
        className="imageContainer relative sm:w-49/100 w-full h-full h-derniersArticles"
        to={`/${firstArticle.categories.nodes[0].slug}${firstArticle.uri}`}
      >
        <div className="h-full">
          <GatsbyImage
            className="image imageLowBright"
            alt={firstImage.altText}
            image={firstImage.localFile.childImageSharp.gatsbyImageData}
          ></GatsbyImage>
          <p className="absolute bottom-56 left-9 text-white font-light font-sans-serif text-3xl m-0">
            {firstArticle.title}
          </p>
          <div className="flex flex-row flex-no-wrap justify-start items-center w-auto absolute bottom-48 left-9">
            <p className="text-white text-opacity-75 font-normal font-sans-serif text-xxs ml-0 mb-0 mt-0 mr-2">
              {firstArticle.date}
            </p>
            <div className="flex flex-row flex-no-wrap items-center">
              <StaticImage
                src="../images/comments.svg"
                width={16}
                height={16}
                className="mr-1 opacity-75"
                quality={100}
                formats={["AUTO", "WEBP", "AVIF"]}
                alt="Nombre de commentaires"
              />
              <p className="text-white text-opacity-75 font-normal font-sans-serif text-xxs m-0">
                {firstArticle.commentCount ? firstArticle.commentCount : 0}
              </p>
            </div>
          </div>
          <p className="absolute top-0 shadow-sm right-0 px-3 bg-white text-black font-sans-serif uppercase text-xxs">
            {firstArticle.categories.nodes[0].name}
          </p>
        </div>
      </Link>
      <div className="sm:w-49/100 w-full flex flex-row flex-wrap justify-between p-3 sm:p-0">
        {othersArticles.map((article, key) => (
          <Link
            key={key}
            className="imageContainer relative w-49/100 flex flex-col"
            to={`/${article.categories.nodes[0].slug}${article.uri}`}
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
    </div>
  )
}

export default DerniersArticles
