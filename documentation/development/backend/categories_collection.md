# Categories Collection

As part of 2020 T3 Iteration 1 changes, the Maturity Logic
was moved from the front end and stored in the database.

The Categories schema represents that Maturity Logic in the
form of eight seperate Categories.

## Categories Schema

The following is what the record for one Category looks like:

    {
        "__comment__": "Maturity Logic applied to Multi-factor Authentication base question responses",
        "QuestionCategory": "MFA",
        "CodeName": "MFAML",
        "Title": "Multi-factor Authentication Maturity Logic",
        "IsVisible": true,
        "Tooltip": "",
        "Slug": "mfa_ml",
        "Desc": "The Maturity Logic applied to Multi-factor Authentication base question responses",
        "DetailedDesc": "Only base level Multi-factor Authentication questions are considered when calculating the Maturity level in this domain of the Essential Eight",
        "Expressions": [
            {
                "Operator": "",
                "Rules": [
                    "Q(1).Answer === false"
                ],
                "Override": false,
                "Level": 0
            },
            {
                "Operator": "AND",
                "Rules": [
                    "Q(1).Answer === true",
                    {
                        "Operator": "ANYIN",
                        "Rules": [
                            "Q(2).SelectedOptions",
                            [
                                "g",
                                "h",
                                "i",
                                "j"
                            ]
                        ]
                    }
                ],
                "Override": false,
                "Level": 1
            },
            {
                "Operator": "AND",
                "Rules": [
                    "Q(1).Answer === true",
                    {
                        "Operator": "OR",
                        "Rules": [
                            {
                                "Operator": "ANYIN",
                                "Rules": [
                                    "Q(2).SelectedOptions",
                                    [
                                        "f"
                                    ]
                                ]
                            },
                            {
                                "Operator": "ALLIN",
                                "Rules": [
                                    "Q(2).SelectedOptions",
                                    [
                                        "a",
                                        "b",
                                        "c",
                                        "d",
                                        "e"
                                    ]
                                ]
                            }
                        ]
                    },
                    "Q(3).Answer === false"
                ],
                "Override": false,
                "Level": 1
            },
            {
                "Operator": "AND",
                "Rules": [
                    "Q(1).Answer === true",
                    {
                        "Operator": "ANYIN",
                        "Rules": [
                            "Q(2).SelectedOptions",
                            [
                                "f"
                            ]
                        ]
                    },
                    "Q(3).Answer === true"
                ],
                "Override": false,
                "Level": 2
            },
            {
                "Operator": "AND",
                "Rules": [
                    "Q(1).Answer === true",
                    {
                        "Operator": "ALLIN",
                        "Rules": [
                            "Q(2).SelectedOptions",
                            [
                                "a",
                                "b",
                                "c",
                                "d",
                                "e"
                            ]
                        ]
                    },
                    "Q(3).Answer === true",
                    "Q(4).Answer === false"
                ],
                "Override": false,
                "Level": 2
            },
            {
                "Operator": "AND",
                "Rules": [
                    "Q(1).Answer === true",
                    {
                        "Operator": "ALLIN",
                        "Rules": [
                            "Q(2).SelectedOptions",
                            [
                                "a",
                                "b",
                                "c",
                                "d",
                                "e"
                            ]
                        ]
                    },
                    "Q(3).Answer === true",
                    "Q(4).Answer === true"
                ],
                "Override": false,
                "Level": 3
            }
        ]
    }

## Attributes Notes

1. `QuestionCategory` Indicates which of the ASD Essential Eight
   Maturity Logic is contained in this Category.  It can be
   thought of as the first part of the Foriegn Key to the Questions.

2. `Slug` is used as URL key for routing.
  
3. `Expressions` are a variable length array of elements, each of
   which contains an `Operator`, `Rules`, an `Override`, and a
   `Level`.

4. `Operator` indicates how the subsequent `Rules` are to be applied.
   Currently the `Operator`'s used include:
   1. `OR` - True if any of the subsequent `Rules` are true;
   2. `AND` - True only if all of the subsequent `Rules` are true;
   3. `_` - True only if the single subsequent `Rules` is true;
   4. `ANYIN` where the subsequent question response variable contains
      one or more of the specified responces; and
   5. `ALLIN` where the subsequent question response variable contains
      all of the specified responces.

5. `Rules`  boolean equations relating to the response given for a
   specific `QuestionSetNumber` (the second part of the Foriegn key to
   Questions i.e. Q(1).Answer) and a specified value.

6. `Level` the Maturity Level obtained by the user for this specific
   `QuestionCategory`.

7. `__comment__`, `Title`, `Desc`, and `DetailedDesc` are self-explnatory.

8. `Tooltip` is also self-explnatory, but as yet unused in any of the eight.

9. `CodeName`, `IsVisible`, and `Override` were considered as part of the
   initial development, but are unused, and their existance maybe reviewed
   into the future.
