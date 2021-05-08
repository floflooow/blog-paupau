import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { useState } from "react"
import parse, { domToReact } from "html-react-parser"
import Carousel, {
  slidesToShowPlugin,
  arrowsPlugin,
} from "@brainhubeu/react-carousel"
import "@brainhubeu/react-carousel/lib/style.css"
import { StaticImage } from "gatsby-plugin-image"

const LooksDuJour = () => {
  const [choosenCategory, setChoosenCategory] = useState("outfits")
  const data = useStaticQuery(graphql`
    query looksDuJour {
      outfits: allWpPost(
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
                  fixed(quality: 100) {
                    src
                  }
                }
              }
              altText
            }
          }
          uri
          content
        }
      }
      wishlist: allWpPost(
        limit: 15
        sort: { fields: date, order: DESC }
        filter: {
          categories: { nodes: { elemMatch: { slug: { eq: "wishlist" } } } }
        }
      ) {
        nodes {
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
          excerpt
        }
      }
    }
  `)
  let articleList = data.outfits.nodes
  let wishList = data.wishlist.nodes
  let arrayElement = wishList.map((element, key) => {
    let text = element.excerpt.replace(/(<([^>]+)>)/gi, "")
    return (
      <div
        key={key}
        className="imageContainer relative w-11/12 mx-auto flex flex-col"
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${text ? text : ""}`}
        >
          <img
            className="imageWithoutFullHeight h-80/100"
            alt={element.altText}
            src={element.featuredImage.node.localFile.childImageSharp.fixed.src}
          ></img>
        </a>
      </div>
    )
  })
  console.log(arrayElement)
  const options = {
    trim: true,
    replace: domNode => {
      if (domNode.name === "a") {
        return (
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-rouille font-sans-serif font-light"
            href={domNode.attribs.href}
          >
            {domToReact(domNode.children, options)}
          </a>
        )
      }
      if (domNode.name === "p") {
        return (
          <p className="text-xs font-sans-serif text-black font-light leading-tight m-0">
            {domToReact(domNode.children, options)}
          </p>
        )
      }
    },
  }

  return (
    <div className="flex flex-col pt-16 pb-12 px-20 -mx-9">
      <div className="flex flex-row flex-no-wrap items-center justify-between w-5/12 mx-auto">
        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => setChoosenCategory("outfits")}
          onClick={() => setChoosenCategory("outfits")}
          className={`text-xl font-serif font-thin ${
            choosenCategory === "outfits"
              ? "text-rouille underline"
              : "text-gray opacity-50"
          } cursor-pointer`}
        >
          Outfits
        </div>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => setChoosenCategory("derniers")}
          onClick={() => setChoosenCategory("derniers")}
          className={`text-xl font-serif font-thin ${
            choosenCategory === "derniers"
              ? "text-rouille underline"
              : "text-gray opacity-50"
          } cursor-pointer`}
        >
          Derniers achats
        </div>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => setChoosenCategory("wishlist")}
          onClick={() => setChoosenCategory("wishlist")}
          className={`text-xl font-serif font-thin ${
            choosenCategory === "wishlist"
              ? "text-rouille underline"
              : "text-gray opacity-50"
          } cursor-pointer`}
        >
          Wishlist
        </div>
      </div>
      {choosenCategory === "outfits" ? (
        <>
          <div className="flex flex-row flex-no-wrap items-center w-full mt-6">
            {articleList.map((article, key) => (
              <div
                key={key}
                className="imageContainer relative w-30/100 mx-auto flex flex-col"
              >
                <Link to={`/outfits${article.uri}`}>
                  <img
                    className="imageWithoutFullHeight h-80/100"
                    alt={article.altText}
                    src={
                      article.featuredImage.node.localFile.childImageSharp.fixed
                        .src
                    }
                  ></img>
                </Link>
                <div className="w-full flex flex-col bg-beige pt-2 py-9 h-40">
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
          <Link
            className="flex mt-6 mx-auto text-sm text-rouille font-thin font-serif hoverBorder"
            to="/outfits"
          >
            Voir tout
          </Link>
        </>
      ) : choosenCategory === "wishlist" ? (
        <div className="flex flex-row flex-no-wrap items-center w-full mt-6">
          <Carousel
            slides={arrayElement}
            plugins={[
              {
                resolve: arrowsPlugin,
                options: {
                  arrowLeft: (
                    <button>
                      <StaticImage
                        src="../images/next.svg"
                        width={16}
                        height={16}
                        className="transform rotate-180"
                        quality={100}
                        formats={["AUTO", "WEBP", "AVIF"]}
                        alt="arrow-left"
                      />
                    </button>
                  ),

                  arrowRight: (
                    <button>
                      <StaticImage
                        src="../images/next.svg"
                        width={16}
                        height={16}
                        className=""
                        quality={100}
                        formats={["AUTO", "WEBP", "AVIF"]}
                        alt="arrow-left"
                      />
                    </button>
                  ),
                  addArrowClickHandler: true,
                },
              },
              "infinite",
              {
                resolve: slidesToShowPlugin,
                options: {
                  numberOfSlides: 3,
                },
              },
            ]}
          />
        </div>
      ) : null}
    </div>
  )
}

export default LooksDuJour
