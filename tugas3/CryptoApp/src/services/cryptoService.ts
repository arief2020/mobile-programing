export interface Cryptocurrency {
  id: string;
  rank: string | number;
  name: string;
  symbol: string;
  price_usd: string | null;
}

interface CoinLoreResponse {
  data: Cryptocurrency[];
  info?: {
    coins_num?: number;
    time?: number;
  };
}

const API_URL = 'https://api.coinlore.net/api/tickers/';

export async function getCryptoData(): Promise<Cryptocurrency[]> {

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(
      `HTTP Error: ${response.status}`
    );
  }

  const result: CoinLoreResponse = await response.json();

  if (!Array.isArray(result.data)) {
    throw new Error('Format data API tidak valid');
  }

  const sortedData = [...result.data].sort(
    (a, b) => Number(a.rank) - Number(b.rank)
  );

  return sortedData;
  // return sortedData.slice(0, 7); 
}
