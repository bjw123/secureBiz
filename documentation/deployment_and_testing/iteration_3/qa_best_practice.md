**Quality Assurance: Web Application and Security Testing Best Practice**

**Purpose**
The purpose of this document is to outline a set of best practices for undertaking web application and security testing on the Secure Biz application. This is a living document and should be updated as the project and testing requirements evolve.

**Planning**
Testing activities should be planned in consultation with the entire team before the start of each iteration. This enables the team to define the features that need to be tested thus ensuring that the delivered results are relevant to the project.

Part of the plan should also include whether testing will occur on a static or evolving version of the application. For example, students may want a feature to be regularly tested as it is being developed. Or development work on an existing feature may pause until it has been tested and the results delivered to the team.

**Consistent file naming and structure**
With numerous students working on testing each trimester, it is important to establish a consistent file nomenclature and structure. A plan should be developed at the start of the trimester, which outlines naming conventions and the file structure for both scripts and results.

Scripts and results from previous trimesters should be saved to the relevant archive folder in the repository. This provides future teams with past testing results, which can be used as evidence of the team’s progress.

**Testing activities**
The undertaking of testing activities, including security tests, should be coordinated with any planned development work on the application. For example, a DDoS penetration test on the deployed version of the application should only occur when other students are not relying on accessing the hosted database for development work. Alternatively, if testing activities may impact development work they can be undertaken on a local instance of the application and database.

**Reporting**
The results of any planned testing activities should be documented and saved to the repository. The results should also be reported to the team so a plan can be developed to fix any failed test cases.

**Supporting documentation**
To support new students undertaking testing roles, scripts should be accompanied by README files. These files should provide students with a clear description of how to run the scripts in their local environment, including modifications that need to be made for different operating systems. Similarly, scripts should include relevant comments to assist new students in understanding the logic of the code.