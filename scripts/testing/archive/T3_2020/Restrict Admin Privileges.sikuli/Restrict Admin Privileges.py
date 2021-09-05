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
    '''Navigate to the Restrict Admin Privileges.'''
    click("Assess button.png")
    wait(0.5)
    click("restrict.png")
    wait(0.5)

def readResult():
    '''Use image recognition to identify result.'''
    global result
    if exists("Three.png"):
        result = '3'
    elif exists ("two.png"):
        result = '2'
    elif exists("One.png"):
        result = '1'
    elif exists("Zero.png"):
        result = '0'
    else:
        result = 'Error!'

def report():
    '''Take screenshot and enter data into Excel.'''
    openApp(constant.SNIPPING_TOOL)
    click("mode.png")
    click("rectangular_snip.png")
    click(Pattern("1612169618317.png").targetOffset(-72,67))
    mouseDown(Button.LEFT)
    mouseMove(Pattern("report.png").targetOffset(133,-122))
    mouseUp()
    type("c",KEY_CTRL)
    click("Excel.png")
    i = 0
    for step in range(13):
        type(currentTest[i])
        i += 1
        type(Key.TAB)
    type(Key.TAB) 
    type(result)
    type(Key.TAB)
    type("v",KEY_CTRL)
    for step in range (rowNo):
        type(Key.PAGE_UP)
    click("1612178723351.png")
    for step in range (rowNo):
        type(Key.DOWN)
    closeApp(constant.SNIPPING_TOOL)
    type(Key.TAB)
    type(Key.ENTER)
    click("Excel minimise.png")
    click("Address.png")
    type("http://localhost:3000/")
    type(Key.ENTER)
    wait(2)


def randomAnswer():
    '''Generate random answer for non core questions.'''
    for questions in range (7):
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
    #Generate test cases for core questions. 
    responses = list(itertools.product([("yes.png"),("no.png")], repeat=5))
    noTestCases = 0 
    for tuples in responses:
        noTestCases += 1
    global currentTest
    global rowNo
    responsesIndex = 0
    answerIndex = 0
    rowNo = 1
    testNo = 1
    time = datetime.datetime.now()

    click("Excel 2.png")
    type(time.strftime("%x"))
    type(Key.TAB*2)
    type(time.strftime("%X"))
    click(Pattern("test number.png").targetOffset(-2,41))
    click("excel minimise 2.png")

    for tests in range (noTestCases):
        startQuestionnaire()
        currentTest = []
        currentTest.append(str(testNo))
        for noQuestions in range (5):
            answer = (responses[responsesIndex])
            click(answer[answerIndex])
            wait(1)
            if answer[answerIndex] == 'yes.png':
                currentTest.append('Yes')
            elif answer[answerIndex] == 'no.png':
                currentTest.append('No')
            else:
                currentTest.append('Error!')
            answerIndex += 1
        randomAnswer()
        answerIndex = 0 
        responsesIndex += 1
        rowNo +=1
        testNo += 1
        readResult()
        report()
    print('Test completed successfully!')

main()