**Selenium: Feasibility Study for the Secure Biz Web Application**

**1.0 Introduction**
A feasibility study was undertaken to assess if the web application testing tool, Selenium could be used to test the Secure Biz web application. Similar tools have already been investigated for end-to-end testing. But these tools were not selected because they use X-paths and object IDs to identify web elements and the Secure Biz application lacks unique object IDs and X-paths within each model. As a result, the image recognition tool Sikuli was selected to test the logic used to calculate the end-user’s score when they complete each questionnaire. However, a testing tool, such as Selenium, is required to conduct broader tests across the web application. The study aimed to identify if Selenium is suitable for the project and how it could be implemented. The findings are discussed under the sub-headings below.

**2.0 Findings**
The following findings are based on online research and using the Selenium web driver to test the Secure Biz web application.

**2.1 Language**
The Selenium web driver can be used in a range of coding languages, including Java, JavaScript and Python. Java was selected as the recommended language as it is the most common language used for implementing Selenium. This provides team members with a large number of online tutorials for upskilling as well as relevant Java based tools. This includes TestNG, which is an important Maven dependency for automated testing.

**2.2 IDE**
There are two main IDEs that can be used for running the Selenium web driver with Java. These are InteliJ Idea and Eclipse. InteliJ Idea was selected over Eclipse because it is a more modern IDE, but project files are compatible between the two pieces of software.

**2.3 Integration with Sikuli**
The Selenium web driver can be integrated with Sikuli by adding the Sikuli Jar file to the project’s library. This is an import feature, as the team will rely on image recognition to navigate some parts of the application that do not contain unique X-paths or object IDs.

**2.4 Important features**
The Selenium web driver can be used to automate the navigation of the Secure Biz web application. But the tool needs to be integrated with dependencies, including TestNG and REST Assured using the Maven build tool. With TestNG and REST Assured, the team will be able to conduct API testing and test if every link and button across the application takes the user to the intended destination.

**2.5 Compatibility of scripts between team members**
A simple Maven project was created by Ben Landers using the Selenium web driver to test if the name of the Secure Biz web application was displayed in the web browser. The script was shared with Shaun Dare who confirmed the script worked in his local environment after changing the file path to the Chrome web driver. This confirmed the scripts are compatible between team members.  

**2.6 Reporting framework:**
Using the simple Maven project created by Ben Landers, Shaun Dare used this as a base to test out different reporting frameworks. This has resulted in Shaun Dare investigating two reporting frameworks. The first framework is iText, which is a libary for creating and manipulating files in Java and .NET. 
iText is versitile allowing for extensive customisation. The second is a framework called TestNG, which is a Java specific framework that Ben Landers was already starting to implement inside the Maven project.
After reviewing both iText and TestNG as reporting frameworks it can be concluded that iText is not sutible for our project due to time constraints, although iText provides a plateform to generate hugely customised PDF reports, 
it is exactly that customisation that will be too much of a timesink to commit development time to with the teams current roadmap.
TestNG on the otherhand comes with built in report generation that is fit for purpose, with the bonus of less dependencies required in our project setup.

**3.0 Recommendations**
Based upon the above findings, it is recommended that Selenium be used as a web application testing tool for the project. The team will implement the tool in Java using InteliJ Idea, but the scripts will also be compatible with Eclipse. TestNG will be used as the framework for generating end-to-end reports.