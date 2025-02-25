import { type Account, AccountAddress, type AnyRawTransaction, Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk"
import type { InputTransactionData, SignMessagePayload, WalletContextState } from "@aptos-labs/wallet-adapter-react"
import { BaseSigner } from "./base-signer"
import { MOVEMENT_NETWORK_CONFIG, DEFAULT_NETWORK } from "../constants/networks";

export class WalletSigner extends BaseSigner {
	constructor(
		account: Account,
		private readonly wallet: WalletContextState,
		network: Network = Network.CUSTOM
	) {
		const config = new AptosConfig({ 
			network,
			fullnode: MOVEMENT_NETWORK_CONFIG[DEFAULT_NETWORK].fullnode
		})
		const aptos = new Aptos(config)
		super(account, aptos)
	}

	public override getAddress(): AccountAddress {
		const walletAddress = this.wallet?.account?.address
		return walletAddress ? AccountAddress.fromString(walletAddress) : this.account.accountAddress
	}

	async signTransaction(transaction: AnyRawTransaction) {
		const senderAuthenticator = await this.wallet.signTransaction(transaction)
		return {
			senderAuthenticator,
		}
	}

	async sendTransaction(transaction: InputTransactionData): Promise<string> {
		const txHash = await this.wallet.signAndSubmitTransaction(transaction)

		return txHash.hash
	}

	async signMessage(message: SignMessagePayload) {
		return this.wallet.signMessage(message)
	}
}
