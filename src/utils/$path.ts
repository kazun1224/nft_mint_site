export const pagesPath = {
  "collection": {
    $url: (url?: { hash?: string }) => ({ pathname: '/collection' as const, hash: url?.hash })
  },
  "owner": {
    $url: (url?: { hash?: string }) => ({ pathname: '/owner' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
