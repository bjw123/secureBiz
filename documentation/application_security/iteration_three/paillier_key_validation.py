print('Paillier Homomorphism Key Validation')
from random import randint
import libnum
import sys

def gcd(a,b):
    #Compute the greatest common divisor of a and b
    while b > 0:
        a, b = b, a % b
    return a
    
def lcm(a, b):
    #Compute the lowest common multiple of a and b
    return a * b // gcd(a, b)

#1.0 Key Generation
#1.1 Select two prime numbers
p=13
q=11

if (p==q):
    print('p and q cannot be the same')
    sys.exit()

#1.2 Calculate n and gLambda
n = p*q
gLambda = lcm(p-1,q-1)

#1.3 Randomy select g
g = randint(20,150)
if (gcd(g,n*n)==1):
    print('g is relatively prime to n*n.')
else:
    print('WARNING: g is NOT relatively prime to n*n.')
    sys.exit()

#1.4 Calculate modular multiplication inverse
l = (pow(g, gLambda, n*n)-1)//n
gMu = libnum.invmod(l, n)

#2.0 Encryption
r = 40
m1=20
m2=5
k1 = pow(g, m1, n*n)
k2 = pow(r, n, n*n)
k3 = pow(g, m2, n*n)
c1 = (k1 * k2) % (n*n)
c2 = (k3 * k2) % (n*n)

#3.0 Evaluation (addition)
c = (c1*c2) % (n*n)

#4.0 Decryption
L = (pow(c, gLambda, n*n)-1) // n
m = (L * gMu) % n

print('public key (n,g) = ' + str(n) + ', ' + str(g))
print('private key (gLambda,gMu) = ' + str(gLambda) + ', ' + str(gMu))
print('c1 = ' + str(c1) + ', c2 = ' + str(c2))
print('result(m) = ' + str(m))


