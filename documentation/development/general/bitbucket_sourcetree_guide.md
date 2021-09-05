**Visual Guide to Bitbucket and Sourcetree**

**Introduction**
This document is a simple visual guide for adding documentation to the Securebiz repository in Bitbucket using Sourcetree. The guide includes instructions for:

- pulling recent updates to the user’s local directory
- installing new node modules
- creating a new branch in Bitbucket
- staging and pushing files in Sourcetree
- creating a Pull request
- rebasing and
- merging a branch to Master.

The steps are designed to be simple enough for students who have no prior experience in using Sourcetree and Bitbucket to follow. The guide should be used in conjunction with the Git workflow document for the ASD Essential Eight Toolkit.

**Step 1.** Open Sourcetree. Ensure you are on the Master branch and then click ‘Fetch’ to retrieve any available updates.

![](./bitbucket_sourcetree_guide/step\_1.png)

**Step 2.** If updates are available, click ‘Pull’ to add them to your local directory.

**Step 3.** If the update requires new node modules, you will need to install them before the web application will run. Otherwise, go to Step 5. To install the node modules, firstly remove the current ‘express/node\_modules’ folder.

**Step 4.** Use a command line tool and navigate to the ‘securebiz/express’ directory. Then run ‘npm ci’. This will install the node packages with the exact version specified in the ‘package-lock.json’ file.

![](./bitbucket_sourcetree_guide/step\_4.png)

**Step 5.** Open Bitbucket and ensure you are on the Master branch.

![](./bitbucket_sourcetree_guide/step\_5.png)

**Step 6.** In Bitbucket, create a new branch from Master.

![](./bitbucket_sourcetree_guide/step\_6.png)

**Step 7.** Re-open Sourcetree and click ‘Fetch’ to retrieve the recently created branch.

![](./bitbucket_sourcetree_guide/step\_7.png)

**Step 8.** In the left-hand panel, click ‘REMOTES > origin’.

![](./bitbucket_sourcetree_guide/step\_8.png)

**Step 9.** Right-click on the newly created branch and select ‘check-out’. Your local directory will now track changes to the branch you recently created.

![](./bitbucket_sourcetree_guide/step\_9.png)

**Step 10.** Add new documentation files to the correct Securebiz directory.

**Step 11.** Click ‘File Status’ and then stage relevant files. The staged files will be the ones you want to add to the Master branch.

![](./bitbucket_sourcetree_guide/step\_11.png)

**Step 12.** At the bottom of the screen, write a commit message and click ‘Commit’.

![](./bitbucket_sourcetree_guide/step\_12.png)

**Step 13.** The newly added files have now been committed to the local branch on your computer. Click ‘Push’ to begin pushing the files onto the branch in Bitbucket.

![](./bitbucket_sourcetree_guide/step\_13.png)

**Step 14.** Ensure the correct branch is selected and click ‘Push’. This will finish pushing the files to Bitbucket.

![](./bitbucket_sourcetree_guide/step\_14.png)

**Step 15.** Re-open Bitbucket and check that files have been pushed to the branch. Also ensure that the file path for the files is correct. At this point, the files are still on the branch and will need to be merged with Master.

![](./bitbucket_sourcetree_guide/step\_15.png)

**Step 16.** To begin merging the recently added files, create a Pull request. This will alert other students in the Team, that your files are ready to be reviewed before merging.

![](./bitbucket_sourcetree_guide/step\_16.png)

**Step 17.** Add details for the Pull request by firstly checking the title and description that were created in Step 10 in Sourcetree. Add reviewer(s) and click ‘Create’. A Pull request may take several days to review and revise before it is approved.

![](./bitbucket_sourcetree_guide/step\_17.png)

**Step 18.** After the Pull request has been approved, you may need to rebase the branch before it can be merged with Master. This is because your branch may be behind the head branch. If your branch is not behind the head branch, go to Step 23. To begin rebasing, open Sourcetree. Ensure you are on the Master branch, click “Fetch” and then “Pull” any updates to your local directory.

**Step 19.** Check-out the branch you want to rebase.

![](./bitbucket_sourcetree_guide/step\_19.png)

**Step 20.** Right-click on origin/master and select “rebase children of …”.

![](./bitbucket_sourcetree_guide/step\_19.png)

**Step 21.** Click ‘Ok’ to confirm rebase with master/origin.

**Step 22**. Pull any available remote updates.

**Step 23.** Push to origin. The branch is now rebased and at the head.

![](./bitbucket_sourcetree_guide/step\_23.png)

**Step 24.** With the branch at the head, click ‘Merge’.

![](./bitbucket_sourcetree_guide/step\_24.png)

**Step 25.** Ensure the details of the merge are correct and click ‘Merge’. The files are now merged with the Master branch.

![](./bitbucket_sourcetree_guide/step\_25.png)

**Step 26.** The branch can now be deleted because the files have been added to Master. Click on ‘Branches’ icon in Bitbucket. Find the correct branch and select ‘Delete branch’.

![](./bitbucket_sourcetree_guide/step\_26.png)

**Step 27.** Confirm the branch details are correct and click ‘Delete’.

![](./bitbucket_sourcetree_guide/step\_27.png)

**Step 28.** Delete local branch in Sourcetree by right-clicking on the branch and selecting ‘Delete’.

![](./bitbucket_sourcetree_guide/step\_28.png)

**Step 29.** Confirm branch deletion.

![](./bitbucket_sourcetree_guide/step\_29.png)