import { Tool } from "langchain/tools";
import { AgentRuntime } from "../../agent";
import { AlloraGetAllTopicsResponse } from "../../index";

export class MovementAlloraGetAllTopics extends Tool {
  name = "movement_allora_get_all_topics";
  description = `Get all topics from Allora's API
  
    Inputs: None`;

  constructor(private agent: AgentRuntime) {
    super();
  }

  async _call(_: string): Promise<string> {
    try {
      const topics = await this.agent.getAllTopics();

      const response: AlloraGetAllTopicsResponse = {
        status: "success",
        message: "Topics fetched successfully",
        topics,
      };

      return JSON.stringify(response);
    } catch (error: any) {
      const response: AlloraGetAllTopicsResponse = {
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      };
      return JSON.stringify(response);
    }
  }
}
