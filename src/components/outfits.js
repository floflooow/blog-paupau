import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import parse, { domToReact } from "html-react-parser"
import { GatsbyImage } from "gatsby-plugin-image"

const Outfits = () => {
  const data = useStaticQuery(graphql`
    query outfits {
      allWpPost(
        limit: 3
        sort: { fields: date, order: DESC }
        filter: {
          categories: { nodes: { elemMatch: { slug: { eq: "outfits" } } } }
        }
      ) {
        nodes {
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
          content
        }
      }
    }
  `)
  let articleList = data.allWpPost.nodes
  const options = {
    trim: true,
    replace: domNode => {
      if (domNode.name === "a") {
        return (
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-rouille text-center font-sans-serif font-light"
            href={domNode.attribs.href}
          >
            {domToReact(domNode.children, options)}
          </a>
        )
      }
      if (domNode.name === "p") {
        return (
          <p className="text-xs font-sans-serif text-center text-black font-light leading-tight m-0">
            {domToReact(domNode.children, options)}
          </p>
        )
      }
    },
  }
  return (
    <div className="flex flex-col pt-16 pb-12 px-20 -mx-9">
      <div className="relative flex pt-16 pb-12 px-20 -mx-9 flex-row flex-no-wrap justify-between items-center">
        <div className="transform -rotate-90 absolute left-0 bottom-8">
          <h3 className="text-4xl font-sans-serif font-thin text-center text-rouille m-0">
            Outfits
          </h3>
        </div>
        <div className="flex flex-row flex-no-wrap w-full mt-6">
          {articleList.map((article, key) => (
            <div
              key={key}
              className="imageContainer relative w-30/100 mx-auto flex flex-col"
            >
              <Link className="h-72/100" to={`/outfits${article.uri}`}>
                <GatsbyImage
                  className="imageWithoutFullHeight h-full"
                  alt={article.featuredImage.node.altText}
                  image={
                    article.featuredImage.node.localFile.childImageSharp
                      .gatsbyImageData
                  }
                ></GatsbyImage>
              </Link>
              <div className="w-full flex flex-col bg-beige pt-2 py-9 h-28/100">
                <p className="text-white w-fit font-thin font-sans-serif text-xl mx-auto mt-2 mb-0 py-1 px-2 rounded-sm bg-rouille bg-opacity-75">
                  {article.title}
                </p>
                <div className="w-full px-6 mt-2 flex flex-col mx-auto items-center">
                  {parse(article.content, options)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="transform rotate-90 absolute right-0 top-16">
          <h3 className="text-4xl font-sans-serif font-thin text-center text-rouille m-0">
            Outfits
          </h3>
        </div>
      </div>
      <Link
        className="flex mt-3 mx-auto text-sm text-rouille font-thin font-serif hoverBorder"
        to="/outfits"
      >
        Voir tout
      </Link>
    </div>
  )
}

export default Outfits
