import {
	Metaplex,
	keypairIdentity,
	bundlrStorage,
	useMetaplexFileFromBrowser,
} from '@metaplex-foundation/js'
import { Connection, clusterApiUrl, Keypair, PublicKey } from '@solana/web3.js'
import { create, CID, IPFSHTTPClient } from 'ipfs-http-client'
import Arweave from 'arweave'

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

	console.log('cid--->', cid)
	console.log('url--->', url)

	return url
}

async function collabNftMetadata(name, description, ipfsImage) {
	const connection = new Connection(clusterApiUrl('devnet'))
	const wallet = Keypair.generate()
	const metaplex = new Metaplex(connection).use(keypairIdentity(wallet))

	console.log('name--->', name)
	console.log('description--->', description)
	console.log('image--->', ipfsImage)
	const { uri, metadata } = await metaplex.nfts().uploadMetadata({
		name: name,
		description: description,
		image: 'https://bafkreidmuo5z5e67mnap4jz6l4ckizsgquu536wvkkotvxb5a5w6idfubm.ipfs.nftstorage.link/',
	})

	console.log('uri--->', uri)

	return { uri, metadata }
}

export { uploadImage, uploadImageToArweave, collabNftMetadata }
