export interface Coin {
  id: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  ath_change_percentage: number;
  onClick: (coin: string) => void;
  name: string;
  symbol: string;
  nums_of_coins: number;
  total_volume: number;
}

export interface CoinState {
  coins: Coin[];
  loading: boolean;
  error: null | string;
  page: number;
  limit: number;
}

export interface SingleCoinState {
  id: string;
  name: string;
  symbol: string;
  image: string;
  market_cap_rank: number;
  price_in_usd: number;
  price_in_btc: number;
  links_homepage: string[];
  categories: string[];
  price_change_percentage_24h: number;
  market_cap_change_percentage_24h_in_btc: number;
  market_cap_change_percentage_24h_in_eth: number;
  market_cap_in_usd: number;
  total_volume_in_usd: number;
  fully_diluted_valuation_in_usd: number;
  total_supply: number;
  circulating_supply: number;
  max_supply: number;
  blockchain_site: string[];
  subreddit_url: string;
  repos_url_github: string;
}

export interface PricesDataState {
  prices: number[][];
}
