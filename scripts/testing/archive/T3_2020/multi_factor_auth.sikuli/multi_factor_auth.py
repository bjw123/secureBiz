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
    hover(Pattern("assess_menu.png").similar(0.89).targetOffset(-110,2))
    wait(0.5)
    click("multi_factor.png")
    wait(0.5)

def readResult():
    '''Use image recognition to identify result.'''
    global result
    if exists(Pattern("three.png").similar(0.79)):
        result = '3'
    elif exists ("two.png"):
        result = '2'
    elif exists("one.png"):
        result = '1'
    elif exists("zero.png"):
        result = '0'
    else:
        result = 'Error!'

def report():
    '''Take screenshot and enter data into Excel.'''
    openApp(constant.SNIPPING_TOOL)
    click("mode.png")
    click("rectangular_snip.png")
    click(Pattern("result_background.png").targetOffset(4,60))
    mouseDown(Button.LEFT)
    mouseMove(Pattern("result_background_two.png").targetOffset(115,-94))
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
    type("http://localhost:3000/")
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
    for i in range (2):
        if randomNo[x] == 0:
            click(Pattern("six_characters.png").targetOffset(-172,0))
            currentTest.append('A')
        elif randomNo[x] == 1:
            click(Pattern("universal_second_factor.png").targetOffset(-172,0))
            currentTest.append('B')
        elif randomNo[x] == 2:
            click(Pattern("one_time_token.png").similar(0.75).targetOffset(-154,-1))
            currentTest.append('C')  
        elif randomNo[x] == 3:
            click(Pattern("biometrics.png").targetOffset(-95,-1))
            currentTest.append('D')
        elif randomNo[x] == 4:
            click(Pattern("smart_cards.png").targetOffset(-70,-1))
            currentTest.append('E') 
        elif randomNo[x] == 5:
            click(Pattern("mobile_app_token.png").similar(0.78).targetOffset(-171,0))
            currentTest.append('F') 
        elif randomNo[x] == 6:
            click(Pattern("sms.png").targetOffset(-65,-1))
            currentTest.append('G')
        elif randomNo[x] == 7:
            click(Pattern("emails.png").similar(0.89).targetOffset(-30,-1))
            currentTest.append('H')
        elif randomNo[x] == 8:
            click(Pattern("voice_call.png").targetOffset(-99,0))
            currentTest.append('I')
        elif randomNo[x] == 9:
            click(Pattern("software_certificate.png").targetOffset(-91,0))
            currentTest.append('J')
        x =+ 1
        wait(1)
    type(Key.PAGE_DOWN*2)
    wait(0.5)
    click("next.png")
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
    click(Pattern("test_no_two.png").similar(0.36).targetOffset(0,52))
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
