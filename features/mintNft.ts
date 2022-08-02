import {
	Metaplex,
	keypairIdentity,
	bundlrStorage,
	mockStorage,
	useMetaplexFileFromBrowser,
	BundlrStorageDriver,
} from '@metaplex-foundation/js'
import {
	Connection,
	clusterApiUrl,
	Keypair,
	PublicKey,
	LAMPORTS_PER_SOL,
} from '@solana/web3.js'
import { create, CID, IPFSHTTPClient } from 'ipfs-http-client'
import Arweave from 'arweave'

const connection = new Connection(clusterApiUrl('devnet'))
const wallet = Keypair.generate()

async function airdropSol() {
	const airdropSignature = await connection.requestAirdrop(
		wallet.publicKey,
		LAMPORTS_PER_SOL
	)
	const rx = await connection.confirmTransaction(airdropSignature)
	console.log('sols airdropped', rx)
}

const metaplex = Metaplex.make(connection)
	.use(keypairIdentity(wallet))
	.use(mockStorage())

async function uploadImageToArweave(dataSrc) {
	const arweave = Arweave.init({})
	const key = await arweave.wallets.generate()
	const transaction = await arweave.createTransaction(
		{
			data: Buffer.from(
				dataSrc.replace('data:image/png;base64,', ''),
				'base64'
			),
		},
		key
	)
	console.log(transaction)
	const signedTxn = await arweave.transactions.sign(transaction, key)
	console.log(signedTxn)
	let uploader = await arweave.transactions.getUploader(transaction)
	while (!uploader.isComplete) {
		await uploader.uploadChunk()
		console.log(
			`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
		)
	}

	// console.log('uploaded to arwaeve', signedTxn)
}

async function uploadImage(dataSrc) {
	let ipfs: IPFSHTTPClient | undefined
	try {
		ipfs = create({
			url: 'https://ipfs.infura.io:5001/api/v0',
		})
	} catch (error) {
		console.error('IPFS error ', error)
		ipfs = undefined
	}

	const result = await (ipfs as IPFSHTTPClient).add(
		Buffer.from(dataSrc.replace('data:image/png;base64,', ''), 'base64')
	)
	const cid = result.cid
	const path = result.path
	const url = `https://ipfs.infura.io/ipfs/${path}`

	return url
}

async function collabNftMetadata(name, description, ipfsImage) {
	try {
		const { uri } = await metaplex.nfts().uploadMetadata({
			name: name,
			description: description,
			image: 'https://bafkreidmuo5z5e67mnap4jz6l4ckizsgquu536wvkkotvxb5a5w6idfubm.ipfs.nftstorage.link/',
		})
		console.log('metadata uploaded', uri)
		return { uri }
	} catch (error) {
		console.error('Metadata upload error ', error)
	} // const bundlrStorage = metaplex.storage().driver() as BundlrStorageDriver
}

async function creteNfts(metadata, title) {
	const { nft } = await metaplex.nfts().create({
		uri: metadata,
		name: title,
		sellerFeeBasisPoints: 0,
	})

	return { nft }
}

export {
	uploadImage,
	uploadImageToArweave,
	collabNftMetadata,
	creteNfts,
	airdropSol,
}
