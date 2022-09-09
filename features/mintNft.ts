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
	PublicKeyInitData,
} from '@solana/web3.js'
import { create, CID, IPFSHTTPClient } from 'ipfs-http-client'
import Arweave from 'arweave'
import { CreateNftOutput, Metaplex, MetaplexFile, Nft } from '@metaplex-foundation/js'


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

async function collabNftMetadata(name: string, description: string, ipfsImage: MetaplexFile, metaplex: Metaplex) {
	try {
		const { uri } = await metaplex.nfts().uploadMetadata({
			name: name,
			description: description,
			image: ipfsImage,
		}).run();
		console.log('metadata uploaded', uri)
		return { uri }
	} catch (error) {
		console.error('Metadata upload error ', error)
	}
}

async function creteNfts(metadata: any, title: string, metaplex: Metaplex, members) {	
	members.forEach(async (member: { memberAddress: PublicKey; nft: CreateNftOutput }) => {
		console.log(member.memberAddress);
		const address = new PublicKey(member.memberAddress);
		const b= await metaplex.nfts().create({
			uri: metadata,
			tokenOwner: address, 
			name: title,
			sellerFeeBasisPoints: 0,
		}).run();
	})

}

export {
	uploadImage,
	uploadImageToArweave,
	collabNftMetadata,
	creteNfts,
	airdropSol,
}
