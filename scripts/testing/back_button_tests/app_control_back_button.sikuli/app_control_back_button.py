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
    '''Navigate to Application Control questionnaire.'''
    wait(1)
    click("assess.png")
    wait(1)
    click("app_control.png")

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
    click(Pattern("background.png").targetOffset(24,-8))
    mouseDown(Button.LEFT)
    mouseMove(Pattern("background.png").targetOffset(63,26))
    mouseUp()
    type("c",KEY_CTRL)
    click(Pattern("excel.png").similar(0.88))
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
    click("test_no.png")
    for step in range (rowNo):
        type(Key.DOWN)
    closeApp(constant.SNIPPING_TOOL)
    type(Key.TAB)
    type(Key.ENTER)
    click(Pattern("minimise.png").similar(0.87))
    click("secure_biz.png")
    wait(5)

def generateTestCases():
    '''Generate all test cases and save to list called buttonsOne.'''
    global responsesOne
    global noTestCases
    
    #Create three sets of lists with every 'yes', 'no' permutation for 2 questions.
    buttonsOne = list(itertools.product([("yes.png"),("no.png")], repeat=1))

    buttonsTwo = list(itertools.product([("yes.png"),("no.png")], repeat=1))

    buttonsThree = list(itertools.product([("yes.png"),("no.png")], repeat=1))
    

    #Insert either answer A, B or C for question 1 into each tuple.
    buttonsOneIndex = 0
    for tuples in range(2):
        buttonsOne[buttonsOneIndex] = buttonsOne[buttonsOneIndex][:0] + \
        ("executables.png",) + buttonsOne[buttonsOneIndex]
        buttonsOneIndex += 1
        
    buttonsTwoIndex = 0
    for tuples in range(2):
        buttonsTwo[buttonsTwoIndex] = buttonsTwo[buttonsTwoIndex][:0] + \
        ("executables_software.png",) + buttonsTwo[buttonsTwoIndex]
        buttonsTwoIndex += 1
    
    buttonsThreeIndex = 0
    for tuples in range(2):
        buttonsThree[buttonsThreeIndex] = buttonsThree[buttonsThreeIndex][:0] + \
        ("none.png",) + buttonsThree[buttonsThreeIndex]
        buttonsThreeIndex += 1
      
    #Add buttonsTwo and buttonsThree list to buttonsOne list.
    for tuples in buttonsTwo:
      buttonsOne.append(tuples)

    for tuples in buttonsThree:
      buttonsOne.append(tuples)
    
    responsesOne = buttonsOne[:]
    responsesTwo = buttonsOne[:]
    responsesThree = buttonsOne[:]

    #Insert either answer A, B or C for question 2 into each tuple.
    responsesOneIndex = 0
    for tuples in range(6):
        responsesOne[responsesOneIndex] = responsesOne[responsesOneIndex][:0] + \
        ("executables.png",) + responsesOne[responsesOneIndex]
        responsesOneIndex += 1

    responsesTwoIndex = 0
    for tuples in range(6):
        responsesTwo[responsesTwoIndex] = responsesTwo[responsesTwoIndex][:0] + \
        ("executables_software.png",) + responsesTwo[responsesTwoIndex]
        responsesTwoIndex += 1
    
    responsesThreeIndex = 0
    for tuples in range(6):
        responsesThree[responsesThreeIndex] = responsesThree[responsesThreeIndex][:0] + \
        ("none.png",) + responsesThree[responsesThreeIndex]
        responsesThreeIndex += 1
    
    #Add responsesTwo and responsesThree list to responsesOne list.
    for tuples in responsesTwo:
        responsesOne.append(tuples)

    for tuples in responsesThree:
        responsesOne.append(tuples)
    
    noTestCases = 10 
    

def backButton():
    '''Click back button and adjust answer index.'''
    global answerIndex
    global backButtonNo

    wait(1)
    if answerIndex == backButtonNo:
        click ("back.png")
        wait(1)
        currentTest.pop()
        answerIndex -=1
        backButtonNo = 100
    
def randomAnswer():
    '''Generate a random answer for non-core questions.'''
    global answerIndex
    global data
    global backButtonNo

    loops2 = 8
    if backButtonNo > 2:
            loops2 +=1
    for questions in range (loops2):
        answerIndex += 1
        #Select random integer.
        randomNo = (random.randint(0,1))
        if randomNo == 0:
            click("yes.png")
            currentTest.append('Yes')
        elif randomNo == 1:
            click("no.png")
            currentTest.append('No')
        else:
            currentTest.append('Error!')
        backButton() 
        wait(1)
    if data < 4:
        currentTest.pop()
    currentTest.append(str(data))

def main():
    global currentTest
    global rowNo
    global answerIndex
    global backButtonNo
    global currentTest
    global data
    generateTestCases()
    responsesIndex = 0
    loops = 3
    answerIndex = 0
    rowNo = 1
    testNo = 1
    backButtonNo = 0

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
        data = backButtonNo + 2
        if backButtonNo < 2:
            loops +=1
        else:
            loops = 3
        for noQuestions in range (loops):
            answer = (responsesOne[responsesIndex])
            click(answer[answerIndex])
            wait(1)
            if answer[answerIndex] == 'yes.png':
                currentTest.append('Yes')
            elif answer[answerIndex] == 'no.png':
                currentTest.append('No')
            elif answer[answerIndex] == 'executables.png':
                currentTest.append('A')
            elif answer[answerIndex] == 'executables_software.png':
                currentTest.append('B')
            elif answer[answerIndex] == 'none.png':
                currentTest.append('C')
            else:
                currentTest.append('Error!')
            backButton() 
            answerIndex += 1
        wait(3)
        answerIndex -= 1
        randomAnswer()
        answerIndex = 0 
        responsesIndex +=1
        rowNo +=1
        testNo += 1
        backButtonNo = testNo - 1
        loops = 3
        readResult()
        report()
    print('Test completed successfully!')

main()
