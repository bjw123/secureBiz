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
    hover(Pattern("assess_menu.png").similar(0.89).targetOffset(-110,-2))
    wait(0.5)
    click("user_app_hard.png")

def readResult():
    '''Use image recognition to identify result.'''
    global result
    if exists(Pattern("three.png").similar(0.64)):
        result = '3'
    elif exists (Pattern("two.png").similar(0.64)):
        result = '2'
    elif exists(Pattern("one.png").similar(0.60)):
        result = '1'
    elif exists(Pattern("zero.png").similar(0.60)):
        result = '0'
    else:
        result = 'Error!'

def report():
    '''Take screenshot and enter data into Excel.'''
    openApp(constant.SNIPPING_TOOL)
    click("mode.png")
    click("rectangular_snip.png")
    click(Pattern("result_background.png").similar(0.66).targetOffset(0,61))
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
    click("test_no.png")
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

def randomAnswer():
    '''Generate a random answer for non-core question.'''
    global answerIndex
    yesNo = [5,6,8,9,10,11,12]
    for questions in range (9):
        if any (answerIndex == number for number in yesNo):
            #Select random option.
            randomNo = (random.randint(0,1))
            if randomNo == 0:
                click("yes.png")
                currentTest.append('Yes')
            elif randomNo == 1:
                click("no.png")
                currentTest.append('No')
            wait(1)
        
        elif answerIndex == 7:
            #Select random option.
            randomNo = (random.randint(0,2))
            if randomNo == 0:
                click("yes_two.png")
                currentTest.append('A')
                
            elif randomNo == 1:
                click("no_two.png")
                currentTest.append('B')
            elif randomNo == 2:
                click("no_firewall.png")
                currentTest.append('C')
            wait(1)
            
        elif answerIndex == 13:
            #Select random option.
            randomNo = (random.randint(0,2))
            if randomNo == 0:
                click("yes_three.png")
                currentTest.append('A')
            elif randomNo == 1:
                click("no_three.png")
                currentTest.append('B')
            elif randomNo == 2:
                click("not_clear_history.png")
                currentTest.append('C')
            wait(1)
        answerIndex += 1

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
    click(Pattern("test_no_two.png").similar(0.33))
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