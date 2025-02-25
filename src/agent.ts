import type { AccountAddress, Aptos, MoveStructId } from "@aptos-labs/ts-sdk"
import { AptosPriceServiceConnection } from "@pythnetwork/pyth-aptos-js"
import { AlloraInference, AlloraTopic } from "@alloralabs/allora-sdk";
import { priceFeed } from "./constants/price-feed"
import type { BaseSigner } from "./signers"
import {
	burnNFT,
	burnToken,
	createToken,
	getBalance,
	getTokenDetails,
	getTokenPrice,
	getTransaction,
	mintToken,
	transferNFT,
	transferTokens,
} from "./tools"

import {
	getPriceInference,
	getAllTopics,
	getInferenceByTopicId,
} from "./tools/allora";

import {
	getLatestPools,
	getTokenInfo,
	getTokenPriceData,
	getTopGainers,
	getTrendingPools,
	getTrendingTokens,
} from "./tools/coingecko";

import {
	pingElfaAiApi,
	getElfaAiApiKeyStatus,
	getSmartMentions,
	getTopMentionsByTicker,
	searchMentionsByKeywords,
	getTrendingTokensUsingElfaAi,
	getSmartTwitterAccountStats,
} from "./tools/elfa_ai";

import {
	fetchPythPriceFeedID,
	fetchPythPrice,
} from "./tools/pyth";

import { createImage } from "./tools/openai"


export class AgentRuntime {
	public account: BaseSigner
	public aptos: Aptos
	public config: any

	constructor(account: BaseSigner, aptos: Aptos, config?: any) {
		this.account = account
		this.aptos = aptos
		this.config = config ? config : {}
	}

	async getPythData() {
		const connection = new AptosPriceServiceConnection("https://hermes.pyth.network")

		return await connection.getPriceFeedsUpdateData(priceFeed)
	}

	getBalance(mint?: string | MoveStructId) {
		return getBalance(this, mint)
	}

	getTokenDetails(token: string) {
		return getTokenDetails(token)
	}


	getTokenPrice(query: string) {
		return getTokenPrice(query)
	}

	transferTokens(to: AccountAddress, amount: number, mint: string) {
		return transferTokens(this, to, amount, mint)
	}

	getTransaction(hash: string) {
		return getTransaction(this, hash)
	}

	burnToken(amount: number, mint: string) {
		return burnToken(this, amount, mint)
	}

	createToken(name: string, symbol: string, iconURI: string, projectURI: string) {
		return createToken(this, name, symbol, iconURI, projectURI)
	}

	mintToken(to: AccountAddress, mint: string, amount: number) {
		return mintToken(this, to, mint, amount)
	}


	transferNFT(to: AccountAddress, mint: AccountAddress) {
		return transferNFT(this, to, mint)
	}

	burnNFT(mint: AccountAddress) {
		return burnNFT(this, mint)
	}

	// allora
	async getPriceInference(
		tokenSymbol: string,
		timeframe: string,
	): Promise<string> {
		return getPriceInference(this, tokenSymbol, timeframe);
	}
	async getAllTopics(): Promise<AlloraTopic[]> {
		return getAllTopics(this);
	}
	async getInferenceByTopicId(topicId: number): Promise<AlloraInference> {
		return getInferenceByTopicId(this, topicId);
	}

	// coingeko
	async getCoingeckoLatestPools() {
		return await getLatestPools(this);
	}

	async getTokenInfoUsingCoingecko(tokenAddress: string) {
		return await getTokenInfo(this, tokenAddress);
	}

	async getTokenPriceDataUsingCoingecko(...tokenAddresses: string[]) {
		return await getTokenPriceData(this, tokenAddresses);
	}

	async getTopGainersOnCoingecko(
		duration?: "1h" | "24h" | "7d" | "14d" | "30d" | "60d" | "1y",
		noOfCoins?: 300 | 500 | 1000 | "all",
	) {
		return await getTopGainers(this, duration, noOfCoins);
	}

	async getCoingeckoTrendingPools(duration?: "5m" | "1h" | "24h" | "6h") {
		return await getTrendingPools(this, duration);
	}

	async getTrendingTokensOnCoingecko() {
		return await getTrendingTokens(this);
	}

	// elfa_ai
	async pingElfaAiApi(): Promise<any> {
		const response = await pingElfaAiApi(this);
		return response;
	}

	async getElfaAiApiKeyStatus(): Promise<any> {
		const response = await getElfaAiApiKeyStatus(this);
		return response;
	}

	async getSmartMentions(
		limit: number = 100,
		offset: number = 0,
	): Promise<any> {
		const response = await getSmartMentions(this, limit, offset);
		return response;
	}

	async getTopMentionsByTicker(
		ticker: string,
		timeWindow: string = "1h",
		page: number = 1,
		pageSize: number = 10,
		includeAccountDetails: boolean = false,
	): Promise<any> {
		const response = await getTopMentionsByTicker(
			this,
			ticker,
			timeWindow,
			page,
			pageSize,
			includeAccountDetails,
		);
		return response;
	}

	async searchMentionsByKeywords(
		keywords: string,
		from: number,
		to: number,
		limit: number = 20,
	): Promise<any> {
		const response = await searchMentionsByKeywords(
			this,
			keywords,
			from,
			to,
			limit,
		);
		return response;
	}

	async getTrendingTokens(): Promise<any> {
		const response = await getTrendingTokens(this);
		return response;
	}

	async getTrendingTokensUsingElfaAi(): Promise<any> {
		const response = await getTrendingTokensUsingElfaAi(this);
		return response;
	}

	async getSmartTwitterAccountStats(username: string): Promise<any> {
		const response = await getSmartTwitterAccountStats(this, username);
		return response;
	}

	// pyth
	async getPythPriceFeedID(tokenSymbol: string): Promise<string> {
		return fetchPythPriceFeedID(tokenSymbol);
	}

	async getPythPrice(priceFeedID: string): Promise<string> {
		return fetchPythPrice(priceFeedID);
	}

	// openai
	createImageWithOpenAI(prompt: string, size: "256x256" | "512x512" | "1024x1024", n: number) {
		return createImage(this, prompt, size, n)
	}

}
