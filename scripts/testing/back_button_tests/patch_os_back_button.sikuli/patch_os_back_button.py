import random
import itertools
import datetime
from subprocess import Popen
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
    click("Patch_OS.png")

def readResult():
    '''Use image recognition to identify result.'''
    global result
    wait(3)
    if (exists("1620597367738.png",2)):
        result = '3'
        
    elif (exists("1620597172702.png",2)):
        result = '2'

    elif (exists("1620597315926.png",2)):
        result = '1'
        
    elif (exists("1620597245086.png",2)):
        result = '0'

    else:
        result = 'Error!'

def report():
    click("1620449318796.png")
    i = 0
    #print(currentTest)
    for step in range(15):
        type(currentTest[i])
        i += 1
        type(Key.TAB) 
    type(Key.TAB) 
    type(result)
    type(Key.TAB)
    
    for step in range (rowNo):
        type(Key.PAGE_UP)
    click("1620445831817.png")
    for step in range (rowNo):
        type(Key.DOWN)
    click("secure_biz.png")
    wait(5)

def generateTestCases():
    '''Generate all test cases and save to list called buttonsOne.'''
    global buttonsOne
    global noTestCases

    buttonsOne = list(itertools.product([("1620450175039.png"),("1620450244937.png")], repeat=2))

    buttonsTwo = list(itertools.product([("1620450175039.png"),("1620450244937.png")], repeat=2))

    buttonsThree = list(itertools.product([("1620450175039.png"),("1620450244937.png")], repeat=2))
    
    buttonsFour = list(itertools.product([("1620450175039.png"),("1620450244937.png")], repeat=2))

    #Insert either answer A, B, C or D into each tuple.
    buttonsOneIndex = 0
    for tuples in range(4):
        buttonsOne[buttonsOneIndex] = buttonsOne[buttonsOneIndex][:0] + \
        ("1620450084403.png",) + buttonsOne[buttonsOneIndex]
        buttonsOneIndex += 1
        
    buttonsTwoIndex = 0
    for tuples in range(4):
        buttonsTwo[buttonsTwoIndex] = buttonsTwo[buttonsTwoIndex][:0] + \
        ("1620450099566.png",) + buttonsTwo[buttonsTwoIndex]
        buttonsTwoIndex += 1
    
    buttonsThreeIndex = 0
    for tuples in range(4):
        buttonsThree[buttonsThreeIndex] = buttonsThree[buttonsThreeIndex][:0] + \
        ("1620450115235.png",) + buttonsThree[buttonsThreeIndex]
        buttonsThreeIndex += 1
 
    buttonsFourIndex = 0
    for tuples in range(4):
        buttonsFour[buttonsFourIndex] = buttonsFour[buttonsFourIndex][:0] + \
        ("1620450131284.png",) + buttonsFour[buttonsFourIndex]
        buttonsFourIndex += 1
     
    #Add buttonsTwo, buttonsThree and buttonsFour list to buttonsOne list.
    for tuples in buttonsTwo:
      buttonsOne.append(tuples)

    for tuples in buttonsThree:
      buttonsOne.append(tuples)

    for tuples in buttonsFour:
      buttonsOne.append(tuples)
    
    noTestCases = 16 


def backButton():
    '''Click back button and adjust answer index.'''
    global answerIndex
    global backButtonNo

    wait(1)
    if answerIndex == backButtonNo:
        click ("1620448126156.png")
        wait(1)
        currentTest.pop()
        answerIndex -=1
        backButtonNo = 100
    
def randomAnswer():
    '''Generate a random answer for non-core questions.'''
    global answerIndex
    global data
    global backButtonNo

    loops2 = 10
    if backButtonNo > 2:
            loops2 +=1
    for questions in range (loops2):
        answerIndex += 1
        #Select random integer.
        randomNo = (random.randint(0,1))
        if randomNo == 0:
            click("1620450175039.png")
            currentTest.append('Yes')
        elif randomNo == 1:
            click("1620450244937.png")
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

    click("1620449318796.png")
    type(Key.HOME, KeyModifier.CTRL) #takes you to cell A1
    type(Key.TAB*12)                 #takes you to cell M1
    type(time.strftime("%x"))
    type(Key.TAB*3)                  #takes you to cell P1
    type(time.strftime("%X"))
    click("1620445831817.png")
    type(Key.DOWN)
    click("1620449294855.png")

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
            answer = (buttonsOne[responsesIndex]) 
            click(answer[answerIndex])
            wait(1)
            if answer[answerIndex] == '1620450175039.png':
                currentTest.append('Yes')
            elif answer[answerIndex] == '1620450244937.png':
                currentTest.append('No')
            elif answer[answerIndex] == '1620450084403.png':
                currentTest.append('A')
            elif answer[answerIndex] == '1620450099566.png':
                currentTest.append('B')
            elif answer[answerIndex] == '1620450115235.png':
                currentTest.append('C')
            elif answer[answerIndex] == '1620450131284.png':
                currentTest.append('D')
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
