//This script requires the bigint-paillier package
//Visit https://github.com/juanelas/paillier-bigint

const paillierBigint = require('paillier-bigint')

async function paillierTest () {
  // Create public/private keys
  const publicKey = new paillierBigint.PublicKey(323n, 63n)
  const privateKey = new paillierBigint.PrivateKey(144n, 250n, publicKey)
  
  //Optionially, use inbuilt function to generate random keys
  //const { publicKey, privateKey } = await paillierBigint.generateRandomKeys(3072)
	
  // Define two integers
  const m1 = 20
  const m2 = 5
  console.log('m1 = '+m1)
  console.log('m2 = '+m2)

  // Encrypt integers
  const c1 = publicKey.encrypt(m1)
  const c2 = publicKey.encrypt(m2)
  console.log('c1 = '+c1)
  console.log('c1 = '+c2)
  
  // Homomorphic addition of two ciphertexts (encrypted integers)
  const encryptedSum = publicKey.addition(c1, c2)
  console.log('Encrypted sum = ' + encryptedSum)
  
  // Decrypt encrypted sum
  const decryptedSum = privateKey.decrypt(encryptedSum)
  console.log('Decrypted sum = ' + decryptedSum)
}
paillierTest()