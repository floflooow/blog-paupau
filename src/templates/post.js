import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import parse, { domToReact } from "html-react-parser"
import { graphql } from "gatsby"

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
            approved
            author {
              node {
                name
              }
            }
            content
            date(formatString: "DD MMMM YYYY", locale: "fr-FR")
            replies {
              nodes {
                approved
                author {
                  node {
                    name
                  }
                }
                content
                date(formatString: "DD MMMM YYYY", locale: "fr-FR")
                parentId
                replies {
                  nodes {
                    approved
                    author {
                      node {
                        name
                      }
                    }
                    content
                    date(formatString: "DD MMMM YYYY", locale: "fr-FR")
                    parentId
                    replies {
                      nodes {
                        approved
                        author {
                          node {
                            name
                          }
                        }
                        content
                        date(formatString: "DD MMMM YYYY", locale: "fr-FR")
                        parentId
                        replies {
                          nodes {
                            approved
                            author {
                              node {
                                name
                              }
                            }
                            content
                            date(formatString: "DD MMMM YYYY", locale: "fr-FR")
                            parentId
                            replies {
                              nodes {
                                approved
                                author {
                                  node {
                                    name
                                  }
                                }
                                content
                                date(
                                  formatString: "DD MMMM YYYY"
                                  locale: "fr-FR"
                                )
                                parentId
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            id
            parentId
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
  console.log(pageData)
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
        return (
          <span className="h-full block relative overflow-hidden">
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
        return (
          <ul className="flex flex-row flex-no-wrap justify-between m-0">
            {domToReact(domNode.children, options)}
          </ul>
        )
      }
      if (
        domNode.name === "li" &&
        domNode.attribs?.class?.includes("blocks-gallery-item")
      ) {
        let numberOfColumns = domNode.parent?.parent?.attribs?.class?.match(
          /(\d+)/
        )
        return (
          <li
            className={`flex w-${
              numberOfColumns && numberOfColumns[0] === "2"
                ? "49/100"
                : numberOfColumns[0] === "3"
                ? "32/100"
                : "full"
            }`}
          >
            {domToReact(domNode.children, options)}
          </li>
        )
      }
      if (domNode.name === "figure" && domNode.parent?.name === "li") {
        return (
          <figure className="w-full h-full image">
            {domToReact(domNode.children, options)}
          </figure>
        )
      }
      if (domNode.name === "img" && !domNode.attribs["aria-hidden"]) {
        console.log(domNode.attribs)
        return (
          <img
            className="w-full h-full object-cover object-center"
            aria-hidden={domNode.attribs["aria-hidden"]}
            loading={domNode.attribs.loading}
            src={domNode.attribs.src}
            srcSet={domNode.attribs.srcset}
            alt={domNode.attribs.alt}
            sizes={domNode.attribs.sizes}
          ></img>
        )
      }
      if (domNode.name === "figcaption") {
        return (
          <figcaption className="text-xs font-sans-serif text-black opacity-50 font-light">
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
        <div className="w-full flex flex-row flex-no-wrap justify-between">
          <div className="w-7/12">
            <h3 className="text-rouille text-2xl font-sans-serif font-bold">
              {pageData.commentCount
                ? pageData.commentCount + " commentaires"
                : 0 + " commentaires"}
            </h3>
            {pageData.comments.nodes.map(commentaire => {
              if (
                pageData.commentStatus === "open" &&
                commentaire.approved === true &&
                commentaire.parentId === null
              ) {
                return (
                  <div className="w-11/12 flex flex-col border border-black border-opacity-20 px-4 py-3 my-3">
                    <div className="w-full flex flex-row flex-no-wrap justify-between">
                      <p className="text-rouille text-md font-medium font-sans-serif m-0">
                        {commentaire.author.node.name}
                      </p>
                      <p className="text-xs font-thin font-sans-serif m-0">
                        {commentaire.date}
                      </p>
                    </div>
                    <div className="w-full mt-2">
                      {commentaire.content && (
                        <div className="text-xs font-light leading-tight font-sans-serif">
                          {parse(commentaire.content)}
                        </div>
                      )}
                    </div>
                    <p className="cursor-pointer underline text-xxs font-bold opacity-50 font-sans-serif m-0 mb-2 -mt-3">
                      Répondre à ce commentaire
                    </p>
                    {commentaire.replies.nodes.length > 0 ? (
                      <>
                        {commentaire.replies.nodes.map(replyComment => (
                          <div className="w-full ml-2 flex flex-col border border-black border-opacity-20 px-4 py-3 my-1">
                            <div className="w-full flex flex-row flex-no-wrap justify-between">
                              <p className="text-rouille text-md font-medium font-sans-serif m-0">
                                {replyComment.author.node.name}
                              </p>
                              <p className="text-xs font-thin font-sans-serif m-0">
                                {replyComment.date}
                              </p>
                            </div>
                            <div className="w-full mt-2">
                              {replyComment.content && (
                                <div className="text-xs font-light leading-tight font-sans-serif">
                                  {parse(replyComment.content)}
                                </div>
                              )}
                            </div>
                            <p className="cursor-pointer underline text-xxs font-bold opacity-50 font-sans-serif m-0 mb-2 -mt-3">
                              Répondre à ce commentaire
                            </p>
                            {replyComment.replies.nodes.length > 0 ? (
                              <>
                                {replyComment.replies.nodes.map(
                                  replyReplyComment => (
                                    <div className="w-full ml-2 flex flex-col border border-black border-opacity-20 px-4 py-3 my-1">
                                      <div className="w-full flex flex-row flex-no-wrap justify-between">
                                        <p className="text-rouille text-md font-medium font-sans-serif m-0">
                                          {replyReplyComment.author.node.name}
                                        </p>
                                        <p className="text-xs font-thin font-sans-serif m-0">
                                          {replyReplyComment.date}
                                        </p>
                                      </div>
                                      <div className="w-full mt-2">
                                        {replyReplyComment.content && (
                                          <div className="text-xs font-light leading-tight font-sans-serif">
                                            {parse(replyReplyComment.content)}
                                          </div>
                                        )}
                                      </div>
                                      <p className="cursor-pointer underline text-xxs font-bold opacity-50 font-sans-serif m-0 mb-2 -mt-3">
                                        Répondre à ce commentaire
                                      </p>
                                      {replyReplyComment.replies.nodes.length >
                                      0 ? (
                                        <>
                                          {replyReplyComment.replies.nodes.map(
                                            replyReplyReplyComment => (
                                              <div className="w-full ml-2 flex flex-col border border-black border-opacity-20 px-4 py-3 my-1">
                                                <div className="w-full flex flex-row flex-no-wrap justify-between">
                                                  <p className="text-rouille text-md font-medium font-sans-serif m-0">
                                                    {
                                                      replyReplyReplyComment
                                                        .author.node.name
                                                    }
                                                  </p>
                                                  <p className="text-xs font-thin font-sans-serif m-0">
                                                    {
                                                      replyReplyReplyComment.date
                                                    }
                                                  </p>
                                                </div>
                                                <div className="w-full mt-2">
                                                  {replyReplyReplyComment.content && (
                                                    <div className="text-xs font-light leading-tight font-sans-serif">
                                                      {parse(
                                                        replyReplyReplyComment.content
                                                      )}
                                                    </div>
                                                  )}
                                                </div>
                                                <p className="cursor-pointer underline text-xxs font-bold opacity-50 font-sans-serif m-0 mb-2 -mt-3">
                                                  Répondre à ce commentaire
                                                </p>
                                                {replyReplyReplyComment.replies
                                                  .nodes.length > 0 ? (
                                                  <>
                                                    {replyReplyReplyComment.replies.nodes.map(
                                                      replyReplyReplyReplyComment => (
                                                        <div className="w-full ml-2 flex flex-col border border-black border-opacity-20 px-4 py-3 my-1">
                                                          <div className="w-full flex flex-row flex-no-wrap justify-between">
                                                            <p className="text-rouille text-md font-medium font-sans-serif m-0">
                                                              {
                                                                replyReplyReplyReplyComment
                                                                  .author.node
                                                                  .name
                                                              }
                                                            </p>
                                                            <p className="text-xs font-thin font-sans-serif m-0">
                                                              {
                                                                replyReplyReplyReplyComment.date
                                                              }
                                                            </p>
                                                          </div>
                                                          <div className="w-full mt-2">
                                                            {replyReplyReplyReplyComment.content && (
                                                              <div className="text-xs font-light leading-tight font-sans-serif">
                                                                {parse(
                                                                  replyReplyReplyReplyComment.content
                                                                )}
                                                              </div>
                                                            )}
                                                          </div>
                                                        </div>
                                                      )
                                                    )}
                                                  </>
                                                ) : null}
                                              </div>
                                            )
                                          )}
                                        </>
                                      ) : null}
                                    </div>
                                  )
                                )}
                              </>
                            ) : null}
                          </div>
                        ))}
                      </>
                    ) : null}
                  </div>
                )
              }
            })}
          </div>
          <div className="w-5/12">
            <h3 className="text-rouille text-2xl font-sans-serif font-bold">
              Ajouter un commentaire
            </h3>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Post
