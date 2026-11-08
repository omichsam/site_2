import { useEffect } from 'react'

const SITE = 'Avenyra Global'

// Sets the document title and description for each page.
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title === SITE ? `${SITE} | People. Potential. Progress.` : `${title} | ${SITE}`
    if (description) {
      let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.name = 'description'
        document.head.appendChild(tag)
      }
      tag.content = description
    }
  }, [title, description])
}
