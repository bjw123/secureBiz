**Framework for Automated Testing: Iteration 2**

The following list outlines the framework for implementing automated testing for Iteration 2.

- Re-write scripts based on updated maturity level calculation model. This includes only iterating over core questions and using random answers for non-core questions.

- Pre-populate Excel spreadsheet with expected maturity level results. This, however, will not be possible for Multifactor Authentication because it relies on random answers for question two. This is because the permutations are too large to iterate through every option. Therefore, the expected maturity level should be checked manually for Multifactor Authentication after the automated test has been completed.

- Base all testing on the latest version of the application at the start of Iteration 2. This will maximise time to re-write the scripts and generate testing data.

- Include environment variable for snipping tool in one central file in the root testing folder.

- Create basic read-me file and include in root testing folder.

- Any adjustments to scripts should be made through user input rather than requiring the user to edit the source code.