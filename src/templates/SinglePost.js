import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'

import Content from '../components/Content'
import Layout from '../components/Layout'
import './SinglePost.css'

export const SinglePostTemplate = ({
  title,
  date,
  modifydate,
  body,
  catlink,
  nextPostURL,
  prevPostURL,
  categories = []
}) => (
  <main>
    <article
      className="SinglePost section light"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="container skinny">
        <Link className="SinglePost--BackButton" to="/">
          <ChevronLeft /> BACK
        </Link>
        <div className="SinglePost--Content relative">
          <div className="SinglePost--Meta">
            {date && (
              <time
                className="SinglePost--Meta--Date"
                itemProp="dateCreated pubdate datePublished"
                date={date}
              >
                {date}
              </time>
            )}
            {modifydate && (
              <time
                className="SinglePost--Meta--Date"
                itemProp="dateUpdated modidate dateModified"
                date={modifydate}
              >
                {modifydate !== "Invalid date" ? modifydate : ''}
              </time>
            )}
            {categories && (
              <Fragment>
                <span>|</span>
                {categories.map((cat, index) => (
                  <Link to={catlink}>
                    <span
                      key={cat.category}
                      className="SinglePost--Meta--Category"
                    >
                      {cat.category}
                      {/* Add a comma on all but last category */}
                      {index !== categories.length - 1 ? ',' : ''}
                    </span>
                  </Link>
                ))}
              </Fragment>
            )}
          </div>

          {title && (
            <h1 className="SinglePost--Title" itemProp="title">
              {title}
            </h1>
          )}

          <div className="SinglePost--InnerContent">
            <Content source={body} />
          </div>

          <div className="SinglePost--Pagination">
            {prevPostURL && (
              <Link
                className="SinglePost--Pagination--Link prev"
                to={prevPostURL}
              >
                Previous Post
              </Link>
            )}
            {nextPostURL && (
              <Link
                className="SinglePost--Pagination--Link next"
                to={nextPostURL}
              >
                Next Post
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  </main>
)

// Export Default SinglePost for front-end
const SinglePost = ({ data: { post, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === post.id)
  const subNav = {
    posts: allPosts.hasOwnProperty('edges')
      ? allPosts.edges.map(post => {
        if(post.node.fields.contentType === 'postCategories') {
          return { ...post.node.fields, ...post.node.frontmatter }
        }
        })
      : false
  }
  let catlink 
  for (let i = 0; i < subNav.posts.length; i++) {
    if (subNav.posts[i] !== undefined && post.frontmatter.categories !== null) {
      if (subNav.posts[i].title === post.frontmatter.categories[0].category) {
        catlink = subNav.posts[i].slug
      }
    }
  }
  
  return (
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.title || false}
    >
      <SinglePostTemplate
        {...post}
        {...post.frontmatter}
        body={post.html}
        catlink={catlink}
        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  )
}

export default SinglePost

export const pageQuery = graphql`
  ## Query for SinglePost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SinglePost($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        template
        subtitle
        date(formatString: "YYYY/MM/DD")
        modifydate(formatString: "YYYY/MM/DD")
        categories {
          category
        }
      }
    }

    allPosts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          fields {
            contentType
            slug
          }
          frontmatter {
            title
          }
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
