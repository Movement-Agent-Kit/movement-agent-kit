// src/signers/local-signer.ts

import { type Account, type AnyRawTransaction, Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk"
import { BaseSigner } from "./base-signer"
import { MOVEMENT_NETWORK_CONFIG, DEFAULT_NETWORK } from "../constants/networks";

export class LocalSigner extends BaseSigner {
	constructor(account: Account, network: Network = Network.CUSTOM) {
		const config = new AptosConfig({ 
			network,
			fullnode: MOVEMENT_NETWORK_CONFIG[DEFAULT_NETWORK].fullnode
		})
		const aptos = new Aptos(config)
		super(account, aptos)
	}

	async signTransaction(transaction: AnyRawTransaction) {
		const senderAuthenticator = this.aptos.transaction.sign({
			signer: this.account,
			transaction,
		})

		return {
			senderAuthenticator,
		}
	}

	async sendTransaction(transaction: AnyRawTransaction) {
		const signedTx = await this.signTransaction(transaction)

		const submittedTx = await this.aptos.transaction.submit.simple({
			transaction,
			senderAuthenticator: signedTx.senderAuthenticator,
		})

		const result = await this.aptos.waitForTransaction({
			transactionHash: submittedTx.hash,
		})

		return result.hash
	}

	async signMessage(message: any): Promise<string> {
		const signedMessage = this.account.signWithAuthenticator(message)

		return signedMessage.toString()
	}
}
