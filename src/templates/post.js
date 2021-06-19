import { graphql, Link } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import parse, { domToReact } from "html-react-parser"
import React, { useState } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

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
        slug
        commentCount
        commentStatus
        databaseId
        comments {
          nodes {
            approved
            author {
              node {
                name
              }
            }
            content
            databaseId
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
                databaseId
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
                    databaseId
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
                        databaseId
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
                            databaseId
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
                                date(
                                  formatString: "DD MMMM YYYY"
                                  locale: "fr-FR"
                                )
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
    outfitsListing: allWpPost(
      sort: { fields: date, order: DESC }
      limit: 7
      filter: {
        categories: { nodes: { elemMatch: { slug: { eq: "outfits" } } } }
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
        content
        slug
      }
    }
  }
`

const Post = ({ data }) => {
  let pageData = data.allWpPost.nodes[0]
  let outfitsData = data.outfitsListing.nodes
  let postId = pageData.databaseId
  let newOutfitsData = outfitsData.filter(element => {
    if (element.slug === pageData.slug) {
      return false
    }
    return true
  })
  let commentsEndpoint = "https://larmoiredepaupau.ovh/wp-json/wp/v2/comments"
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [commentStatus, setCommentStatus] = useState(false)
  const [firstIndexReply, setFirstIndexReply] = useState(false)
  const [secondIndexReply, setSecondIndexReply] = useState(false)
  const [thirdIndexReply, setThirdIndexReply] = useState(false)
  const [fourthIndexReply, setFourthIndexReply] = useState(false)
  const createComment = () => {
    // Trying to avoid double clicks here.
    if (commentStatus === "loading") {
      return // don't send this twice.
    }

    // This is a POST request to the comments endpoint. The body is sent as a JSON string.
    // Once the response is received, we set the comment status accordingly.
    fetch(commentsEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author_email: email,
        author_name: userName,
        post: postId,
        content: message,
      }),
    }).then(response => {
      if (response.status === 201) {
        setCommentStatus("success")
      } else {
        setCommentStatus("error")
      }
    })
  }
  const createCommentReply = parentId => {
    // Trying to avoid double clicks here.
    if (commentStatus === "loading") {
      return // don't send this twice.
    }

    // This is a POST request to the comments endpoint. The body is sent as a JSON string.
    // Once the response is received, we set the comment status accordingly.
    fetch(commentsEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author_email: email,
        author_name: userName,
        post: postId,
        content: message,
        parent: parentId,
      }),
    }).then(response => {
      if (response.status === 201) {
        setCommentStatus("success")
      } else {
        setCommentStatus("error")
      }
    })
  }
  const optionsOutfit = {
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
      <Seo title="Post" />
      {pageData.categories.nodes[0].slug === "outfits" ? (
        <>
          <div className="flex flex-col sm:w-9/12 w-full mx-auto mt-12 mb-6">
            <div className="grid grid-cols-2">
              <GatsbyImage
                alt={pageData.featuredImage.node.altText}
                image={
                  pageData.featuredImage.node.localFile.childImageSharp
                    .gatsbyImageData
                }
              ></GatsbyImage>
              <div className="flex flex-col relative items-center justify-center h-full bg-beige py-3">
                <p className="w-auto absolute top-3 text-base text-rouille font-bold font-sans-serif">
                  Outfits of today
                </p>
                <p className="w-auto mb-4 text-4xl text-black font-normal font-serif">
                  Look du
                </p>
                <p className="w-auto text-4xl text-black font-bold font-serif">
                  {pageData.title}
                </p>
                <div className="my-3 w-full">
                  {pageData.content && (
                    <>{parse(pageData.content, optionsOutfit)}</>
                  )}
                </div>
                <div className="w-auto absolute bottom-3 flex flex-row flex-no-wrap items-center justify-end mt-6">
                  <p className="font-sans-serif font-thin text-black text-xxs text-black m-0 mr-3">
                    Partager cet outfit
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
          </div>
          <div className="flex flex-col w-full mt-12 mb-6">
            <p className="w-auto mb-4 mx-auto text-2xl text-rouille font-thin font-sans-serif">
              Vous aimerez également
            </p>
            <div className="w-full grid sm:grid-cols-3 grid-cols-2 gap-3 mt-6">
              {newOutfitsData?.map((outfit, key) => (
                <div
                  key={key}
                  className="imageContainer relative flex flex-col"
                >
                  <Link
                    className="h-72/100"
                    to={`/${outfit.categories.nodes[0].slug}${outfit.uri}`}
                  >
                    <GatsbyImage
                      className="imageWithoutFullHeight h-full"
                      alt={outfit.altText}
                      image={
                        outfit.featuredImage.node.localFile.childImageSharp
                          .gatsbyImageData
                      }
                    ></GatsbyImage>
                  </Link>
                  <div className="w-full flex flex-col bg-beige pt-2 py-9 h-28/100">
                    <p className="text-white w-fit font-thin font-sans-serif text-xl mx-auto mt-2 mb-0 py-1 px-2 rounded-sm bg-rouille bg-opacity-75">
                      {outfit.title}
                    </p>
                    <div className="w-full px-6 mt-2 flex flex-col mx-auto items-center">
                      {parse(outfit.content, optionsOutfit)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col w-10/12 mx-auto mt-12 mb-6">
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
                      height={190}
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
                    Je suis Pauline, j'ai 20 ans, rédactrice de mon propre blog
                    mode et lifestyle, L'armoire de Pauline. Sur celui-ci, je
                    partage mes coups de cœur mode, beauté et lifestyle. Bonne
                    lecture.
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
                {pageData.comments.nodes.map((commentaire, index) => {
                  if (
                    pageData.commentStatus === "open" &&
                    commentaire.approved === true &&
                    commentaire.parentId === null
                  ) {
                    return (
                      <div
                        key={index}
                        className="w-11/12 flex flex-col border border-black border-opacity-20 px-4 py-3 my-3"
                      >
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
                        <button
                          onClick={() => {
                            setFirstIndexReply(commentaire.databaseId)
                            setSecondIndexReply(false)
                            setThirdIndexReply(false)
                            setFourthIndexReply(false)
                          }}
                          className="cursor-pointer inline text-left underline text-xxs font-bold opacity-50 font-sans-serif m-0 mb-6 -mt-3"
                        >
                          Répondre à ce commentaire
                        </button>
                        {firstIndexReply === commentaire.databaseId ? (
                          <form
                            className="w-full relative"
                            onSubmit={e => {
                              e.preventDefault()
                              setCommentStatus("loading")
                            }}
                          >
                            <input type="hidden" name="botField" />
                            <div className="field">
                              <input
                                type="text"
                                name={`userName${firstIndexReply}`}
                                placeholder="Nom"
                                id={`userName${firstIndexReply}`}
                                value={userName}
                                className="w-full border border-black border-opacity-25 px-4 py-3 mb-1"
                                onChange={e => setUserName(e.target.value)}
                              />
                            </div>
                            <div className="field">
                              <input
                                type="text"
                                name={`email${firstIndexReply}`}
                                id={`email${firstIndexReply}`}
                                placeholder="Email"
                                value={email}
                                className="w-full border border-black border-opacity-25 px-4 py-3 my-1"
                                onChange={e => setEmail(e.target.value)}
                              />
                            </div>
                            <div className="field">
                              <textarea
                                name={`message${firstIndexReply}`}
                                id={`message${firstIndexReply}`}
                                rows="6"
                                placeholder="Votre commentaire"
                                value={message}
                                className="w-full border border-black border-opacity-25 px-4 py-3 my-1"
                                onChange={e => setMessage(e.target.value)}
                              />
                            </div>
                            <input
                              className="w-full mt-2 bg-white text-sm text-rouille font-thin font-serif hoverBorder"
                              type="submit"
                              onClick={() =>
                                createCommentReply(commentaire.databaseId)
                              }
                              value="Envoyer"
                            />
                            <button
                              onClick={() => setFirstIndexReply(false)}
                              className="cursor-pointer text-rouille font-sans-serif font-thin absolute -top-6 right-0"
                            >
                              X
                            </button>
                          </form>
                        ) : null}
                        {commentaire.replies.nodes.length > 0 ? (
                          <>
                            {commentaire.replies.nodes.map(
                              (replyComment, firstKey) => (
                                <div
                                  key={firstKey}
                                  className="w-full ml-2 flex flex-col border border-black border-opacity-20 px-4 py-3 my-1"
                                >
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
                                  <button
                                    onClick={() => {
                                      setFirstIndexReply(false)
                                      setSecondIndexReply(
                                        replyComment.databaseId
                                      )
                                      setThirdIndexReply(false)
                                      setFourthIndexReply(false)
                                    }}
                                    className="cursor-pointer inline text-left underline text-xxs font-bold opacity-50 font-sans-serif m-0 mb-6 -mt-3"
                                  >
                                    Répondre à ce commentaire
                                  </button>
                                  {secondIndexReply ===
                                  replyComment.databaseId ? (
                                    <form
                                      className="w-full relative"
                                      onSubmit={e => {
                                        e.preventDefault()
                                        setCommentStatus("loading")
                                      }}
                                    >
                                      <input type="hidden" name="botField" />
                                      <div className="field">
                                        <input
                                          type="text"
                                          name={`userName${secondIndexReply}`}
                                          placeholder="Nom"
                                          id={`userName${secondIndexReply}`}
                                          value={userName}
                                          className="w-full border border-black border-opacity-25 px-4 py-3 mb-1"
                                          onChange={e =>
                                            setUserName(e.target.value)
                                          }
                                        />
                                      </div>
                                      <div className="field">
                                        <input
                                          type="text"
                                          name={`email${secondIndexReply}`}
                                          id={`email${secondIndexReply}`}
                                          placeholder="Email"
                                          value={email}
                                          className="w-full border border-black border-opacity-25 px-4 py-3 my-1"
                                          onChange={e =>
                                            setEmail(e.target.value)
                                          }
                                        />
                                      </div>
                                      <div className="field">
                                        <textarea
                                          name={`message${secondIndexReply}`}
                                          id={`message${secondIndexReply}`}
                                          rows="6"
                                          placeholder="Votre commentaire"
                                          value={message}
                                          className="w-full border border-black border-opacity-25 px-4 py-3 my-1"
                                          onChange={e =>
                                            setMessage(e.target.value)
                                          }
                                        />
                                      </div>
                                      <input
                                        className="w-full mt-2 bg-white text-sm text-rouille font-thin font-serif hoverBorder"
                                        type="submit"
                                        onClick={() =>
                                          createCommentReply(
                                            replyComment.databaseId
                                          )
                                        }
                                        value="Envoyer"
                                      />
                                      <button
                                        onClick={() =>
                                          setSecondIndexReply(false)
                                        }
                                        className="cursor-pointer text-rouille font-sans-serif font-thin absolute -top-6 right-0"
                                      >
                                        X
                                      </button>
                                    </form>
                                  ) : null}
                                  {replyComment.replies.nodes.length > 0 ? (
                                    <>
                                      {replyComment.replies.nodes.map(
                                        (replyReplyComment, secondKey) => (
                                          <div
                                            key={secondKey}
                                            className="w-full ml-2 flex flex-col border border-black border-opacity-20 px-4 py-3 my-1"
                                          >
                                            <div className="w-full flex flex-row flex-no-wrap justify-between">
                                              <p className="text-rouille text-md font-medium font-sans-serif m-0">
                                                {
                                                  replyReplyComment.author.node
                                                    .name
                                                }
                                              </p>
                                              <p className="text-xs font-thin font-sans-serif m-0">
                                                {replyReplyComment.date}
                                              </p>
                                            </div>
                                            <div className="w-full mt-2">
                                              {replyReplyComment.content && (
                                                <div className="text-xs font-light leading-tight font-sans-serif">
                                                  {parse(
                                                    replyReplyComment.content
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                            <button
                                              onClick={() => {
                                                setFirstIndexReply(false)
                                                setSecondIndexReply(false)
                                                setThirdIndexReply(
                                                  replyReplyComment.databaseId
                                                )
                                                setFourthIndexReply(false)
                                              }}
                                              className="cursor-pointer underline inline text-left text-xxs font-bold opacity-50 font-sans-serif m-0 mb-6 -mt-3"
                                            >
                                              Répondre à ce commentaire
                                            </button>
                                            {thirdIndexReply ===
                                            replyReplyComment.databaseId ? (
                                              <form
                                                className="w-full relative"
                                                onSubmit={e => {
                                                  e.preventDefault()
                                                  setCommentStatus("loading")
                                                }}
                                              >
                                                <input
                                                  type="hidden"
                                                  name="botField"
                                                />
                                                <div className="field">
                                                  <input
                                                    type="text"
                                                    name={`userName${thirdIndexReply}`}
                                                    placeholder="Nom"
                                                    id={`userName${thirdIndexReply}`}
                                                    value={userName}
                                                    className="w-full border border-black border-opacity-25 px-4 py-3 mb-1"
                                                    onChange={e =>
                                                      setUserName(
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                </div>
                                                <div className="field">
                                                  <input
                                                    type="text"
                                                    name={`email${thirdIndexReply}`}
                                                    id={`email${thirdIndexReply}`}
                                                    placeholder="Email"
                                                    value={email}
                                                    className="w-full border border-black border-opacity-25 px-4 py-3 my-1"
                                                    onChange={e =>
                                                      setEmail(e.target.value)
                                                    }
                                                  />
                                                </div>
                                                <div className="field">
                                                  <textarea
                                                    name={`message${thirdIndexReply}`}
                                                    id={`message${thirdIndexReply}`}
                                                    rows="6"
                                                    placeholder="Votre commentaire"
                                                    value={message}
                                                    className="w-full border border-black border-opacity-25 px-4 py-3 my-1"
                                                    onChange={e =>
                                                      setMessage(e.target.value)
                                                    }
                                                  />
                                                </div>
                                                <input
                                                  className="w-full mt-2 bg-white text-sm text-rouille font-thin font-serif hoverBorder"
                                                  type="submit"
                                                  onClick={() =>
                                                    createCommentReply(
                                                      replyReplyComment.databaseId
                                                    )
                                                  }
                                                  value="Envoyer"
                                                />
                                                <button
                                                  onClick={() =>
                                                    setThirdIndexReply(false)
                                                  }
                                                  className="cursor-pointer text-rouille font-sans-serif font-thin absolute -top-6 right-0"
                                                >
                                                  X
                                                </button>
                                              </form>
                                            ) : null}
                                            {replyReplyComment.replies.nodes
                                              .length > 0 ? (
                                              <>
                                                {replyReplyComment.replies.nodes.map(
                                                  (
                                                    replyReplyReplyComment,
                                                    thirdKey
                                                  ) => (
                                                    <div
                                                      key={thirdKey}
                                                      className="w-full ml-2 flex flex-col border border-black border-opacity-20 px-4 py-3 my-1"
                                                    >
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
                                                      <button
                                                        onClick={() => {
                                                          setFirstIndexReply(
                                                            false
                                                          )
                                                          setSecondIndexReply(
                                                            false
                                                          )
                                                          setThirdIndexReply(
                                                            false
                                                          )
                                                          setFourthIndexReply(
                                                            replyReplyReplyComment.databaseId
                                                          )
                                                        }}
                                                        className="cursor-pointer underline inline text-left text-xxs font-bold opacity-50 font-sans-serif m-0 mb-6 -mt-3"
                                                      >
                                                        Répondre à ce
                                                        commentaire
                                                      </button>
                                                      {fourthIndexReply ===
                                                      replyReplyReplyComment.databaseId ? (
                                                        <form
                                                          className="w-full relative"
                                                          onSubmit={e => {
                                                            e.preventDefault()
                                                            setCommentStatus(
                                                              "loading"
                                                            )
                                                          }}
                                                        >
                                                          <input
                                                            type="hidden"
                                                            name="botField"
                                                          />
                                                          <div className="field">
                                                            <input
                                                              type="text"
                                                              name={`userName${fourthIndexReply}`}
                                                              placeholder="Nom"
                                                              id={`userName${fourthIndexReply}`}
                                                              value={userName}
                                                              className="w-full border border-black border-opacity-25 px-4 py-3 mb-1"
                                                              onChange={e =>
                                                                setUserName(
                                                                  e.target.value
                                                                )
                                                              }
                                                            />
                                                          </div>
                                                          <div className="field">
                                                            <input
                                                              type="text"
                                                              name={`email${fourthIndexReply}`}
                                                              id={`email${fourthIndexReply}`}
                                                              placeholder="Email"
                                                              value={email}
                                                              className="w-full border border-black border-opacity-25 px-4 py-3 my-1"
                                                              onChange={e =>
                                                                setEmail(
                                                                  e.target.value
                                                                )
                                                              }
                                                            />
                                                          </div>
                                                          <div className="field">
                                                            <textarea
                                                              name={`message${fourthIndexReply}`}
                                                              id={`message${fourthIndexReply}`}
                                                              rows="6"
                                                              placeholder="Votre commentaire"
                                                              value={message}
                                                              className="w-full border border-black border-opacity-25 px-4 py-3 my-1"
                                                              onChange={e =>
                                                                setMessage(
                                                                  e.target.value
                                                                )
                                                              }
                                                            />
                                                          </div>
                                                          <input
                                                            className="w-full mt-2 bg-white text-sm text-rouille font-thin font-serif hoverBorder"
                                                            type="submit"
                                                            onClick={() =>
                                                              createCommentReply(
                                                                replyReplyReplyComment.databaseId
                                                              )
                                                            }
                                                            value="Envoyer"
                                                          />
                                                          <button
                                                            onClick={() =>
                                                              setFourthIndexReply(
                                                                false
                                                              )
                                                            }
                                                            className="cursor-pointer text-rouille font-sans-serif font-thin absolute -top-6 right-0"
                                                          >
                                                            X
                                                          </button>
                                                        </form>
                                                      ) : null}
                                                      {replyReplyReplyComment
                                                        .replies.nodes.length >
                                                      0 ? (
                                                        <>
                                                          {replyReplyReplyComment.replies.nodes.map(
                                                            (
                                                              replyReplyReplyReplyComment,
                                                              fourthKey
                                                            ) => (
                                                              <div
                                                                key={fourthKey}
                                                                className="w-full ml-2 flex flex-col border border-black border-opacity-20 px-4 py-3 my-1"
                                                              >
                                                                <div className="w-full flex flex-row flex-no-wrap justify-between">
                                                                  <p className="text-rouille text-md font-medium font-sans-serif m-0">
                                                                    {
                                                                      replyReplyReplyReplyComment
                                                                        .author
                                                                        .node
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
                              )
                            )}
                          </>
                        ) : null}
                      </div>
                    )
                  } else {
                    return null
                  }
                })}
              </div>
              <div className="w-5/12 flex flex-col">
                <h3 className="text-rouille text-2xl font-sans-serif font-bold">
                  Ajouter un commentaire
                </h3>
                {firstIndexReply !== false ||
                secondIndexReply !== false ||
                thirdIndexReply !== false ||
                fourthIndexReply !== false ? null : (
                  <form
                    className="w-full"
                    onSubmit={e => {
                      e.preventDefault()
                      setCommentStatus("loading")
                    }}
                  >
                    <input type="hidden" name="botField" />
                    <div className="field">
                      <input
                        type="text"
                        name="userName"
                        placeholder="Nom"
                        id="userName"
                        value={userName}
                        className="w-full border border-black border-opacity-25 px-4 py-3 mb-1"
                        onChange={e => setUserName(e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        className="w-full border border-black border-opacity-25 px-4 py-3 my-1"
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <textarea
                        name="message"
                        id="message"
                        rows="6"
                        placeholder="Votre commentaire"
                        value={message}
                        className="w-full border border-black border-opacity-25 px-4 py-3 my-1"
                        onChange={e => setMessage(e.target.value)}
                      />
                    </div>
                    <input
                      className="w-full mt-2 bg-white text-sm text-rouille font-thin font-serif hoverBorder"
                      type="submit"
                      onClick={createComment}
                      value="Envoyer"
                    />
                  </form>
                )}

                {commentStatus === "success" ? (
                  <p>
                    Votre commentaire à bien été envoyé. Il doit maintenant être
                    validé afin d'apparaître sur le site.
                  </p>
                ) : commentStatus === "loading" ? (
                  <p>Votre commentaire est en cours d'envoi.</p>
                ) : commentStatus === "error" ? (
                  <p>
                    Il y a eu une erreur lors de l&apos;envoi, veuillez
                    réessayer plus tard.
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  )
}

export default Post
