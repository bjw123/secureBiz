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
    '''Navigate to the Daily Backups questionnaire.'''
    wait(1)
    hover(Pattern("assess_menu.png").similar(0.89).targetOffset(-110,-2))
    wait(1)
    click("daily_backups.png")

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
    click(Pattern("result_background.png").targetOffset(-1,60))
    mouseDown(Button.LEFT)
    mouseMove(Pattern("result_background_two.png").targetOffset(99,-99))
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

def generateTestCases():
    '''Generate all test cases and save to list called responsesOne.'''
    global responsesOne
    global noTestCases
    #Create four sets of lists with every 'yes', 'no' permutation for 3 questions.
    buttonsOne = list(itertools.product([("yes.png"),("no.png")], repeat=3))
    print(buttonsOne)

    buttonsTwo = list(itertools.product([("yes.png"),("no.png")], repeat=3))
    print(buttonsTwo)

    buttonsThree = list(itertools.product([("yes.png"),("no.png")], repeat=3))
    print(buttonsThree)

    buttonsFour = list(itertools.product([("yes.png"),("no.png")], repeat=3))

    #Insert either answer A,B,C or D for question 3 into each tuple.
    buttonsOneIndex = 0
    for tuples in range(8):
        buttonsOne[buttonsOneIndex] = buttonsOne[buttonsOneIndex][:0] + \
        ("quarterly.png",) + buttonsOne[buttonsOneIndex]
        buttonsOneIndex += 1
        
    buttonsTwoIndex = 0
    for tuples in range(8):
        buttonsTwo[buttonsTwoIndex] = buttonsTwo[buttonsTwoIndex][:0] + \
        ("bi_annual.png",) + buttonsTwo[buttonsTwoIndex]
        buttonsTwoIndex += 1
     
    buttonsThreeIndex = 0
    for tuples in range(8):
        buttonsThree[buttonsThreeIndex] = buttonsThree[buttonsThreeIndex][:0] + \
        ("annual.png",) + buttonsThree[buttonsThreeIndex]
        buttonsThreeIndex += 1
 
    buttonsFourIndex = 0
    for tuples in range(8):
        buttonsFour[buttonsFourIndex] = buttonsFour[buttonsFourIndex][:0] + \
        ("no_test.png",) + buttonsFour[buttonsFourIndex]
        buttonsFourIndex += 1
    
    #Add buttonsTwo and buttonsThree list to buttonsOne list.
    for tuples in buttonsTwo:
      buttonsOne.append(tuples)

    for tuples in buttonsThree:
      buttonsOne.append(tuples)

    for tuples in buttonsFour:
      buttonsOne.append(tuples)

    responsesOne = buttonsOne[:]
    responsesTwo = buttonsOne[:]
    responsesThree = buttonsOne[:]

    #Insert either answer A,B or C for question 2 into each tuple.
    responsesOneIndex = 0
    for tuples in range(32):
        responsesOne[responsesOneIndex] = responsesOne[responsesOneIndex][:0] + \
        ("three_months.png",) + responsesOne[responsesOneIndex]
        responsesOneIndex += 1

    responsesTwoIndex = 0
    for tuples in range(32):
        responsesTwo[responsesTwoIndex] = responsesTwo[responsesTwoIndex][:0] + \
        ("between_one_and_three.png",) + responsesTwo[responsesTwoIndex]
        responsesTwoIndex += 1
    
    responsesThreeIndex = 0
    for tuples in range(32):
        responsesThree[responsesThreeIndex] = responsesThree[responsesThreeIndex][:0] + \
        ("less_than_one.png",) + responsesThree[responsesThreeIndex]
        responsesThreeIndex += 1
    
    #Add responsesTwo and responsesThree list to responsesOne list.
    for tuples in responsesTwo:
        responsesOne.append(tuples)

    for tuples in responsesThree:
        responsesOne.append(tuples)
    
    noTestCases = 0 
    for tuples in responsesOne:
        noTestCases += 1 
    print(noTestCases)

def randomAnswer():
    '''Generate random answers for non-core questions.'''
    for questions in range (8):
        #Select random answer for questions 7 - 14.
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
    global answer
    #User selects test 1 - 4.
    test = input("Select 1 - 4")
    if test == '1':
        Q1answer = "daily.png"
        Q1data = 'A'
        version = 'Test 1 of 4'
    if test == '2':
        Q1answer = "weekly.png"
        Q1data = 'B'
        version = 'Test 2 of 4'
    if test == '3':
        Q1answer = "monthly.png"
        Q1data = 'C'
        version = 'Test 3 of 4'
    if test == '4':
        Q1answer = "more_than_monthly.png"
        Q1data = 'D'
        version = 'Test 4 of 4'
    global currentTest
    global rowNo
    generateTestCases()
    responsesIndex = 0
    answerIndex = 0
    rowNo = 1
    testNo = 1

    click(Pattern("excel.png").similar(0.88))
    type(version)
    type(Key.TAB*10)
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
        wait(1)
        click(Q1answer)
        currentTest.append(Q1data)
        wait(1)
        for noQuestions in range (5):
            answer = (responsesOne[responsesIndex])
            click(answer[answerIndex])
            wait(1)
            if answer[answerIndex] == 'yes.png':
                currentTest.append('Yes')
            elif answer[answerIndex] == 'no.png':
                currentTest.append('No')
            elif answer[answerIndex] == 'quarterly.png':
                currentTest.append('A')
            elif answer[answerIndex] == 'three_months.png':
                currentTest.append('A')
            elif answer[answerIndex] == 'bi_annual.png':
                currentTest.append('B')
            elif answer[answerIndex] == 'between_one_and_three.png':
                currentTest.append('B')
            elif answer[answerIndex] == 'annual.png':
                currentTest.append('C')
            elif answer[answerIndex] == 'less_than_one.png':
                currentTest.append('C')
            elif answer[answerIndex] == 'no_test.png':
                currentTest.append('D')
            else:
                currentTest.append('Error!')
            answerIndex += 1
        randomAnswer()
        answerIndex = 0
        responsesIndex +=1
        print(responsesIndex)
        rowNo +=1
        testNo += 1
        readResult()
        report()
    print('Test completed successfully!')

main()