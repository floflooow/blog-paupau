import { graphql, Link } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import parse, { domToReact } from "html-react-parser"
import { FacebookShareButton, PinterestShareButton } from "react-share"

export const pageQuery = graphql`
  query($slug: String) {
    allWpPost(
      sort: { fields: date, order: DESC }
      filter: { categories: { nodes: { elemMatch: { slug: { eq: $slug } } } } }
    ) {
      nodes {
        categories {
          nodes {
            name
            slug
          }
        }
        commentCount
        excerpt
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
                fixed {
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
  }
`

const Posts = ({ data, pageContext, location }) => {
  const [showMoreCount, setShowMoreCount] = useState(12)
  let allArticle = data.allWpPost.nodes
  let finalArrayArticle = allArticle.slice(0, showMoreCount)
  let othersArticle = allArticle.slice(showMoreCount)
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
  if (pageContext.slug === "wishlist") {
    return (
      <Layout>
        <Seo
          description="Voici ma wishlist shopping : ici, vous retrouverez les v??tements,
              accessoires, produits de beaut?? et les d??corations sur lesquels
              j'ai eu un coup de coeur et que je souhaiterai acheter"
          title="Ma wishlist - L'armoire de Pauline"
        />
        <h2 className="text-4xl font-sans-serif font-thin sm:text-left text-center text-rouille m-0 w-full mt-3 sm:mt-0">
          Ma wishlist
        </h2>
        <div className="w-full flex flex-col sm:flex-row sm:flex-no-wrap px-6 sm:px-0">
          <div className="sm:w-8/12 w-full my-9 sm:pr-20 flex flex-col sm:border-r sm:border-rouille sm:border-opacity-20">
            <p>
              Voici ma wishlist shopping : ici, vous retrouverez les v??tements,
              accessoires, produits de beaut?? et les d??corations sur lesquels
              j'ai eu un coup de coeur et que je souhaiterai acheter.
            </p>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
              {allArticle.map((article, key) => {
                let text = article.excerpt.replace(/(<([^>]+)>)/gi, "")
                return (
                  <div
                    key={key}
                    className="imageContainer relative w-full h-full flex flex-col"
                  >
                    <a
                      target="_blank"
                      className="h-full"
                      rel="noopener noreferrer"
                      href={`${text ? text : ""}`}
                    >
                      <GatsbyImage
                        className="imageWithoutFullHeight h-full"
                        alt={article.featuredImage.node.altText}
                        image={
                          article.featuredImage.node.localFile.childImageSharp
                            .gatsbyImageData
                        }
                      ></GatsbyImage>
                    </a>
                  </div>
                )
              })}
            </div>

            <div className="w-full flex flex-row justify-between flex-no-wrap mt-12">
              <div className="w-full flex flex-row flex-no-wrap items-center justify-end">
                <p className="font-sans-serif text-rouille text-xs text-black m-0 mr-3">
                  Partager ce post
                </p>
                <div className="flex flex-row flex-no-wrap">
                  <FacebookShareButton url={location.href}>
                    <StaticImage
                      src="../images/facebook.svg"
                      width={14}
                      className=""
                      quality={95}
                      formats={["AUTO", "WEBP", "AVIF"]}
                      alt="Facebook Logo"
                    />
                  </FacebookShareButton>
                  <PinterestShareButton
                    media={
                      location.origin +
                      allArticle[0].featuredImage.node.localFile.childImageSharp
                        .fixed.src
                    }
                    url={location.href}
                  >
                    <StaticImage
                      src="../images/pinterest.svg"
                      width={14}
                      className="ml-2 mr-1"
                      quality={95}
                      formats={["AUTO", "WEBP", "AVIF"]}
                      alt="Pinterest Logo"
                    />
                  </PinterestShareButton>
                </div>
              </div>
            </div>
          </div>
          <div className="w-4/12 my-9 hidden sm:flex flex-col items-center">
            <h3 className="text-sm font-sans-serif font-bold text-black text-center mt-6 mb-3">
              Suivez moi sur mes r??seaux
            </h3>
            <div className="flex flex-row flex-no-wrap mx-auto">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/larmoiredepauline__/"
              >
                <StaticImage
                  src="../images/instagram.svg"
                  width={28}
                  className=""
                  quality={95}
                  formats={["AUTO", "WEBP", "AVIF"]}
                  alt="Instagram Logo"
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.pinterest.fr/larmoiredepauline/"
              >
                <StaticImage
                  src="../images/pinterest.svg"
                  width={28}
                  className="ml-2 mr-1"
                  quality={95}
                  formats={["AUTO", "WEBP", "AVIF"]}
                  alt="Pinterest Logo"
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/profile.php?id=100072022658768"
              >
                <StaticImage
                  src="../images/facebook.svg"
                  width={28}
                  className=""
                  quality={95}
                  formats={["AUTO", "WEBP", "AVIF"]}
                  alt="Facebook Logo"
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.tiktok.com/@larmoiredepauline"
              >
                <StaticImage
                  src="../images/tik-tok.svg"
                  width={28}
                  className="ml-1"
                  quality={95}
                  formats={["AUTO", "WEBP", "AVIF"]}
                  alt="Tiktok Logo"
                />
              </a>
            </div>
          </div>
        </div>
      </Layout>
    )
  } else if (pageContext.slug === "derniers-achats") {
    return (
      <Layout>
        <Seo
          description="Voici mes derniers achats : ici, vous retrouverez les v??tements,
              accessoires, produits de beaut?? et les d??corations que je viens
              d'acheter"
          title="Derniers achats - L'armoire de Pauline"
        />
        <h2 className="text-4xl font-sans-serif font-thin sm:text-left text-center text-rouille m-0 w-full mt-3 sm:mt-0">
          Mes derniers achats
        </h2>
        <div className="w-full flex flex-col sm:flex-row sm:flex-no-wrap px-6 sm:px-0">
          <div className="sm:w-8/12 w-full my-9 sm:pr-20 flex flex-col sm:border-r sm:border-rouille sm:border-opacity-20">
            <p>
              Voici mes derniers achats : ici, vous retrouverez les v??tements,
              accessoires, produits de beaut?? et les d??corations que je viens
              d'acheter.
            </p>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
              {allArticle.map((article, key) => {
                let text = article.excerpt.replace(/(<([^>]+)>)/gi, "")
                return (
                  <div
                    key={key}
                    className="imageContainer relative w-full h-full flex flex-col"
                  >
                    <a
                      target="_blank"
                      className="h-full"
                      rel="noopener noreferrer"
                      href={`${text ? text : ""}`}
                    >
                      <GatsbyImage
                        className="imageWithoutFullHeight h-full"
                        alt={article.featuredImage.node.altText}
                        image={
                          article.featuredImage.node.localFile.childImageSharp
                            .gatsbyImageData
                        }
                      ></GatsbyImage>
                    </a>
                  </div>
                )
              })}
            </div>

            <div className="w-full flex flex-row justify-between flex-no-wrap mt-12">
              <div className="w-full flex flex-row flex-no-wrap items-center justify-end">
                <p className="font-sans-serif text-rouille text-xs text-black m-0 mr-3">
                  Partager ce post
                </p>
                <div className="flex flex-row flex-no-wrap">
                  <FacebookShareButton url={location.href}>
                    <StaticImage
                      src="../images/facebook.svg"
                      width={14}
                      className=""
                      quality={95}
                      formats={["AUTO", "WEBP", "AVIF"]}
                      alt="Facebook Logo"
                    />
                  </FacebookShareButton>
                  <PinterestShareButton
                    media={
                      location.origin +
                      allArticle[0].featuredImage.node.localFile.childImageSharp
                        .fixed.src
                    }
                    url={location.href}
                  >
                    <StaticImage
                      src="../images/pinterest.svg"
                      width={14}
                      className="ml-2 mr-1"
                      quality={95}
                      formats={["AUTO", "WEBP", "AVIF"]}
                      alt="Pinterest Logo"
                    />
                  </PinterestShareButton>
                </div>
              </div>
            </div>
          </div>
          <div className="w-4/12 my-9 hidden sm:flex flex-col items-center">
            <h3 className="text-sm font-sans-serif font-bold text-black text-center mt-6 mb-3">
              Suivez moi sur mes r??seaux
            </h3>
            <div className="flex flex-row flex-no-wrap mx-auto">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/larmoiredepauline__/"
              >
                <StaticImage
                  src="../images/instagram.svg"
                  width={28}
                  className=""
                  quality={95}
                  formats={["AUTO", "WEBP", "AVIF"]}
                  alt="Instagram Logo"
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.pinterest.fr/larmoiredepauline/"
              >
                <StaticImage
                  src="../images/pinterest.svg"
                  width={28}
                  className="ml-2 mr-1"
                  quality={95}
                  formats={["AUTO", "WEBP", "AVIF"]}
                  alt="Pinterest Logo"
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/profile.php?id=100072022658768"
              >
                <StaticImage
                  src="../images/facebook.svg"
                  width={28}
                  className=""
                  quality={95}
                  formats={["AUTO", "WEBP", "AVIF"]}
                  alt="Facebook Logo"
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.tiktok.com/@larmoiredepauline"
              >
                <StaticImage
                  src="../images/tik-tok.svg"
                  width={28}
                  className="ml-1"
                  quality={95}
                  formats={["AUTO", "WEBP", "AVIF"]}
                  alt="Tiktok Logo"
                />
              </a>
            </div>
          </div>
        </div>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <Seo
          description={
            "Sur cette page, vous retrouverez tous les articles " +
            pageContext.name +
            " du blog."
          }
          title={pageContext.name}
        />
        <h2 className="text-4xl font-sans-serif font-thin text-center text-rouille m-0 mt-3 sm:mt-0">
          {pageContext.name}
        </h2>
        <div className="sm:w-full w-10/12 grid sm:grid-cols-4 sm:gap-6 grid-cols-1 mt-6 mx-auto sm:mx-0">
          {finalArrayArticle.map((article, key) => {
            if (pageContext.slug === "outfits") {
              return (
                <div
                  key={key}
                  className="imageContainer relative flex flex-col"
                >
                  <Link
                    className="h-72/100"
                    to={`/${article.categories.nodes[0].slug}${article.uri}`}
                  >
                    <GatsbyImage
                      className="imageWithoutFullHeight h-full"
                      alt={article.featuredImage.node.altText}
                      image={
                        article.featuredImage.node.localFile.childImageSharp
                          .gatsbyImageData
                      }
                    ></GatsbyImage>
                  </Link>
                  <div className="w-full flex flex-col bg-beige pt-2 py-9 h-28/100 mb-6 sm:mb-0">
                    <p className="text-white w-fit font-thin font-sans-serif text-xl mx-auto mt-2 mb-0 py-1 px-2 rounded-sm bg-rouille bg-opacity-75">
                      {article.title}
                    </p>
                    <div className="w-full px-6 mt-2 flex flex-col mx-auto items-center">
                      {parse(article.content, options)}
                    </div>
                  </div>
                </div>
              )
            } else {
              return (
                <Link
                  className="imageContainer relative flex flex-col"
                  key={key}
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
              )
            }
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
}
export default Posts
