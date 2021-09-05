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
    '''Navigate to the User Application Hardening questionnaire.'''
    click("assess.png")
    wait(0.5)
    click("hardening.png")

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
    click("test_no.png")
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

def randomAnswer():
    '''Generate random answer for non-core questions.'''
    for questions in range (9):
        #Generate random integer.
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
    global currentTest
    global rowNo
    global answerIndex
    responsesIndex = 0
    answerIndex = 0
    rowNo = 1
    testNo = 1
    
    #Generate test cases for core questions.
    responses = list(itertools.product([("yes.png"),("no.png")], repeat=5))

    #Calculate number of test cases.
    noTestCases = 0 
    for tuples in responses:
        noTestCases += 1

    click(Pattern("excel.png").similar(0.88))
    type(time.strftime("%x"))
    type(Key.TAB*2)
    type(time.strftime("%X"))
    click("test_no.png")
    type(Key.DOWN)
    click(Pattern("minimise.png").similar(0.87))

    for tests in range (noTestCases):
        startQuestionnaire()
        currentTest = []
        currentTest.append(str(testNo))
        for iteration in range (5):
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
        rowNo += 1
        testNo += 1
        readResult()
        report()
    print('Test completed successfully!')
    
main()