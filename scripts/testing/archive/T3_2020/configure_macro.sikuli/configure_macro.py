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
    '''Navigate to the Configure Macros questionnaire.'''
    wait(1)
    hover(Pattern("assess_menu.png").similar(0.89).targetOffset(-110,-2))
    wait(1)
    click(Pattern("macro_settings.png").targetOffset(89,0))

def readResult():
    '''Use image recognition to identify result.'''
    global result
    if exists(Pattern("three.png").similar(0.80)):
        result = '3'
    elif exists (Pattern("two.png").similar(0.80)):
        result = '2'
    elif exists("one.png"):
        result = '1'
    elif exists(Pattern("zero.png").similar(0.80)):
        result = '0'
    else:
        result = 'Error!'

def report():
    '''Take screenshot and enter data into Excel.'''
    openApp(constant.SNIPPING_TOOL)
    click("mode.png")
    click("rectangular_snip.png")
    click(Pattern("result_background.png").targetOffset(2,80))
    mouseDown(Button.LEFT)
    mouseMove(Pattern("result_background_two.png").targetOffset(115,-94))
    mouseUp()
    type("c",KEY_CTRL)
    click(Pattern("excel.png").similar(0.88))
    i = 0
    for step in range(10):
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
    
    #Create three sets of lists with every 'yes', 'no' permutation for 3 questions.
    buttonsOne = list(itertools.product([("yes.png"),("no.png")], repeat=2))
    buttonsTwo = list(itertools.product([("yes.png"),("no.png")], repeat=2))
    buttonsThree = list(itertools.product([("yes.png"),("no.png")], repeat=2))

    #Insert either answer A, B or C for question 1 into each tuple.
    buttonsOneIndex = 0
    for tuples in range(4):
        buttonsOne[buttonsOneIndex] = buttonsOne[buttonsOneIndex][:0] + \
        ("answer_one.png",) + buttonsOne[buttonsOneIndex]
        buttonsOneIndex += 1
     
    buttonsTwoIndex = 0
    for tuples in range(4):
        buttonsTwo[buttonsTwoIndex] = buttonsTwo[buttonsTwoIndex][:0] + \
        ("answer_two.png",) + buttonsTwo[buttonsTwoIndex]
        buttonsTwoIndex += 1
     
    buttonsThreeIndex = 0
    for tuples in range(4):
        buttonsThree[buttonsThreeIndex] = buttonsThree[buttonsThreeIndex][:0] + \
        ("answer_three.png",) + buttonsThree[buttonsThreeIndex]
        buttonsThreeIndex += 1
     
    #Add buttonsTwo and buttonsThree list to buttonsOne list.
    for tuples in buttonsTwo:
      buttonsOne.append(tuples)

    for tuples in buttonsThree:
      buttonsOne.append(tuples)

    #Calculate number of test cases.
    noTestCases = 0 
    for tuples in buttonsOne:
        noTestCases += 1 

def randomAnswer():
    '''Generate random answer for non-core question.'''
    for questions in range (6):
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
            elif answer[answerIndex] == 'answer_one.png':
                currentTest.append('A')
            elif answer[answerIndex] == 'answer_two.png':
                currentTest.append('B')
            elif answer[answerIndex] == 'answer_three.png':
                currentTest.append('C')
            else:
                currentTest.append('No')
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