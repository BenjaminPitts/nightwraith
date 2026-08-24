/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

function Seo({
  description,
  title,
  pathname,
  noindex,
  structuredData,
  children,
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  const siteMetadata = site.siteMetadata
  const metaDescription = description || siteMetadata.description
  const defaultTitle = siteMetadata?.title
  const resolvedTitle =
    defaultTitle && title === defaultTitle
      ? defaultTitle
      : defaultTitle
      ? `${title} | ${defaultTitle}`
      : title

  const canonicalUrl = pathname
    ? `${siteMetadata.siteUrl}${pathname}`
    : siteMetadata.siteUrl
  const robotsContent = noindex ? "noindex, nofollow" : "index, follow"

  return (
    <>
      <title>{resolvedTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={defaultTitle} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:creator" content={siteMetadata?.author || ""} />

      {structuredData ? (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      ) : null}

      {children}
    </>
  )
}

Seo.defaultProps = {
  description: "",
  pathname: "/",
  noindex: false,
  structuredData: null,
}

Seo.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  pathname: PropTypes.string,
  noindex: PropTypes.bool,
  structuredData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node,
}

export default Seo
