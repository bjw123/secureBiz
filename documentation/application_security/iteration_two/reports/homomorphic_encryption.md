**Homomorphic Encryption: Feasibility Study**

**Executive Summary**
A short feasibility study was undertaken to evaluate the benefits and risks of using homomorphic encryption within the Secure Biz web application. The study found that homomorphic encryption has the potential to enable third-parties to perform fine grain analytics on user responses whilst protecting user privacy. The logic that is currently used in the database to calculate the user's score for each mitigation strategy is not compatible with homomorphic encryption. However, homomorphic encryption may be applied in other areas of the application or if the application is updated to include a weighted scoring system.

**Definition of Homomorphic Encryption**
Homomorphic encryption relies on the same functions as regular encryption (key generation, encryption and decryption) but offers the added function of evaluation. This allows calculations to be performed on encrypted data.

The diagram below is a simplified version of the four functions used in homomorphic encryption:

1. Key Generation: client generates a public (_pk_) and private (_pk_) key pair to encrypt plaintext (_PT_)
2. Encryption: client generates cipher texts {_PT_}_pk_
3. Evaluation: server uses function _f_ to evaluate cipher texts
4. Decryption: evaluated cipher texts are decrypted by client using _sk_

![](./homomorphic_encryption/diagram.png)
_Homomorphic encryption high-level overview_


There are numerous homomorphic cryptosystems. Researchers including Craig Gentry (2009) have developed fully homomorphic systems that support arbitrary computations on encrypted data. Partially homomorphic cryptosystems only allow select mathematical functions. One example is Pascal Paillier's (1999) additive homomorphism.

A prototype for an electronic voting system, based on the Paillier cryptosystem, was developed by Ben Landers (2020). The prototype was developed in Python and the logic could be used for implementing homomorphic encryption within the Secure Biz web application.

**Application of Homomorphic Encryption for Secure Biz**
Currently, the Secure Biz web application does not record user details. This is for security purposes. If a user's details and responses are recorded in plain text, a data leak could expose their business' security strategy. With homomorphic encryption, user responses can be attributed to an individual's profile whilst protecting privacy and enabling data analytics. For example, third-parties could identify how many registered small businesses with less than five staff use multi-factor authentication. Because the calculations are perfomed on the server-side, these details can be extracted from the databse by a third-party without providing them direct access to the data. Furthermore, the data will remain encrypted at rest. This mitigates the threat of a malicious insider attack.

**Implementation Strategy**
Implementing homomorphic encryption will require the logic in the database of the application to be modified. The following screenshot is an excerpt from the maturity logic used within the _Application Control_ questionnaire.

![](./homomorphic_encryption/logic.png)
_Application Control logic_

If homomorphic encryption is implemented, responses will not be recorded in the MongoDB database with consistent values. For example, two different users could answer 'c' for question 1 in the _Application Control_ questionnaire. This represents a barrier to calculating the maturity logic, as each user's response will be recorded as a different value, such as '287659' and '974290'. With the current framework, a response of 'c' would need to be converted to a numeric value, encrypted and then decrypted before the maturity level can be calculated. This process would be equivilant to using a non-homomorphic encryption standard. Thus negating the benefit of being able to perform calculations on encrypted values. There are, however, alternative solutions and methods for applying homomorphic encryption:

- The team can collect user details, such as their occupation, industry and business size. This data can be encrypted using homomorphic encryption to allow third-parties to perform analytics on the application's userbase.
- The method for calculating the maturity logic could be revised to use weighted values rather than a decision tree model. This, however, is not consistent with the method the Australian Signals Directorate (ASD) use to calculate a user's maturity level. Therefore, weighted values should only be used if the application is transformed into a generic scoring engine. Appendix 1 provides a worked mathematical example of how homomorphic encryption can be used to calculate the sum of two weighted values. This is supported by the script ‘homomorphic_demo.js’. This script is located in the same folder as this report and demonstrates how the logic can be implemented in JavaScript.

**Benefits and Risks**
The following table outlines the benefits and risks of using the Pallier homomorphic encryption system within the Secure Biz web application.
![](./homomorphic_encryption/table.png)

**Recommendations**
Homomorphic encryption will enable detailed analytics by third-parties whilst providing an extra layer of security to user data. Currently, homomorphic encryption is incompatible with the logic used in the MongoDB database to calculate the user's score for each mitigtion strategy. Furthermore, homomorphic encryption is computationally expensive and the current technology stack may be unable to process large datasets. Despite these downsides, future teams should continue to investigate how homomorphic encryption can be used in the application. This includes performing analytics on the userbase and on user responses if a weighted scoring system is introduced.

**Apendix 1**
The following worked example demonstrates how the result of adding two integers (20 and 5) can be performed using the Pallier crypto system. This could be applied to the Secure Biz web application if the application used weighted values rather than a decision tree to calculate the user’s score.

**Variables**
m1 = 20
m2 = 5
p = 11
q = 13
g = 31
r = 40

**Step 1: Compute n**
n = p * q = 11 * 13 = 143

**Step 2: Calculate Lowest Common Multiple (gLambda) - λ (Carmichael function)**
gLambda = lcm(p-1, q-1) = lcm(10, 12) = 60

**Step 3: Encrypt m1 and m2**
Enc(m1) = (g^m1 * r^n) mod n^2 = (31^20 * 40^143) mod 20449 = 1366
K1 = g^m1 mod n^2 = 6436
K2 = r^n mod n^2 = 4226
K3 = g^m2 mod n^2 = 551

Cipher1 = K1 * K2 mod n^2 = 1366
Cipher2 = K3 * K2 mod n^2 = 17789

**Step 4: Add Cipher1 and Cipher2**
CipherTotal = Cipher1 * Cipher2 mod n^2 = 6362

**Step 5: Decrypt**
l = (pow(g, gLambda, n*n)-1//n
l = (31^60 mod 20449)-1//143
l = 19306 // 143
l = 135

gMu = (l mod n)-1
gMu = 135 mod 143 = 125

L = (CipherTotal^60 mod 143*143) // 143
L = 86

Result = (L * gMu) mod n = 86*125 mod 143 = 25