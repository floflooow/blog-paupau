import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import parse, { domToReact } from "html-react-parser"
import { graphql } from "gatsby"

const formatStringToCamelCase = str => {
  const splitted = str.split("-")
  if (splitted.length === 1) return splitted[0]
  return (
    splitted[0] +
    splitted
      .slice(1)
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join("")
  )
}

const getStyleObjectFromString = str => {
  const style = {}
  str.split(";").forEach(el => {
    const [property, value] = el.split(":")
    if (!property) return

    const formattedProperty = formatStringToCamelCase(property.trim())
    style[formattedProperty] = value.trim()
  })

  return style
}

export const pageQuery = graphql`
  query($slug: String) {
    allWpPost(filter: { slug: { eq: $slug } }) {
      nodes {
        categories {
          nodes {
            name
            slug
          }
        }
        title
        commentCount
        commentStatus
        comments {
          nodes {
            author {
              node {
                name
              }
            }
            date(locale: "fr-FR", formatString: "DD  MMMM YYYY")
          }
        }
        date(locale: "fr-FR", formatString: "DD  MMMM YYYY")
        excerpt
        content
        slug
        tags {
          nodes {
            name
          }
        }
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
      }
    }
  }
`

const Post = ({ data }) => {
  let pageData = data.allWpPost.nodes[0]
  const options = {
    trim: true,
    replace: domNode => {
      if (domNode.name === "a") {
        return (
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-rouille font-sans-serif underline"
            href={domNode.attribs.href}
          >
            {domToReact(domNode.children, options)}
          </a>
        )
      }
      if (domNode.name === "h2") {
        return (
          <h2 className="text-2xl text-black font-sans-serif font-bold mb-4">
            {domToReact(domNode.children, options)}
          </h2>
        )
      }
      if (domNode.name === "h3") {
        return (
          <h3 className="text-xl text-black font-sans-serif font-bold mb-4">
            {domToReact(domNode.children, options)}
          </h3>
        )
      }
      if (domNode.name === "h4") {
        return (
          <h4 className="text-lg text-black font-sans-serif font-bold mb-4">
            {domToReact(domNode.children, options)}
          </h4>
        )
      }
      if (domNode.name === "p") {
        let className = domNode.attribs?.class
        let alignement
        if (className && className.includes("has-text-align")) {
          alignement = className.split("-")[3]
        }
        return (
          <p
            className={`text-sm font-sans-serif text-${
              alignement ? alignement : "left"
            } text-black font-light leading-tight`}
          >
            {domToReact(domNode.children, options)}
          </p>
        )
      }
      if (
        domNode.name === "span" &&
        domNode.attribs?.class?.includes("has-inline-color")
      ) {
        return (
          <span className="text-rouille">
            {domToReact(domNode.children, options)}
          </span>
        )
      }
      if (
        domNode.name === "span" &&
        domNode.attribs?.class?.includes("gatsby-image-wrapper")
      ) {
        let objectStyle = getStyleObjectFromString(domNode.attribs?.style)
        return (
          <span
            style={objectStyle ? objectStyle : null}
            className="h-full inline-block"
          >
            {domToReact(domNode.children, options)}
          </span>
        )
      }
      if (
        domNode.name === "figure" &&
        domNode.attribs?.class?.includes("wp-block-image")
      ) {
        return (
          <figure className="h-derniersArticles w-full">
            {domToReact(domNode.children, options)}
          </figure>
        )
      }
      if (
        domNode.name === "li" &&
        !domNode.attribs?.class?.includes("blocks-gallery-item")
      ) {
        return (
          <li className="text-sm font-sans-serif text-black font-light leading-tight">
            {domToReact(domNode.children, options)}
          </li>
        )
      }
      if (
        domNode.name === "ul" &&
        !domNode.attribs?.class?.includes("blocks-gallery-grid")
      ) {
        return <ul className="ml-4">{domToReact(domNode.children, options)}</ul>
      }
      if (
        domNode.name === "ul" &&
        domNode.attribs?.class?.includes("blocks-gallery-grid")
      ) {
        let numberOfColumns = domNode.parent?.attribs?.class?.match(/(\d+)/)
        return (
          <ul
            className={`grid grid-cols-${
              numberOfColumns ? numberOfColumns[0] : "2"
            } gap-2 m-0 h-${
              numberOfColumns[0] === "3"
                ? "60"
                : numberOfColumns[0] === "2"
                ? "96"
                : "128"
            }`}
          >
            {domToReact(domNode.children, options)}
          </ul>
        )
      }
      if (
        domNode.name === "li" &&
        domNode.attribs?.class?.includes("blocks-gallery-item")
      ) {
        return <li className="flex">{domToReact(domNode.children, options)}</li>
      }
      if (domNode.name === "figure" && domNode.parent?.name === "li") {
        return (
          <figure className="w-full h-full image">
            {domToReact(domNode.children, options)}
          </figure>
        )
      }
      if (domNode.name === "figcaption") {
        return (
          <figcaption className="-mt-2 text-xs font-sans-serif text-black opacity-50 font-light">
            {domToReact(domNode.children, options)}
          </figcaption>
        )
      }
    },
  }
  return (
    <Layout>
      <SEO title="Post" />
      <div className="flex flex-col w-9/12 mx-auto mt-12 mb-6">
        <p className="bg-beige text-xxs px-2 w-max text-rouille font-thin font-sans-serif m-0">
          {pageData.categories.nodes[0].name}
        </p>
        <h2 className="text-4xl font-sans-serif font-bold text-black my-3">
          {pageData.title}
        </h2>
        <div className="flex flex-row flex-no-wrap justify-start items-center w-auto">
          <p className="text-black opacity-50 font-normal font-sans-serif text-xxs ml-0 mb-0 mt-0 mr-2">
            {pageData.date}
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
              {pageData.commentCount ? pageData.commentCount : 0}
            </p>
          </div>
        </div>
        <div className="w-full flex flex-row flex-no-wrap">
          <div className="w-8/12 my-9 pr-20 flex flex-col border-r border-rouille border-opacity-20">
            <GatsbyImage
              alt={pageData.featuredImage.node.altText}
              image={
                pageData.featuredImage.node.localFile.childImageSharp
                  .gatsbyImageData
              }
            ></GatsbyImage>
            <div className="my-6 w-full">
              {pageData.content && <>{parse(pageData.content, options)}</>}
            </div>
            <div className="w-full flex flex-row justify-between flex-no-wrap mt-12">
              <div className="w-5/12 flex flex-row flex-no-wrap items-center">
                <p className="font-sans-serif text-xs text-black m-0 mr-2 opacity-50">
                  Par Pauline Loiseau
                </p>
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
                  {pageData.commentCount ? pageData.commentCount : 0}
                </p>
              </div>
              <div className="w-7/12 flex flex-row flex-no-wrap items-center justify-end">
                <p className="font-sans-serif text-rouille text-xs text-black m-0 mr-3">
                  Partager ce post
                </p>
                <div className="flex flex-row flex-no-wrap">
                  <StaticImage
                    src="../images/instagram.svg"
                    width={14}
                    className=""
                    quality={95}
                    formats={["AUTO", "WEBP", "AVIF"]}
                    alt="Instagram Logo"
                  />
                  <StaticImage
                    src="../images/pinterest.svg"
                    width={14}
                    className="ml-2 mr-1"
                    quality={95}
                    formats={["AUTO", "WEBP", "AVIF"]}
                    alt="Pinterest Logo"
                  />
                  <StaticImage
                    src="../images/facebook.svg"
                    width={14}
                    className=""
                    quality={95}
                    formats={["AUTO", "WEBP", "AVIF"]}
                    alt="Facebook Logo"
                  />
                </div>
              </div>
            </div>
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
