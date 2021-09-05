import random
import itertools
import datetime
import os,sys,inspect
currentdir = os.path.dirname(os.path.abspath \
        (inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0,parentdir)
import constant

def startQuestionnaire():
    '''Navigate to the Multi-Factor Authentication questionnaire.'''
    click("assess.png")
    wait(0.5)
    click("multi_factor_authentication.png")
    wait(0.5)

def readResult():
    '''Use image recognition to identify result.'''
    global result
    wait(3)
    if exists(Pattern("three.png").similar(0.90)):
        result = '3'
    elif exists (Pattern("two.png").similar(0.90)):
        result = '2'
    elif exists(Pattern("one.png").similar(0.90)):
        result = '1'
    elif exists(Pattern("zero.png").similar(0.90)):
        result = '0'
    else:
        result = 'Error!'

def report():
    '''Take screenshot and enter data into Excel.'''
    openApp(constant.SNIPPING_TOOL)
    click("mode.png")
    click("rectangular_snip.png")
    click(Pattern("background.png").targetOffset(28,-7))
    mouseDown(Button.LEFT)
    mouseMove(Pattern("background.png").targetOffset(44,19))
    mouseUp()
    type("c",KEY_CTRL)
    click(Pattern("excel.png").similar(0.88))
    i = 0
    for step in range(15):
        type(currentTest[i])
        i += 1
        type(Key.TAB)
    type(Key.TAB) 
    type(result)
    type(Key.TAB)
    type("v",KEY_CTRL)
    for step in range (rowNo):
        type(Key.PAGE_UP)
    click(Pattern("test_no.png").similar(0.29))
    for step in range (rowNo):
        type(Key.DOWN)
    closeApp(constant.SNIPPING_TOOL)
    type(Key.TAB)
    type(Key.ENTER)
    click(Pattern("minimise.png").similar(0.87))
    click("url.png")
    type("http://localhost:8081/")
    type(Key.ENTER)
    wait(2)

def questionTwo():
    '''Generate a random answer for question two.''' 
    randomNo = []
    #Generate two random integers. 
    def generateRandom():
        for i in range (2): 
            randomNos = (random.randint(0,9))
            randomNo.append(randomNos)
    generateRandom()
    if randomNo[0] == randomNo[1]:
        randomNo = []
        generateRandom()

    x = 0    
    type(Key.PAGE_DOWN*2)
    for i in range (2):
        if randomNo[x] == 0:
            click("passwords.png")
            currentTest.append('A')
        elif randomNo[x] == 1:
            click("security_key.png")
            currentTest.append('B')
        elif randomNo[x] == 2:
            click("password_tokens.png")
            currentTest.append('C')  
        elif randomNo[x] == 3:
            click("biometrics.png")
            currentTest.append('D')
        elif randomNo[x] == 4:
            click("smartcards.png")
            currentTest.append('E') 
        elif randomNo[x] == 5:
            click("mobile_password_token.png")
            currentTest.append('F') 
        elif randomNo[x] == 6:
            click("sms.png")
            currentTest.append('G')
        elif randomNo[x] == 7:
            click("email.png")
            currentTest.append('H')
        elif randomNo[x] == 8:
            click("voice_call.png")
            currentTest.append('I')
        elif randomNo[x] == 9:
            click("software_certificate.png")
            currentTest.append('J')
        x =+ 1
        wait(1)
    wait(0.5)
    click(Pattern("submit.png").targetOffset(0,-6))
    wait(1)

def enterData():
    '''Enter data for questions 1 and 3 into list.'''
    if answer[answerIndex] == 'yes.png':
        currentTest.append('Yes')
    elif answer[answerIndex] == 'no.png':
        currentTest.append('No')
    else:
        currentTest.append('Error!')

def randomAnswer():
    '''Generate random answer for non-core question.''' 
    for questions in range (9):
        #Select random option.
        randomNo = (random.randint(0,1))
        if randomNo == 0:
            click("yes.png")
            currentTest.append('Yes')
        elif randomNo == 1:
            click("no.png")
            currentTest.append('No')
        else:
            currentTest.append('Error!')
        wait(1)

def main():
    #Generate test cases for core questions 1, 3 and 4.
    responses = list(itertools.product([("yes.png"),("no.png")], repeat=3))
    noTestCases = 0 
    for tuples in responses:
        noTestCases += 1 
    print(noTestCases)
    global currentTest
    global rowNo
    global answerIndex
    global answer
    responsesIndex = 0
    answerIndex = 0
    rowNo = 1
    testNo = 1
    time = datetime.datetime.now()

    click(Pattern("excel.png").similar(0.88))
    type(time.strftime("%x"))
    type(Key.TAB*2)
    type(time.strftime("%X"))
    click(Pattern("test_no.png").similar(0.29))
    type(Key.DOWN)
    click(Pattern("minimise.png").similar(0.87))

    for tests in range (noTestCases):
        startQuestionnaire()
        currentTest = []
        currentTest.append(str(testNo))
        for noQuestions in range (3):
                answer = (responses[responsesIndex])
                if answerIndex == 1:
                    questionTwo()
                click(answer[answerIndex])
                wait(1)
                enterData()
                answerIndex += 1
        wait(1)
        randomAnswer()
        answerIndex = 0 
        responsesIndex += 1
        rowNo +=1
        testNo += 1
        readResult()
        report()
    print('Test completed successfully!')
       
main()
