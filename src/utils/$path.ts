export const pagesPath = {
  "mint": {
    $url: (url?: { hash?: string }) => ({ pathname: '/mint' as const, hash: url?.hash })
  },
  "start": {
    $url: (url?: { hash?: string }) => ({ pathname: '/start' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
