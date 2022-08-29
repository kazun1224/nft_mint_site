export const pagesPath = {
  "start": {
    $url: (url?: { hash?: string }) => ({ pathname: '/start' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
