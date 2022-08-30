export const pagesPath = {
  "collection": {
    $url: (url?: { hash?: string }) => ({ pathname: '/collection' as const, hash: url?.hash })
  },
  "mint": {
    $url: (url?: { hash?: string }) => ({ pathname: '/mint' as const, hash: url?.hash })
  },
  "owner": {
    $url: (url?: { hash?: string }) => ({ pathname: '/owner' as const, hash: url?.hash })
  },
  "product": {
    $url: (url?: { hash?: string }) => ({ pathname: '/product' as const, hash: url?.hash })
  },
  "start": {
    $url: (url?: { hash?: string }) => ({ pathname: '/start' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
