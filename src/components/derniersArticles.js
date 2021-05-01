import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const DerniersArticles = () => {
  const data = useStaticQuery(graphql`
    query derniersArticles {
      allWpPost(limit: 5, sort: { fields: date, order: DESC }) {
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
        }
      }
    }
  `)
  let firstArticle = data.allWpPost.nodes[0]
  let othersArticles = data.allWpPost.nodes.slice(1)
  let firstImage = firstArticle.featuredImage.node
  return (
    <div className="flex flex-row flex-no-wrap justify-between items-start w-full">
      <div className="relative w-49/100 h-full h-derniersArticles">
        <img
          className="image"
          alt={firstImage.altText}
          src={firstImage.localFile.childImageSharp.fixed.src}
        ></img>
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
      <div className="w-49/100 flex flex-row flex-wrap justify-between">
        {othersArticles.map((article, key) => (
          <div key={key} className="relative w-49/100 flex flex-col">
            <img
              className="imageWithoutFullHeight h-80/100"
              alt={article.altText}
              src={
                article.featuredImage.node.localFile.childImageSharp.fixed.src
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
        ))}
      </div>
    </div>
  )
}

export default DerniersArticles
