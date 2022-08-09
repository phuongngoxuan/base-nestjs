export class Token {
  id: string;
  symbol: string;
}

export class PriceUniV3Dto {
  id: string;
  date: number;
  token: Token;
  priceUSD: string;
}
