import type { Alpine } from 'alpinejs'

export type PricePluginOptions = {
  /**
   * the language code you want to use (e.g. `it`, `en-US`, `de-DE`, etc.)
   */
  language?: string

  /**
   * the currency code you want to use for formatting (e.g. `EUR`, `USD`, etc.)
   */
  currency?: string

  /**
   * whether to use the `language` and `currency` from the global `window.Shopify` object by default (and use  provided `language` and `currency` options as fall back)
   */
  shopify?: boolean

  /**
   * wether to provided values are in cents or not (will be automatically resolve to `true` when `options.shopify = true`)
   */
  inCents?: boolean
}

declare global {
  interface Window {
    alpinePriceOptions: PricePluginOptions
    Shopify?: Record<string, any>
  }
}

const PricePlugin = (pricePluginOptions?: PricePluginOptions) => {
  const options = Object.assign(
    window.alpinePriceOptions || {},
    pricePluginOptions
  )

  const inCents = options?.inCents || options?.shopify

  const formatter = new Intl.NumberFormat(
    options?.language ||
      (window.navigator as any).userLanguage ||
      window.navigator.language,
    {
      style: 'currency',
      currency: options?.shopify
        ? window.Shopify?.currency?.active
        : options?.currency
    }
  )

  return (Alpine: Alpine) => {
    Alpine.magic(
      'price',
      () => (price: number) => formatter.format(inCents ? price / 100 : price)
    )
  }
}

export default PricePlugin
