const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // query content for WordPress posts
  const {
    data: {
      allWpPost: { nodes: allPosts },
    },
  } = await graphql(`
    query {
      allWpPost(
        filter: {
          categories: {
            nodes: {
              elemMatch: {
                slug: {
                  in: [
                    "mode"
                    "lifestyle"
                    "voyages"
                    "food"
                    "beaute"
                    "outfits"
                  ]
                }
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
  `)
  const {
    data: {
      allWpCategory: { nodes: allCategories },
    },
  } = await graphql(`
    query {
      allWpCategory(
        filter: {
          slug: {
            in: ["mode", "lifestyle", "voyages", "food", "beaute", "outfits"]
          }
        }
      ) {
        nodes {
          slug
          name
          count
        }
      }
    }
  `)
  const postTemplate = path.resolve(`./src/templates/post.js`)
  const listingPostTemplate = path.resolve(`./src/templates/posts.js`)
  allCategories.forEach(category => {
    createPage({
      // will be the url for the page
      path: category.slug,
      // specify the component template of your choice
      component: slash(listingPostTemplate),
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this post's data.
      context: {
        slug: category.slug,
        count: category.count,
        name: category.name,
      },
    })
  })
  allPosts.forEach(post => {
    createPage({
      // will be the url for the page
      path: `${post.categories.nodes[0].slug}/${post.slug}`,
      // specify the component template of your choice
      component: slash(postTemplate),
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this post's data.
      context: {
        post: post,
        slug: post.slug,
      },
    })
  })
}
