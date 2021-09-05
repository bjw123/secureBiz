export const dbSchema = [{
    "QuestionCategory": "AppControl",
    "QuestionLabel": "Do you have application control software installed on all workstations and servers to restrict the execution of executable files to an approved set?",
    "QuestionDescription": "An approved set is the set of applications/software that you have allowed, otherwise known as your “whitelisted” applications.",
    "QuestionType": "MULTIPLE",
    "Mitigation": "Application control software can be used to ensure only approved applications are allowed to run/execute. You will need to get application control software installed on all workstations and servers, this software can be attained and installed through internal or external IT technicians. (Note: Microsoft Windows Defender software also contains an application control component.)",
    "QuestionNumber": 1,
    "QuestionCore": true,
    "QuestionCoreNumber": 1,
    "Answers": [
      {
        "Value": "a",
        "Text": "Executables",
        "QuestionNext": 2,
        "QuestionNextCore": 2
      },
      {
        "Value": "b",
        "Text": "Executables, software libraries, scripts and installers",
        "QuestionNext": 2,
        "QuestionNextCore": 2
      },
      {
        "Value": "c",
        "Text": "none of the above",
        "QuestionNext": 2,
        "QuestionNextCore": 2
      }
    ],
    "Validators": "Yup.string().oneOf(['a','b','c']).required('Required')"
  }
  ,{
    "QuestionCategory": "AppControl",
    "QuestionLabel": "Does your application control software restrict the execution of software libraries, scripts and installers on all workstations and servers to an approved set?",
    "QuestionDescription": "",
    "QuestionType": "MULTIPLE",
    "Mitigation": "Determining an approved set of software is important to restrict unwanted and potentially malicious software. In order to do this, you will need to identify approved applications by taking an inventory of required software in your business.This approved set will also need to be regularly updated and controlled through a change management program.",
    "QuestionNumber": 2,
    "QuestionCore": true,
    "QuestionCoreNumber": 2,
    "Answers": [
      {
        "Value": "a",
        "Text": "Executables",
        "QuestionNext": 3,
        "QuestionNextCore": 3
      },
      {
        "Value": "b",
        "Text": "Executables, software libraries, scripts and installers",
        "QuestionNext": 3,
        "QuestionNextCore": 3
      },
      {
        "Value": "c",
        "Text": "none of the above",
        "QuestionNext": 3,
        "QuestionNextCore": 3
      }
    ]
   },{
    "QuestionCategory": "AppControl",
    "QuestionLabel": "Are Microsoft’s latest recommended block rules implemented to prevent application control bypasses?",
    "QuestionDescription": "",
    "QuestionType": "BOOLEAN",
    "Mitigation": "It is important to implement Microsoft’s block rules as ‘these applications or files can be used by an attacker to circumvent application whitelisting policies’ (Microsoft, 2020). Microsoft’s latest block rules can be found at https://docs.microsoft.com/en-us/windows/security/threat-protection/windows-defender-application-control/microsoft-recommended-block-rules and can be configured by internal or external IT technicians.",
    "QuestionNumber": 3,
    "QuestionCore": true,
    "QuestionCoreNumber": 3,
    "Answers": [
      {
        "Value": true,
        "Text": "Yes",
        "QuestionNext": 4,
        "QuestionNextCore": 4
      },
      {
        "Value": false,
        "Text": "No",
        "QuestionNext": 4,
        "QuestionNextCore": 4
      }
    ],
    "Validators": "Yup.boolean().required('Required')"
   },{
    "QuestionCategory": "AppControl",
    "QuestionLabel": "Do you ensure all applications in use have been digitally signed by the vendor?",
    "QuestionDescription": "",
    "QuestionType": "BOOLEAN",
    "Mitigation": "You should ensure all applications are signed by the vendor to ensure the legitimacy of the application code. A digital certificate that provides the ability to sign code and applications is often provided a Certificate Authority (CA). Certificate Authorities are trusted organisations that provide appropriate identification and vetting of an individual or organisation before issuing any certificates. Your application vetting process should ensure that all applications are digitally signed the vendor that creates or provides the application.",
    "QuestionNumber": 4,
    "QuestionCore": false,
    "Answers": [
      {
        "Value": true,
        "Text": "Yes",
        "QuestionNext": 5,
        "QuestionNextCore": null
      },
      {
        "Value": false,
        "Text": "No",
        "QuestionNext": 5,
        "QuestionNextCore": null
      }
    ],
    "Validators": "Yup.boolean().required('Required')"
  },{
    "QuestionCategory": "AppControl",
    "QuestionLabel": "Do you enforce an application control policy on your computers?",
    "QuestionDescription": "",
    "QuestionType": "BOOLEAN",
    "Mitigation": "Your organisation should identify and clearly define the components of its application control policy. Although this policy should be actioned through the use of a software solution, the policy guidelines should be clearly communicated to employees to ensure they understand the components such as:Why application control is in place, Policy regarding downloading and attempting to install applications,The process for requesting a new application be added to the application whitelist",
    "QuestionNumber": 5,
    "QuestionCore": false,
    "Answers": [
      {
        "Value": true,
        "Text": "Yes",
        "QuestionNext": 6,
        "QuestionNextCore": null
      },
      {
        "Value": false,
        "Text": "No",
        "QuestionNext": 6,
        "QuestionNextCore": null
      }
    ],
    "Validators": "Yup.boolean().required('Required')"
   },{
    "QuestionCategory": "AppControl",
    "QuestionLabel": "Do you have any anti-virus software installed on your computers?",
    "QuestionDescription": "",
    "QuestionType": "BOOLEAN",
    "Mitigation": "You should ensure that all assets and servers have an appropriate antivirus software installed to perform malware threat mitigation. Antivirus software performs many functions such as:Scanning critical host components such as start-up files and boot records, Real-time scanning on all host-based activities such as inbound email attachments and files downloaded from the internet, Monitoring the behaviour of applications and flagging anomalous behaviour, Providing scheduled and on-demand scanning of all attached hard drives",
    "QuestionNumber": 6,
    "QuestionCore": false,
    "Answers": [
      {
        "Value": true,
        "Text": "Yes",
        "QuestionNext": 7,
        "QuestionNextCore": null
      },
      {
        "Value": false,
        "Text": "No",
        "QuestionNext": 7,
        "QuestionNextCore": null
      }
    ],
    "Validators": "Yup.boolean().required('Required')"
    },{
    "QuestionCategory": "AppControl",
    "QuestionLabel": "Do you block end users from downloading and installing software from the internet?",
    "QuestionDescription": "",
    "QuestionType": "BOOLEAN",
    "Mitigation": "Software installations and download from the internet should be closely monitored or outright prevented from being performed by end users, to prevent security issues that are associated with downloading unauthorized material(s). Software downloads and installations should be a privilege delegated to dedicated administrative accounts and the software should be discussed and approved prior to installation to ensure it is relevant to the needs of the company.",
    "QuestionNumber": 7,
    "QuestionCore": false,
    "Answers": [
      {
        "Value": true,
        "Text": "Yes",
        "QuestionNext": 8,
        "QuestionNextCore": null
      },
      {
        "Value": false,
        "Text": "No",
        "QuestionNext": 8,
        "QuestionNextCore": null
      }
    ],
    "Validators": "Yup.boolean().required('Required')"
     },{
    "QuestionCategory": "AppControl",
    "QuestionLabel": "Have you ensured only authorised users have admin privileges?",
    "QuestionDescription": "",
    "QuestionType": "BOOLEAN",
    "Mitigation": "Privileged and administrative users should have clearly defined roles and permissions assigned to them in accordance with the position description used when hiring these staff members. The organisation should also maintain least privilege and separation of privilege for these users to maintain organisational integrity.",
    "QuestionNumber": 8,
    "QuestionCore": false,
    "Answers": [
      {
        "Value": true,
        "Text": "Yes",
        "QuestionNext": 9,
        "QuestionNextCore": null
      },
      {
        "Value": false,
        "Text": "No",
        "QuestionNext": 9,
        "QuestionNextCore": null
      }
    ],
    "Validators": "Yup.boolean().required('Required')"
     },{
    "QuestionCategory": "AppControl",
    "QuestionLabel": "Do you frequently check to ensure that application control is configured correctly on all computers?",
    "QuestionDescription": "",
    "QuestionType": "BOOLEAN",
    "Mitigation": "There should be regular audits conducted to ensure application control configurations are still being applied and implemented. If utilising Windows, this can done through Group Policy which is able to host Windows Defender Application Control (WDAC) or Windows AppLocker configurations and ensure they are being applied and updated with every group policy check that occurs.",
    "QuestionNumber": 9,
    "QuestionCore": false,
    "Answers": [
      {
        "Value": true,
        "Text": "Yes",
        "QuestionNext": 10,
        "QuestionNextCore": null
      },
      {
        "Value": false,
        "Text": "No",
        "QuestionNext": 10,
        "QuestionNextCore": null
      }
    ],
    "Validators": "Yup.boolean().required('Required')"
     },{
    "QuestionCategory": "AppControl",
    "QuestionLabel": "Does your application control software generate event logs (time stamps, name of blocked file) that can be viewed?",
    "QuestionDescription": "",
    "QuestionType": "BOOLEAN",
    "Mitigation": "Audit logs ensure system integrity is maintained by providing evidence of events occurring. Typical event logs should include details such as the user or process attempting to launch an executable, the date and time an event/action occurred, the asset number or hardware ID number, the IP address it has occurred from, whether the action was successful or not, and any other system specific details.",
    "QuestionNumber": 10,
    "QuestionCore": false,
    "Answers": [
      {
        "Value": true,
        "Text": "Yes",
        "QuestionNext": 11,
        "QuestionNextCore": null
      },
      {
        "Value": false,
        "Text": "No",
        "QuestionNext": 11,
        "QuestionNextCore": null
      }
    ],
    "Validators": "Yup.boolean().required('Required')"
     },{
    "QuestionCategory": "AppControl",
    "QuestionLabel": "Is testing done regularly to check misconfigurations of file system permissions and other ways of bypassing application control?",
    "QuestionDescription": "",
    "QuestionType": "BOOLEAN",
    "Mitigation": "Manual testing and auditing of system permissions should be conducted regularly to ensure they are still correctly configured as per policy. System permissions should be reviewed to ensure they remain relevant to the information and data being processed on a machine, and to the person using the machine. Vulnerability assessments and penetration testing should be conducted to test the strength of application control mechanisms and ensure they cannot be bypassed or abused for privilege escalation attacks",
    "QuestionNumber": 11,
    "QuestionCore": false,
    "Answers": [
      {
        "Value": true,
        "Text": "Yes",
        "QuestionNext": 12,
        "QuestionNextCore": null
      },
      {
        "Value": false,
        "Text": "No",
        "QuestionNext": 12,
        "QuestionNextCore": null
      }
    ],
    "Validators": "Yup.boolean().required('Required')"
     },{
    "QuestionCategory": "Patch Applications",
    "QuestionLabel": "If a critical security vulnerability is identified, how quickly do you apply an appropriate patch, update or mitigation for the affected system or application?",
    "QuestionDescription": "",
    "QuestionType": "MULTIPLE",
    "Mitigation": "It is important to consider all aspects of applying recent patches before implementing them. Ideally, the company should apply patches for the vulnerabilities as soon as they are found, however thorough testing and discussion should be done first to make a more informed decision. Where updates and patches are found to be beneficial to the security of the company, they should be applied as soon as possible to prevent malicious parties from taking advantage of vulnerabilities.",
    "QuestionNumber": 12,
    "QuestionCore": true,
    "QuestionCoreNumber": 4,
    "Answers": [
      {
        "Value": "a",
        "Text": "Within 48 hours",
        "QuestionNext": 13,
        "QuestionNextCore": 5
      },
      {
        "Value": "b",
        "Text": "Within two weeks",
        "QuestionNext": 13,
        "QuestionNextCore": 5
      },
      {
        "Value": "c",
        "Text": "none of the above",
        "QuestionNext": 13,
        "QuestionNextCore": 5
      }
    ],
    "Validators": "Yup.string().oneOf(['a','b','c']).required('Required')"
  }]