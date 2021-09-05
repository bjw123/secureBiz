**SecureBiz: Automated Test Scripts**

**Overview**: The scripts in this directory run in Sikuli and are designed to automate testing and reporting for the SecureBiz web application. Sikuli uses image recognition to achieve automation, so the program will need to be adjusted for each local environment. Each folder contains the required Python files, images and Excel documents to get started. 

**Usage:** the automated test scripts cover the eight mitigation strategies, including Application Control, Configure Microsoft Office Macro Settings, Patch Applications, User Application Hardening, Restrict Administrative Privileges, Multi-Factor Authentication, Patch Operating Systems and Daily Backups. Each script generates a report as an Excel spreadsheet. The report includes a list of the test cases, the expected result, the actual result, a screenshot of the actual result and a Boolean value for pass or fail.

**Limitations:** The scripts rely on the Snipping Tool in Windows 10.

**Requirements:** Users are required to have basic Python programming knowledge and experience with Sikuli.

**Installation instructions**: Install Sikuli (<https://launchpad.net/sikuli/+download>).

**Configuration**: The following steps outline how to configure Sikuli for the user’s local environment.

\- Copy the entire ‘testing’ directory to the local environment outside of the ‘securebiz’ directory. The files should be configured outside the ‘securebiz’ directory to prevent them from being merged with Master in any subsequent Pull requests.  

\- Update the path of the Snipping Tool in the file CONSTANT. 

\- Open the SecureBiz web application in a web browser.

\- Open the required test case folder in Sikuli.

\- Open the corresponding Excel spreadsheet and place the cursor inside the date cell. 

\- Click ‘Start’ in Sikuli. 

\- Because the scripts rely on image recognition, they are unlikely to execute successfully in the first run. This is due to variables in the user’s local environment. Follow the errors within Sikuli by retaking screenshots of any images that produce errors.
