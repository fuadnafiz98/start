export const seo = ({
  title,
  description,
  keywords,
  image,
  url,
  author,
  type = 'website',
  locale = 'en_US',
}: {
  title: string
  description?: string
  image?: string
  keywords?: string
  url?: string
  author?: string
  type?: string
  locale?: string
}) => {
  const tags = [
    { title },
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    { name: 'author', content: author },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#000000' },
    { httpEquiv: 'x-ua-compatible', content: 'IE=edge' },

    // Open Graph
    { property: 'og:type', content: type },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:locale', content: locale },
    ...(image
      ? [
          { property: 'og:image', content: image },
          { property: 'og:image:width', content: '1200' },
          { property: 'og:image:height', content: '630' },
        ]
      : []),

    // Twitter Card
    {
      name: 'twitter:card',
      content: image ? 'summary_large_image' : 'summary',
    },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:creator', content: '@tannerlinsley' },
    { name: 'twitter:site', content: '@tannerlinsley' },
    ...(image ? [{ name: 'twitter:image', content: image }] : []),
  ].filter((tag) => tag.content !== undefined && tag.content !== '')

  return tags
}
