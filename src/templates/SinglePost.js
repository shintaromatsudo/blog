import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
  PocketShareButton,
  PocketIcon,
} from 'react-share';

import Content from '../components/Content'
import Layout from '../components/Layout'
import Breadcrumb from '../components/Breadcrumb'
import './SinglePost.css'

export const SinglePostTemplate = ({
  title,
  date,
  modifydate,
  body,
  catlink,
  nextPostURL,
  prevPostURL,
  categories = [],
  shareUrl
}) => (
  <main>
    <article
      className="SinglePost section light"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="SinglePost--Actions">
        <ul>
          <li><FacebookShareButton url={shareUrl} className="mr-2">
            <FacebookIcon size={40} round />
          </FacebookShareButton></li>
          <li><TwitterShareButton url={shareUrl} className="mr-2">
            <TwitterIcon size={40} round />
          </TwitterShareButton></li>
          <li><LineShareButton url={shareUrl} className="mr-2">
            <LineIcon size={40} round />
          </LineShareButton></li>
          <li><PocketShareButton url={shareUrl} className="mr-2">
            <PocketIcon size={40} round />
          </PocketShareButton></li>
        </ul>
      </div>
      <div className="container skinny">
        <Breadcrumb breadcrumbs={[
              { to: '/', label: 'Home' },
              { to: `/post-categories/${categories[0].category}`, label: `${categories[0].category}` },
              { to: `${shareUrl}`, label: title, active: true },
            ]}
            />
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
                {modifydate !== "Invalid date" ? '更新日 ' + modifydate : ''}
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

          <p style={{marginBottom: '10px'}}>
            <a href="https://misara-2020.netlify.com/posts/Python入門ガイド完全版【基礎知識・学習法・コードサンプル・転職・案件獲得】">
              <span style={{
                fontSize: "14px",
                color: "#fff",
                marginRight: "10px",
                backgroundColor: "#1e50a2",
                borderRadius: "2px",
                padding: "8px 8px 7px",
              }}>人気記事</span>
              Python入門ガイド完全版【基礎知識・学習法・コードサンプル・転職・案件獲得】
            </a>
          </p>

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

  const shareUrl = "https://misara-2020.netlify.com" + thisEdge.node.fields.slug
  
  return (
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.title || false}
      shareUrl={shareUrl}
    >
      <SinglePostTemplate
        {...post}
        {...post.frontmatter}
        shareUrl={shareUrl}
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
