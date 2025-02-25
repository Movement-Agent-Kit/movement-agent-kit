import type { AccountAuthenticator } from "@aptos-labs/ts-sdk"

export type ToolsNameList =
	| "movement_balance"
	| "movement_get_wallet_address"
	| "movement_transfer_token"
	| "movement_burn_token"
	| "movement_get_transaction"
	| "movement_token_details"
	| "movement_mint_token"
	| "movement_create_token"
	| "allora_price_inference_response"
	| "allora_get_all_topics_response"
	| "allora_get_inference_by_topic_id_response"
	| "write_file"
	| "write_file"
	| "write_file"
	| "write_file"
	| "write_file"
	| "write_file"
	| "openai_create_image"


export type SignedTransactionResponse = {
	senderAuthenticator?: AccountAuthenticator
	signature?: Uint8Array<ArrayBufferLike>
}

export interface PythPriceFeedIDItem {
    id: string;
    attributes: {
        asset_type: string;
        base: string;
        display_symbol: string;
    }
}
