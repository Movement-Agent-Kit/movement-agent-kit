import { END, START, StateGraph } from "@langchain/langgraph"
import { movementReadNode } from "./agents/movement-read-agent"
import { managerNode, managerRouter } from "./agents/manager"
import { writerNode, writerTool } from "./agents/tweet-writer-agent"
import { postNode, postOnXTool } from "./agents/x-post-agent"
import { StateAnnotation } from "./state"

const workflow = new StateGraph(StateAnnotation)
	.addNode("manager", managerNode)
	.addNode("movementRead", movementReadNode)
	.addNode("tweetWriter", writerNode)
	.addNode("postOnTwitter", postNode)
	.addEdge("tweetWriter", "postOnTwitter")
	.addEdge("movementRead", "tweetWriter")
	.addEdge("movementRead", "postOnTwitter")
	.addEdge(START, "manager")
	.addConditionalEdges("manager", managerRouter)
	//.addEdge("movementRead", END)
	//.addEdge("tweetWriter", END)
	// TODO: need to make sure the prompts recognize postOnTwitter tool before uncommenting above 2 lines
	.addEdge("postOnTwitter", END)

export const graph = workflow.compile()
