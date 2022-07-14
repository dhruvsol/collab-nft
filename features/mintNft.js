import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const wallet = Keypair.generate();
const metaplex = new Metaplex(connection);

async function collabNftMetadata(name, description) {
    const { uri, metadata } = await metaplex.nfts().uploadMetaData({
        name: name,
        description: description,
        image: await metaplex.useMetaplexFileFromBrowser('base64'),
    })

    console.log(metadata.image) // https://arweave.net/123
    console.log(uri) // https://arweave.net/789

    return uri
}

export { collabNftMetadata }