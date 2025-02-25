import {
    AlloraAPIClient,
    AlloraAPIClientConfig,
    AlloraTopic,
    ChainSlug,
  } from "@alloralabs/allora-sdk";
  import type { AgentRuntime } from "../../agent"
  
  export async function getAllTopics(
    agent: AgentRuntime,
  ): Promise<AlloraTopic[]> {
    try {
      const chainSlug =
        agent.config.ALLORA_NETWORK === "mainnet"
          ? ChainSlug.MAINNET
          : ChainSlug.TESTNET;
      const apiKey = agent.config.ALLORA_API_KEY || "";
      const apiUrl = agent.config.ALLORA_API_URL || "";
  
      const config: AlloraAPIClientConfig = {
        apiKey: apiKey,
        chainSlug: chainSlug,
        baseAPIUrl: apiUrl,
      };
      const client = new AlloraAPIClient(config);
  
      const topics = await client.getAllTopics();
  
      return topics;
    } catch (error: any) {
      throw new Error(`Error fetching topics from Allora: ${error.message}`);
    }
  }