import type { AgentRuntime } from "../agent"
import { MovementAccountAddressTool } from "./account"
import {
	MovementBalanceTool,
	MovementBurnTokenTool,
	MovementCreateTokenTool,
	MovementGetTokenDetailTool,
	MovementGetTokenPriceTool,
	MovementMintTokenTool,
	MovementTransactionTool,
	MovementTransferTokenTool,
} from "./movement"
import {
	LiquidSwapAddLiquidityTool,
	LiquidSwapCreatePoolTool,
	LiquidSwapRemoveLiquidityTool,
	LiquidSwapSwapTool,
} from "./liquidswap"

import type { ToolsNameList } from "../types"
import {
	EchelonBorrowTokenTool,
	EchelonLendTokenTool,
	EchelonRepayTokenTool,
	EchelonWithdrawTokenTool,
} from "./echelon"
import {
	MovementAlloraGetAllTopics,
	MovementAlloraGetInferenceByTopicId,
	MovementAlloraGetPriceInference,
} from "./allora"

// import { CoingeckoGetLatestPoolsTool } from "./coingecko"
import { ElfaPingTool, ElfaApiKeyStatusTool, ElfaGetMentionsTool, ElfaGetTopMentionsTool,ElfaSearchMentionsTool, ElfaAccountSmartStatsTool, ElfaTrendingTokensTool } from "./elfa_ai"
import { OpenAICreateImageTool } from "./openai"

export const createMovementTools = (agent: AgentRuntime, config: { filter?: ToolsNameList[] } = {}) => {
	const tools = [
		// Movement tools
		new MovementBalanceTool(agent),
		new MovementAccountAddressTool(agent),
		new MovementTransferTokenTool(agent),
		// new MovementBurnNFTTool(agent),
		new MovementBurnTokenTool(agent),
		// new MovementTransferNFTTool(agent),
		new MovementTransactionTool(agent),
		new MovementGetTokenDetailTool(agent),
		new MovementMintTokenTool(agent),
		new MovementCreateTokenTool(agent),
		new MovementGetTokenPriceTool(agent),
		// LiquidSwap tools
		// new LiquidSwapCreatePoolTool(agent),
		// new LiquidSwapAddLiquidityTool(agent),
		// new LiquidSwapRemoveLiquidityTool(agent),
		// new LiquidSwapSwapTool(agent),
		
		// OpenAI tools
		new OpenAICreateImageTool(agent),

		// Allora tools
		new MovementAlloraGetAllTopics(agent),
		new MovementAlloraGetInferenceByTopicId(agent),
		new MovementAlloraGetPriceInference(agent),

		// Coingecko tools
		// new CoingeckoGetLatestPoolsTool(agent),
		
		// Echelon tools
		// new EchelonLendTokenTool(agent),
		// new EchelonWithdrawTokenTool(agent),
		// new EchelonRepayTokenTool(agent),
		// new EchelonBorrowTokenTool(agent),

		// Elfa.AI tools
		new ElfaPingTool(agent),
		new ElfaApiKeyStatusTool(agent),
		new ElfaGetMentionsTool(agent),
		new ElfaGetTopMentionsTool(agent),
		new ElfaSearchMentionsTool(agent),
		new ElfaAccountSmartStatsTool(agent),
		new ElfaTrendingTokensTool(agent),
	]

	return config.filter ? tools.filter((tool) => config?.filter?.includes(tool.name as ToolsNameList)) : tools
}

export * from "./account"
export * from "./movement"
export * from "./echelon"
export * from "./liquidswap"
export * from "./openai"
export * from "./allora"
export * from "./elfa_ai"
