import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useState } from "react"
import { domToReact } from "html-react-parser"
import { StaticImage } from "gatsby-plugin-image"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"

const LooksDuJour = () => {
  const [choosenCategory, setChoosenCategory] = useState("wishlist")
  const data = useStaticQuery(graphql`
    query looksDuJour {
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
      derniers: allWpPost(
        limit: 15
        sort: { fields: date, order: DESC }
        filter: {
          categories: {
            nodes: { elemMatch: { slug: { eq: "derniers-achats" } } }
          }
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
  let wishList = data.wishlist.nodes
  let derniersAchats = data.derniers.nodes
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
    <div className="flex flex-col pt-16 pb-24 px-20 -mx-9 bg-beige">
      <div className="flex flex-row flex-no-wrap items-center justify-between w-5/12 mx-auto">
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
      </div>
      {choosenCategory === "wishlist" ? (
        <div className="flex flex-row flex-no-wrap items-center w-full mt-6">
          <Carousel
            centerMode={true}
            showIndicators={null}
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
            centerSlidePercentage={100 / 3}
            renderArrowPrev={(onClickHandler, hasPrev) =>
              hasPrev && (
                <button
                  type="button"
                  style={{
                    left: 0,
                    position: "absolute",
                    zIndex: 2,
                    top: "calc(50% - 15px)",
                    width: 30,
                    height: 30,
                    cursor: "pointer",
                  }}
                  onClick={onClickHandler}
                >
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
              )
            }
            renderArrowNext={(onClickHandler, hasNext) =>
              hasNext && (
                <button
                  type="button"
                  style={{
                    right: 0,
                    position: "absolute",
                    zIndex: 2,
                    top: "calc(50% - 15px)",
                    width: 30,
                    height: 30,
                    cursor: "pointer",
                  }}
                  onClick={onClickHandler}
                >
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
              )
            }
          >
            {wishList.map((element, key) => {
              let text = element.excerpt.replace(/(<([^>]+)>)/gi, "")
              return (
                <div
                  key={key}
                  className="imageContainer relative w-10/12 mx-auto h-full flex flex-col"
                >
                  <a
                    target="_blank"
                    className="h-full"
                    rel="noopener noreferrer"
                    href={`${text ? text : ""}`}
                  >
                    <img
                      className="image"
                      alt={element.altText}
                      src={
                        element.featuredImage.node.localFile.childImageSharp
                          .fixed.src
                      }
                    ></img>
                  </a>
                </div>
              )
            })}
          </Carousel>
        </div>
      ) : (
        <div className="flex flex-row flex-no-wrap items-center w-full mt-6">
          <Carousel
            centerMode={true}
            showIndicators={null}
            showStatus={false}
            infiniteLoop={true}
            showThumbs={false}
            centerSlidePercentage={100 / 3}
            renderArrowPrev={(onClickHandler, hasPrev) =>
              hasPrev && (
                <button
                  type="button"
                  style={{
                    left: 0,
                    position: "absolute",
                    zIndex: 2,
                    top: "calc(50% - 15px)",
                    width: 30,
                    height: 30,
                    cursor: "pointer",
                  }}
                  onClick={onClickHandler}
                >
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
              )
            }
            renderArrowNext={(onClickHandler, hasNext) =>
              hasNext && (
                <button
                  type="button"
                  style={{
                    right: 0,
                    position: "absolute",
                    zIndex: 2,
                    top: "calc(50% - 15px)",
                    width: 30,
                    height: 30,
                    cursor: "pointer",
                  }}
                  onClick={onClickHandler}
                >
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
              )
            }
          >
            {derniersAchats.map((element, key) => {
              let text = element.excerpt.replace(/(<([^>]+)>)/gi, "")
              return (
                <div
                  key={key}
                  className="imageContainer relative w-10/12 mx-auto h-full flex flex-col"
                >
                  <a
                    target="_blank"
                    className="h-full"
                    rel="noopener noreferrer"
                    href={`${text ? text : ""}`}
                  >
                    <img
                      className="image"
                      alt={element.altText}
                      src={
                        element.featuredImage.node.localFile.childImageSharp
                          .fixed.src
                      }
                    ></img>
                  </a>
                </div>
              )
            })}
          </Carousel>
        </div>
      )}
    </div>
  )
}

export default LooksDuJour
