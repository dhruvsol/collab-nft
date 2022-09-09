// import {
// 	Metaplex,
// 	keypairIdentity,
// 	bundlrStorage,
// 	mockStorage,
// 	useMetaplexFileFromBrowser,
// 	BundlrStorageDriver,
// 	walletAdapterIdentity,
// } from '@metaplex-foundation/js'
import {
	Connection,
	clusterApiUrl,
	Keypair,
	PublicKey,
	LAMPORTS_PER_SOL,
} from '@solana/web3.js'
import { create, CID, IPFSHTTPClient } from 'ipfs-http-client'
import Arweave from 'arweave'
import { Metaplex, Nft } from '@metaplex-foundation/js'


async function airdropSol(wallet, connection) {
	const airdropSignature = await connection.requestAirdrop(
		wallet.publicKey,
		LAMPORTS_PER_SOL
	)
	const rx = await connection.confirmTransaction(airdropSignature)
	console.log('sols airdropped', rx)
}

async function uploadImageToArweave(dataSrc) {
	// const arweave = Arweave.init({})
	// const key = await arweave.wallets.generate()
	// const transaction = await arweave.createTransaction(
	// 	{
	// 		data: Buffer.from(
	// 			dataSrc.replace('data:image/png;base64,', ''),
	// 			'base64'
	// 		),
	// 	},
	// 	key
	// )
	// console.log(transaction)
	// const signedTxn = await arweave.transactions.sign(transaction, key)
	// console.log(signedTxn)
	// let uploader = await arweave.transactions.getUploader(transaction)
	// while (!uploader.isComplete) {
	// 	await uploader.uploadChunk()
	// 	console.log(
	// 		`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
	// 	)
	// }

	// console.log('uploaded to arwaeve', signedTxn)
	const image = dataSrc.replace('data:image/png;base64,', '');
	const response = await fetch("http://localhost:5001/api/uploadtoarweave", {
		method: "POST",
		body: JSON.stringify({
			x: image
		}),
		headers: {
			'Content-Type': 'application/json'
		  },
	})
	const uri = (await response.json()).uri
    console.log(uri)
	return uri;
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

async function collabNftMetadata(name: string, description: string, ipfsImage: any, metaplex: Metaplex) {
	try {
		const { uri } = await metaplex.nfts().uploadMetadata({
			name: name,
			description: description,
			image: 'https://collab-nft.infura-ipfs.io/ipfs/QmUEhyi65WGaEUW9HmSWmzH91HeUMiCzin3Eqmj3zxDWia',
		}).run();
		console.log('metadata uploaded', uri)
		return { uri }
	} catch (error) {
		console.error('Metadata upload error ', error)
	}
}

async function creteNfts(metadata: any, title: string, metaplex: Metaplex, members) {	
	console.log(members);
	const owner = new PublicKey("AGdZqUDzmXZYMkmv17d2MevwsNyNYkLjUsbq19eZcawg");
	const anotherOwner = new PublicKey("E5YMfUvCghB6Ynjx1kAREceoUdGn4SjATp9ohzKwua6J");
	const first = await metaplex.nfts().create({
		uri: metadata,
		tokenOwner: owner, 
		name: title,
		sellerFeeBasisPoints: 0,
	}).run();
	const x = await metaplex.nfts().create({
		uri: metadata,
		tokenOwner: anotherOwner, 
		name: title,
		sellerFeeBasisPoints: 0,
	}).run();
	console.log(x);

	return { first }
}

export {
	uploadImage,
	uploadImageToArweave,
	collabNftMetadata,
	creteNfts,
	airdropSol,
}
