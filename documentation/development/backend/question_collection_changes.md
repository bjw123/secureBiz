# Question Collection Changes

As part of 2020 T3 iteration 1 changes, the questions that
were stored in different collections are merged into one. 

The question schema has been updated too to store more
information, that can be used to filter different type of
questions, and to decide the questions showing sequence.

## Current Question Schema

The following are what the record for one question looks like:

    {
        "QuestionCategory": "Backups",
        "QuestionLabel": "Are audit logs implemented for key systems?",
        "QuestionDescription": "",
        "QuestionType": "BOOLEAN",
        "Mitigation": "Audit logs ensure system integrity is maintained by providing evidence of events occurring. Typical event logs should include details such as the user performing an action, the object being actioned against, the date and time an event/action occurred, the IP address it has occurred from, and any other system specific details.",
        "QuestionNumber": 99,
        "QuestionSetNumber": 14,
        "QuestionCore": false,
        "Answers": [
            {
                "Value": true,
                "Text": "Yes",
                "QuestionNext": null,
                "QuestionNextCore": null
            },
            {
                "Value": false,
                "Text": "No",
                "QuestionNext": null,
                "QuestionNextCore": null
            }
        ]
    }

## Attributes Notes

1. `QuestionCore` is the flag for core questions, if true then
   the question is a core question, otherwise it's not a core
   question. This can be used to filter all core question.

2. `QuestionSetNumber` is the number of the question in a
   particular category,
  Eg.
  If `QuestionSetNumber` is 2, and `QuestionCategory` is `Backups`,
   then it's the 2nd question in the `Backups` category.

3. `QuestionType` can only be one of these values: `MULTIPLE`,
   `RADIO`, `BOOLEAN`. Front-end will pick up the type info and
   render the form control accordingly.

4. `QuestionNumber` is incremental. Within a category, the
   `QuestionSetNumber` is supposed to be incremental. We can't
   reflect this in MongoDB schema but this need to be taken care
   in the program logic.

5. `QuestionNext` from the answer specifies the next question
   if that particular answer is selected.
   Eg.
   If `QuestionNext` is 5 from an answer, then when the answer is
   selected, it'll go to the next question with `QuestionNumber`
   value 5.

6. `QuestionNextCore` from the answer specifies the next
   question if that particular answer is selected.
   Eg.
   If `QuestionNextCore` is 5 from an answer, then when the
   answer is selected, it'll go to the next question with
   `QuestionNextCore` value 5.

7. If a question set should terminate, the next question should
   be `null`.
   Eg.
   `"QuestionNext": null` means there is no further questions in
   the set.
   `"QuestionNextCore": null` means there is no further core
   questions in the set.
   However, if there's no further questions in a question
   category, the question set should terminate too.

8. `QuestionCategory` values will need to match those
   `QuestionCategory` values in the `database/Categories.json`
   file. This attribute is used to link questions to categories,
   so the string value will need to be an exact match.
