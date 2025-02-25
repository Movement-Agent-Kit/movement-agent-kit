import { createReactAgent } from "@langchain/langgraph/prebuilt"
import {
	MovementAccountAddressTool,
	MovementBalanceTool,
	MovementGetTokenDetailTool,
	MovementGetTokenPriceTool,
	MovementTransactionTool,
} from "../../../../src/langchain"
import { setupAgentKit } from "../agent"
import { StateAnnotation } from "../state"

export const createMovementReadAgent = async () => {
	const { agentRuntime, llm } = await setupAgentKit()

	const readAgentTools = [
		new MovementBalanceTool(agentRuntime),
		new MovementGetTokenDetailTool(agentRuntime),
		new MovementAccountAddressTool(agentRuntime),
		new MovementTransactionTool(agentRuntime),
		new MovementGetTokenPriceTool(agentRuntime),
	]

	const readAgent = createReactAgent({
		tools: readAgentTools,
		llm: llm,
	})

	return readAgent
}

export const movementReadNode = async (state: typeof StateAnnotation.State) => {
	const { messages } = state

	const readAgent = await createMovementReadAgent()

	const result = await readAgent.invoke({ messages })

	return {
		messages: [...result.messages],
	}
}
