module.exports = {
  siteMetadata: {
    title: `L'armoire de Pauline`,
    siteUrl: "https://larmoiredepauline.fr",
    description: `L'armoire de Pauline, un blog mode, beauté et lifestyle (food, bons plans, voyages et bonnes adresses) crée et tenu par Pauline Loiseau.`,
    author: `Pauline Loiseau`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://larmoiredepauline.fr",
        sitemap: "https://larmoiredepauline.fr/sitemap/sitemap-index.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
          allWpContentNode(filter: {nodeType: {in: ["Post", "Page"]}}) {
            nodes {
              ... on WpPost {
                uri
                modifiedGmt
              }
              ... on WpPage {
                uri
                modifiedGmt
              }
            }
          }
        }
      `,
        resolveSiteUrl: () => "https://larmoiredepauline.fr",
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allWpContentNode: { nodes: allWpNodes },
        }) => {
          const wpNodeMap = allWpNodes.reduce((acc, node) => {
            const { uri } = node
            acc[uri] = node

            return acc
          }, {})

          return allPages.map(page => {
            return { ...page, ...wpNodeMap[page.path] }
          })
        },
        serialize: ({ path, modifiedGmt }) => {
          return {
            url: path,
            lastmod: modifiedGmt,
          }
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#FFEBD6`,
        theme_color: `#FFEBD6`,
        display: `minimal-ui`,
        icon: `src/images/logo-fond-beige.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://larmoiredepaupau.ovh/graphql`,
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: "allContent",

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: "flexsearch",

        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        engineOptions: {
          tokenize: "forward",
        },

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
          {
            allWpPost(
              sort: { fields: date, order: DESC }
              filter: {
                categories: {
                  nodes: {
                    elemMatch: {
                      slug: { in: ["mode", "lifestyle", "voyages", "food", "beaute", "outfits"] }
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
                content
                commentCount
                date(formatString: "DD MMMM YYYY", locale: "fr-FR")
                title
                id
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
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: "id",

        index: ["uri", "title", "date", "category", "content"],

        normalizer: ({ data }) =>
          data.allWpPost.nodes.map(node => ({
            id: node.id,
            uri: node.uri,
            title: node.title,
            date: node.date,
            category: node.categories.nodes[0].name,
            categorySlug: node.categories.nodes[0].slug,
            content: node.content,
            commentCount: node.commentCount,
            featuredImage: node.featuredImage,
          })),
      },
    },

    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
