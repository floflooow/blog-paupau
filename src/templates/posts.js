import { graphql } from "gatsby"
import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const pageQuery = graphql`
  query($slug: String) {
    allWpPost(
      filter: { categories: { nodes: { elemMatch: { slug: { eq: $slug } } } } }
    ) {
      nodes {
        title
        slug
        excerpt
        date(formatString: "DD MMMM YYYY", locale: "fr-FR")
        commentCount
      }
    }
  }
`

const Posts = () => {
  return (
    <Layout>
      <SEO title="Listings" />
      <p>Ici il y aura une page de listing</p>
    </Layout>
  )
}
export default Posts
