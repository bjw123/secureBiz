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
    '''Navigate to the Patch Applications questionnaire.'''
    wait(1)
    hover(Pattern("assess_menu.png").similar(0.89).targetOffset(-110,-2))
    wait(1)
    click("patch_applications.png")
    wait(0.5)

def readResult():
    '''Use image recognition to identify result.'''
    global result
    if exists(Pattern("three.png").similar(0.80)):
        result = '3'
    elif exists (Pattern("two.png").similar(0.80)):
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
    click(Pattern("result_background.png").targetOffset(0,61))
    mouseDown(Button.LEFT)
    mouseMove(Pattern("result_background_two.png").targetOffset(100,-99))
    mouseUp()
    type("c",KEY_CTRL)
    click(Pattern("excel.png").similar(0.88))
    i = 0
    for step in range(14):
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

def generateTestCases():
    '''Generate all test cases and save to list called buttonsOne.'''
    global buttonsOne
    global noTestCases
    
    #Create four sets of lists with every 'yes', 'no' permutation for 2 questions.
    buttonsOne = list(itertools.product([("yes.png"),("no.png")], repeat=2))
    
    buttonsTwo = list(itertools.product([("yes.png"),("no.png")], repeat=2))
    
    buttonsThree = list(itertools.product([("yes.png"),("no.png")], repeat=2)) 
    
    buttonsFour = list(itertools.product([("yes.png"),("no.png")], repeat=2))

    #Insert either answer A, B, C or D into each tuple.
    buttonsOneIndex = 0
    for tuples in range(4):
        buttonsOne[buttonsOneIndex] = buttonsOne[buttonsOneIndex][:0] + \
        ("forty_eight_hours.png",) + buttonsOne[buttonsOneIndex]
        buttonsOneIndex += 1
     
    buttonsTwoIndex = 0
    for tuples in range(4):
        buttonsTwo[buttonsTwoIndex] = buttonsTwo[buttonsTwoIndex][:0] + \
        ("two_weeks.png",) + buttonsTwo[buttonsTwoIndex]
        buttonsTwoIndex += 1
     
    buttonsThreeIndex = 0
    for tuples in range(4):
        buttonsThree[buttonsThreeIndex] = buttonsThree[buttonsThreeIndex][:0] + \
        ("one_month.png",) + buttonsThree[buttonsThreeIndex]
        buttonsThreeIndex += 1
 
    buttonsFourIndex = 0
    for tuples in range(4):
        buttonsFour[buttonsFourIndex] = buttonsFour[buttonsFourIndex][:0] + \
        ("greater_one_month.png",) + buttonsFour[buttonsFourIndex]
        buttonsFourIndex += 1
     
    #Add buttonsTwo, buttonsThree and buttonsFour list to buttonsOne list.
    for tuples in buttonsTwo:
      buttonsOne.append(tuples)

    for tuples in buttonsThree:
      buttonsOne.append(tuples)

    for tuples in buttonsFour:
      buttonsOne.append(tuples)
    
    #Count tuples in buttonsOne list to calculate number of test cases.
    noTestCases = 0 
    for tuples in buttonsOne:
        noTestCases += 1 

def randomAnswer():
    '''Generate a random answer for non-core questions.'''
    for questions in range (10):
        #Select random option.
        randomNo = (random.randint(0,1))
        if randomNo == 0:
            click("yes-1.png")
            currentTest.append('Yes')
        elif randomNo == 1:
            click("no-1.png")
            currentTest.append('No')
        else:
            currentTest.append('Error!')
        wait(1)

def main():
    global currentTest
    global rowNo
    generateTestCases()
    responsesIndex = 0
    answerIndex = 0
    rowNo = 1
    testNo = 1

    click(Pattern("excel.png").similar(0.88))
    type(time.strftime("%x"))
    type(Key.TAB*2)
    type(time.strftime("%X"))
    click("test_no_two.png")
    type(Key.DOWN)
    click(Pattern("minimise.png").similar(0.87))

    for tests in range (noTestCases):
        startQuestionnaire()
        currentTest = []
        currentTest.append(str(testNo))
        for noQuestions in range (3):
            answer = (buttonsOne[responsesIndex])
            click(answer[answerIndex])
            wait(1)
            if answer[answerIndex] == 'yes.png':
                currentTest.append('Yes')
            elif answer[answerIndex] == 'no.png':
                currentTest.append('No')
            elif answer[answerIndex] == 'forty_eight_hours.png':
                currentTest.append('A')
            elif answer[answerIndex] == 'two_weeks.png':
                currentTest.append('B')
            elif answer[answerIndex] == 'one_month.png':
                currentTest.append('C')
            elif answer[answerIndex] == 'greater_one_month.png':
                currentTest.append('D')
            elif answer[answerIndex] == 'no.png':
                currentTest.append('No')
            else:
                currentTest.append('Error!')
            answerIndex += 1
        randomAnswer()
        answerIndex = 0 
        responsesIndex +=1
        rowNo +=1
        testNo += 1
        readResult()
        report()
    print('Test completed successfully!')

main()