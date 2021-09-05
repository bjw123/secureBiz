#HOW TO SETUP LIVE DEBUGGING
#1:OPEN/OBTAIN NOTEPAD++
#2:SAVE A BLANK TEXT DOCUMENT - CHOOSE YOUR LOCATION
#3:IN NOTEPAD++ GO PLUGINS > PLUGINS ADMIN > SEARCH FOR "DOCUMENT MONITOR" > ENABLE THIS
#4:GO PLUGINS > DOCUMENT MONITOR > START MONITORING  (IF ITS NOT ALREADY)
#5:SETUP COMMENTS THROUGHOUT THE DOCUMENT AS DEMONSTRATED BELOW
# f = open("Your file location/file.txt", 'a')
#       f.write("\n")
#       f.write("Your output: " + str(your_int_var))
#       f.write("\n")
#       f.close()
#6:CLEAR AND SAVE .TXT DOC BETWEEN TESTS IF YOU WANT A FRESH PAGE

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
    '''Navigate to Patch Applications questionnaire.'''
    wait(1)
    click("assess.png")
    wait(1)
    click("patch_applications.png")

def readResult():
    '''Use image recognition to identify result.'''
    global result
    wait(3)
    if exists("three.png"):
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
    click(Pattern("background.png").targetOffset(4,-15))
    mouseDown(Button.LEFT)
    mouseMove(Pattern("background.png").targetOffset(26,19))
    mouseUp()
    type("c",KEY_CTRL)
    click(Pattern("excel.png").similar(0.64))
    i = 0
    for step in range(14):
        type(currentTest[i])
        i += 1
        type(Key.TAB)
    type(str(backButtonTested))         
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
    click("Minimise.png")
    click("url.png")
    type("http://localhost:8081/")
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
        ("none_above.png",) + buttonsFour[buttonsFourIndex]
        buttonsFourIndex += 1
     
    #Add buttonsTwo, buttonsThree and buttonsFour list to buttonsOne list.
    for tuples in buttonsTwo:
      buttonsOne.append(tuples)

    for tuples in buttonsThree:
      buttonsOne.append(tuples)

    for tuples in buttonsFour:
      buttonsOne.append(tuples)
    
    noTestCases = 0 
    for tuples in buttonsOne:
        noTestCases += 1 
    print(noTestCases)
def backButton():
    '''Click back button and adjust answer index.'''
    global answerIndex
    global backButtonNo
    global backButtonTested  #Addition to record which back button was pressed.     
        
    wait(1)
    if answerIndex == backButtonNo:
        backButtonTested = 0
        click (Pattern("back-1.png").similar(0.55))
        wait(1)       
        backButtonTested = backButtonNo + 1       
        answerIndex -=1       
        backButtonNo = 100       
            
def randomAnswer(): 
    '''Generate a random answer for non-core questions.'''
    global answerIndex
    global data
    global backButtonNo
    global loops2

        ##Ensure that loops2 is always set to  
        ##one below the number of non-core questions.
    loops2 = 10
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
    global testNo
    generateTestCases()
    responsesIndex = 0
    loops = 3
    answerIndex = 0
    rowNo = 1
    testNo = 1
    backButtonNo = 0

    click(Pattern("excel.png").similar(0.77))
    type(time.strftime("%x"))
    type(Key.TAB*2)
    type(time.strftime("%X"))
    f = open("I:\SIT764\SikuliX\sikuliX_Debug.txt", 'a')
    f.write("\n")
    f.write(str(time.strftime("%X")) + " :---Test #: "+ str(testNo))
    f.write("\n")
    f.close()
    click("test_no.png")
    type(Key.DOWN)
    click("Minimise.png")

    for tests in range (noTestCases):
        f = open("I:\SIT764\SikuliX\sikuliX_Debug.txt", 'a')
        f.write("\n")
        f.write(str(time.strftime("%X")) + " :---Test #: "+ str(testNo))
        f.write("\n")
        f.close()
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
            elif answer[answerIndex] == 'none_above.png':
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
                ##set the next backButton to be tested
                ##if all buttons have been iterated through,
                ##pick one at random between min and max.        
        if testNo <= 12:
            backButtonNo = testNo - 1
        else:
            backButtonNo = (random.randint(0,11))
        loops = 3
        readResult()
        report()
    print('Test completed successfully!')
    f = open("I:\SIT764\SikuliX\sikuliX_Debug.txt", 'a')
    f.write("\n")
    f.write(str(time.strftime("%X")) + " :---Test #: "+ str(testNo))
    f.write("\n")
    f.write("'Test completed successfully!'")
    f.write("\n")
    f.close()

main()