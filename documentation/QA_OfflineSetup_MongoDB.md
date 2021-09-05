#Setting up MongoDB for offline use## 
Please update this document with OS specific information as squad members find solutions to issues .
**Why would you do this?**
These instructions are useful for anyone conducting tests on the Database, 
this includes offline penetration testing or while using SikuliX or Selenium as part of QA.

**Outcome**
Ability to run the ASD8 web app locally on your own machine without requiring access to the online DB.

************
***Setup****
************
	
	#MongoDB installed and running on machine.
	**Install**
		https://docs.mongodb.com/manual/installation/
		Follow install instructions relevant to your operating system.
		Windows:
			From executable (also installs MongoDB Compass).
				
		Kali Linux:
			From command line.
		MacOS:
			Check install instructions above (Not tested).
		
	**command line - Kali Linux**
		sudo service mongod start
		sudo service mongod restart
		sudo service mongod stop
		sudo service mongod status
		sudo gedit /etc/mongod.conf 	##(for changing URL from localhost to 0.0.0.0)
		
		getting status=14 error when trying to start MongoDB? Run these lines
			sudo chown -R mongodb:mongodb /var/lib/mongodb
			sudo chown mongodb:mongodb /tmp/mongodb-27017.sock
			sudo service mongod restart

			
	#MongoDB compass (GUI Application).
	https://docs.mongodb.com/compass/current/install/
	
	**Install**
		Windows:
			Comes with mongoDB .exe, if not use the link above to install.
		Linux:
			From commandline
				**command line**
					Linux:
						mongodb-compass					##starts gui application
		MacOS:
			Follow instructions in the link above (not tested).
	
	**Set a new connection**
		1:New Connection - Click on "Fill in Connection fields individually"
		![](./QA_Documentation/SetNewCon_01.png)
		_Fig. 1. New Connection start_
		
		2:Leave default as shown and press "connect" (unless you are running from a specific "Hostname)
		![](./QA_Documentation/SetNewCon_02.png)
		_Fig. 2. Details_
		
		3:Click "Create a new database"
		![](./QA_Documentation/SetNewCon_03.png)
		_Fig. 3. New database_

		4:Fill the following details
			Database Name: securebiz
			Collection Name: Questions
		Click "Create Database"
		![](./QA_Documentation/SetNewCon_04.png)
		_Fig. 4. Fields to  fill in_
		
		5: You have successfully created a new database
	
		
	**Import json files**
		1:Open MongoDB Compass (if not already opened)
		
		2:Start connections (create a new one if you don't have one already)
		
		3:Select securebiz from the lefthand side.
		![](./QA_Documentation/ImportJson_03.png)
		_Fig. 1. Select securebiz_
		
		4:Select collection to import
		![](./QA_Documentation/ImportJson_04.png)
		_Fig. 2. Select collection_
		
		5:Click "Import Data"
		![](./QA_Documentation/ImportJson_05.png)
		_Fig. 3. Import Data_
		
		6:Browse for .json files on your local machine, Ensure "JSON" is selected, click "Import" and then "done".
		![](./QA_Documentation/ImportJson_06.png)
		_Fig. 4. Browse and import_
		
		7:Select securebiz on the lefthand side again.
		
		8:Click "Create colleciton
			Collection Name = any collections left to import
			Click "create collection"
					
		9: Steps 4-8 until you have imported the following collections 
			#(This is true as of the end of T1 2021 and it could be more or less, please check with Tech team)
		10: Final result
		![](./QA_Documentation/ImportJson_10.png)
		_Fig. 5. Select securebiz_
	
	#ASD8 Repo and all requirements for that to run normally (i.e. serverless, nodejs...)
	**Instructions**
		Set the webapp up on your local machine as instructed with an up to date repo
		Changes to this config are outlined below.

	**ASD8 config changes**
		Change the following line "const AtlasURI=``".

		backend>config>config.js
			const AtlasURI = `mongodb://localhost:27017/securebiz`;

#Run the app like normal from the command line or through your IDE.




**Further instructions** Please note that the app in its current form cannot be set up to work on a local network so these instructions are obsolete.
						 However, it is useful to keep them around because if it can be setup to work.

	**Purpose**
		Setting up offline penetration environment

	**Instructions** -- THIS CURRENTLY DOES NOT WORK
		backend>package.json
		"start": "serverless offline start --host 0.0.0.0 --httpPort 3001 --stage local --skipCacheInvalidation",

		frontend>package.json
		 "dev": "webpack-dev-server --host 0.0.0.0 --port 8081",
			"start": "webpack-dev-server --host 0.0.0.0 --port 8081",

		frontend>src>Config>Config.tsx
		  clientBaseURL: 'http://0.0.0.0:8081',
		  serverBaseURL: 'http://0.0.0.0:3001/local/',
	  
	  
	**MISC Command line**

		workManager restart 			##Kali Linux restart network settings
 
