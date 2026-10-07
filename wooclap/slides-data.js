// Introductory undergraduate question prompts; no answer keys.
window.AIML_WOOCLAP = {
  "lectures": [
    {
      "pack": "01_History_Part_1",
      "eventCode": "GMSPICB",
      "questions": [
        {
          "id": "L00-C01",
          "core": true,
          "type": "MCQ",
          "slide": "aiml",
          "when": "before",
          "purpose": "Opening / everyday intuition",
          "stem": "Which example shows a computer learning from examples?",
          "seconds": 90,
          "choices": [
            "A spam filter improves after being shown emails marked spam or not spam.",
            "A calculator follows its built-in rule for adding two numbers.",
            "A lamp switches on at a time you set.",
            "A document is sorted alphabetically using a fixed rule."
          ],
          "src": "https://app.wooclap.com/events/GMSPICB/questions/6aa8fd64ee75ef7f05b11605"
        },
        {
          "id": "L00-C02",
          "core": true,
          "type": "MCQ",
          "slide": "bayes",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "You think it will stay dry. Then you see dark clouds approaching. What is a reasonable response?",
          "seconds": 90,
          "choices": [
            "Keep your original belief unchanged, whatever you see.",
            "Decide that rain is now absolutely certain.",
            "Conclude that your earlier information never mattered.",
            "Become more confident that it might rain."
          ],
          "src": "https://app.wooclap.com/events/GMSPICB/questions/6aa8fd64ee75ef7f05b1160a"
        },
        {
          "id": "L00-C03",
          "core": true,
          "type": "MCQ",
          "slide": "imitation",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "What does the Turing imitation game focus on?",
          "seconds": 90,
          "choices": [
            "Whether a machine looks like a human.",
            "Whether a machine calculates faster than a human.",
            "Whether a machine’s conversation can be distinguished from a human’s.",
            "Whether a machine has been proved to feel emotions."
          ],
          "src": "https://app.wooclap.com/events/GMSPICB/questions/6aa8fd64ee75ef7f05b1160f"
        },
        {
          "id": "L00-O01",
          "core": false,
          "type": "MCQ",
          "slide": "perceptron",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "During perceptron training, why do we show the model the correct answer?",
          "seconds": 90,
          "choices": [
            "So it can avoid making any prediction.",
            "So its weights never need to change.",
            "So we no longer need any training examples.",
            "So it can adjust its weights when its prediction is wrong."
          ],
          "src": "https://app.wooclap.com/events/GMSPICB/questions/6aa90139d2f1e8b522d94334"
        },
        {
          "id": "L00-O03",
          "core": false,
          "type": "MCQ",
          "slide": "logreg",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "Two models use a similar S-shaped curve. Must they describe the same real-world problem?",
          "seconds": 90,
          "choices": [
            "No. A similar mathematical shape can be useful for different problems.",
            "Yes. A curve can have only one application.",
            "Yes. Similar curves must have been developed for the same purpose.",
            "No. The two models therefore cannot both be useful."
          ],
          "src": "https://app.wooclap.com/events/GMSPICB/questions/6aa90139d2f1e8b522d9433e"
        }
      ]
    },
    {
      "pack": "02_History_Part_2",
      "eventCode": "GMSPICB",
      "questions": [
        {
          "id": "L00-C04",
          "core": true,
          "type": "MCQ",
          "slide": "winter1",
          "when": "before",
          "purpose": "Prediction / causal reasoning",
          "stem": "A system performs well on a narrow benchmark. Its promoters claim that it is close to general intelligence, but deployments expose failures outside the benchmark. Which consequence could help produce an AI winter?",
          "seconds": 90,
          "choices": [
            "Success on one benchmark proves broad intelligence, so expectations no longer matter.",
            "The gap between the claims and demonstrated capability may erode confidence and funding.",
            "Failures outside the benchmark show that no AI technique can ever work.",
            "Researchers must discard every useful result produced by the system."
          ],
          "src": "https://app.wooclap.com/events/GMSPICB/questions/6aa8fd64ee75ef7f05b11614"
        },
        {
          "id": "L00-C05",
          "core": true,
          "type": "MCQ",
          "slide": "winter2",
          "when": "after",
          "purpose": "Synthesis / compare eras",
          "stem": "Which account best explains the two AI winters discussed in this lecture?",
          "seconds": 90,
          "choices": [
            "One decisive paper proved that every AI approach was impossible.",
            "In each case, expectations met technical and economic limits; confidence and funding fell, but research continued.",
            "Hardware stopped improving, causing all AI research to end until the next boom.",
            "Both winters were planned pauses after AI systems had met their promises."
          ],
          "src": "https://app.wooclap.com/events/GMSPICB/questions/6aa8fd64ee75ef7f05b11619"
        },
        {
          "id": "L00-C06",
          "core": true,
          "type": "MCQ",
          "slide": "gpt3",
          "when": "before",
          "purpose": "Prediction / distinguish mechanisms",
          "stem": "The same fixed language model receives two prompts. One gives only an instruction; the other also gives two input-output examples. The second follows the requested format more reliably. What is the best interpretation?",
          "seconds": 90,
          "choices": [
            "The examples permanently updated the model’s weights for all future users.",
            "Following the format proves that every fact in the response is correct.",
            "The examples changed the model’s context and guided this response; they did not by themselves retrain its weights.",
            "The examples changed the model’s software, so future prompts no longer matter."
          ],
          "src": "https://app.wooclap.com/events/GMSPICB/questions/6aa8fd64ee75ef7f05b1161e"
        },
        {
          "id": "L00-C07",
          "core": true,
          "type": "OpenQuestion",
          "slide": "summary",
          "when": "after",
          "purpose": "Exit / connect eras",
          "stem": "Choose two milestones from different eras in this lecture. In two sentences, explain how the later milestone addressed a limitation or opportunity left by the earlier one, and name one limitation that still remained.",
          "seconds": 150,
          "choices": [],
          "src": "https://app.wooclap.com/events/GMSPICB/questions/6aa8fd64ee75ef7f05b11623"
        },
        {
          "id": "L00-O02",
          "core": false,
          "type": "MCQ",
          "slide": "alphago-transformers",
          "when": "after",
          "purpose": "Optional / synthesis",
          "stem": "AlphaGo combined learned components with search. Which conclusion is best supported by its success?",
          "seconds": 90,
          "choices": [
            "Learning made search unnecessary once enough games had been observed.",
            "Combining learning with structured search can be powerful on a well-defined task without proving general intelligence.",
            "Beating expert players shows that the same system can solve unrelated intellectual tasks.",
            "Once a system outperforms humans, the method and task boundaries no longer matter."
          ],
          "src": "https://app.wooclap.com/events/GMSPICB/questions/6aa90139d2f1e8b522d94339"
        }
      ]
    },
    {
      "pack": "03_Search_Part_1",
      "eventCode": "GLDXPMN",
      "questions": [
        {
          "id": "L01-C01",
          "core": true,
          "type": "MCQ",
          "slide": "paths-costs",
          "when": "before",
          "purpose": "Opening / everyday intuition",
          "stem": "One route takes two roads of 3 minutes each. Another takes three roads of 1 minute each. Which route is faster?",
          "seconds": 60,
          "choices": [
            "The second route: 3 minutes in total.",
            "The first route: fewer roads always means less travel time.",
            "Both routes take 3 minutes.",
            "The first route: 3 minutes in total."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa8fdba099c5058e29a3a94"
        },
        {
          "id": "L01-C02",
          "core": true,
          "type": "MCQ",
          "slide": "bfs-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A search uses a waiting line: the first item added is the first served. B is waiting before C. Which is served first?",
          "seconds": 60,
          "choices": [
            "B.",
            "C.",
            "The item with the longest name.",
            "Both must be served at once."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa8fdba099c5058e29a3a99"
        },
        {
          "id": "L01-C03",
          "core": true,
          "type": "MCQ",
          "slide": "dfs-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "You put book B on a pile, then put book C on top. If you remove the top book first, which comes out first?",
          "seconds": 60,
          "choices": [
            "B.",
            "Whichever book was cheaper.",
            "Both books must come out at once.",
            "C."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa8fdba099c5058e29a3a9e"
        },
        {
          "id": "L01-C04",
          "core": true,
          "type": "MCQ",
          "slide": "ids-overhead",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "How does iterative deepening search work?",
          "seconds": 90,
          "choices": [
            "It searches only the start state and then stops.",
            "It stores every possible path before starting.",
            "It repeats depth-limited search, gradually allowing greater depth.",
            "It chooses roads only by their names."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa8fdba099c5058e29a3aa3"
        },
        {
          "id": "L01-C05",
          "core": true,
          "type": "MCQ",
          "slide": "ucs-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "You found a route to the destination that costs 10. Another route has cost 2 so far and needs one final step costing 1. Which is cheaper?",
          "seconds": 60,
          "choices": [
            "The first route, because it was found first.",
            "The second route, with total cost 2.",
            "The second route, with total cost 3.",
            "Both routes cost 10."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa8fdba099c5058e29a3aa8"
        },
        {
          "id": "L01-O02",
          "core": false,
          "type": "MCQ",
          "slide": "graph-versus-tree",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "A robot can move A → B → A. If it never checks where it has already been, what problem could occur?",
          "seconds": 60,
          "choices": [
            "It must reach every goal immediately.",
            "The two locations automatically become one location.",
            "It could keep going around the same loop.",
            "The robot can never return to A."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa9014ad2f1e8b522d96954"
        }
      ]
    },
    {
      "pack": "04_Search_Part_2",
      "eventCode": "GLDXPMN",
      "questions": [
        {
          "id": "L01-C06",
          "core": true,
          "type": "MCQ",
          "slide": "astar-scores",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A journey has cost 4 so far. You estimate that the remaining journey will cost 3. What is your estimate of the total cost?",
          "seconds": 60,
          "choices": [
            "1.",
            "3.",
            "7.",
            "4."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa8fdba099c5058e29a3aad"
        },
        {
          "id": "L01-C07",
          "core": true,
          "type": "MCQ",
          "slide": "graph-cautions",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "A search finds a cheaper route to a place it has already reached. What information should it keep?",
          "seconds": 90,
          "choices": [
            "Only the first route, even when it is more expensive.",
            "Only the name of the place, with no cost information.",
            "A claim that no route to this place exists.",
            "The new, lower cost and the route that achieves it."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa8fdba099c5058e29a3ab2"
        },
        {
          "id": "L01-C08",
          "core": true,
          "type": "MCQ",
          "slide": "branch-bound-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "Your best complete route costs 6. Another route already costs 8, and every extra step adds a nonnegative cost. Can it beat your best route?",
          "seconds": 60,
          "choices": [
            "Yes. Taking more steps always makes a route cheaper.",
            "Yes. An unfinished route always beats a finished one.",
            "No. Continuing cannot bring its total below 6.",
            "There is not enough information, even with the stated cost rule."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa8fdba099c5058e29a3ab7"
        },
        {
          "id": "L01-C09",
          "core": true,
          "type": "OpenQuestion",
          "slide": "summary",
          "when": "after",
          "purpose": "Exit / one takeaway",
          "stem": "In one sentence, explain the main difference between breadth-first and depth-first search.",
          "seconds": 120,
          "choices": [],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa8fdba099c5058e29a3abc"
        },
        {
          "id": "L01-O01",
          "core": false,
          "type": "MCQ",
          "slide": "admissibility",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "An estimate must never be greater than the true remaining cost. The true cost is 5. Which estimate breaks this rule?",
          "seconds": 60,
          "choices": [
            "0.",
            "3.",
            "5.",
            "7."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa9014ad2f1e8b522d9694f"
        },
        {
          "id": "L01-O03",
          "core": false,
          "type": "MCQ",
          "slide": "consistency",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "Why can an estimate of the remaining distance help a search algorithm?",
          "seconds": 90,
          "choices": [
            "It removes the need for a destination.",
            "Every estimate guarantees the shortest route.",
            "It replaces the map with a list of correct answers.",
            "It can help the algorithm choose promising places to explore first."
          ],
          "src": "https://app.wooclap.com/events/GLDXPMN/questions/6aa9014ad2f1e8b522d96959"
        }
      ]
    },
    {
      "pack": "05_Constraints_Part_1",
      "eventCode": "JCKQKTX",
      "questions": [
        {
          "id": "L02-C01",
          "core": true,
          "type": "MCQ",
          "slide": "definition",
          "when": "before",
          "purpose": "Opening / everyday intuition",
          "stem": "Two exams must use different rooms. Each can use room 1 or room 2. Which room assignment is allowed?",
          "seconds": 60,
          "choices": [
            "Both exams in room 1.",
            "Both exams in room 2.",
            "Exam A in room 1; exam B in room 2.",
            "Exam A in room 3; exam B in room 1."
          ],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa8fdea099c5058e29a758f"
        },
        {
          "id": "L02-C02",
          "core": true,
          "type": "MCQ",
          "slide": "dfs-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "While making a timetable, you put two classes in the same room at the same time. What is a sensible next step?",
          "seconds": 90,
          "choices": [
            "Undo one of those choices and try another.",
            "Keep the clash and assume a later choice will remove it.",
            "Conclude that no timetable could ever work.",
            "Stop checking room conflicts for the remaining classes."
          ],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa8fdea099c5058e29a7594"
        },
        {
          "id": "L02-C03",
          "core": true,
          "type": "MCQ",
          "slide": "gac-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A task must finish before 3 pm. Its possible finish times are 1 pm, 2 pm and 3 pm. Which time can you rule out?",
          "seconds": 60,
          "choices": [
            "1 pm.",
            "3 pm.",
            "2 pm.",
            "None of them."
          ],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa8fdea099c5058e29a7599"
        },
        {
          "id": "L02-C04",
          "core": true,
          "type": "MCQ",
          "slide": "consistent-unsat",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "Three exams must all use different rooms, but only two rooms are available. Can you assign a room to every exam?",
          "seconds": 90,
          "choices": [
            "Yes, by putting all three exams in room 1.",
            "Yes, because each pair of exams could fit in two rooms when considered alone.",
            "No. Three different rooms would be needed.",
            "Yes, as long as the rooms have different names."
          ],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa8fdea099c5058e29a759e"
        },
        {
          "id": "L02-O01",
          "core": false,
          "type": "MCQ",
          "slide": "ordering",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "One unassigned exam has 2 possible time slots; another has 5. Which does the “fewest remaining choices first” rule select?",
          "seconds": 60,
          "choices": [
            "The exam with 5 possible time slots.",
            "The exam with 2 possible time slots.",
            "Always the exam with the longer name.",
            "It cannot choose unless both have the same number of options."
          ],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa90155d2f1e8b522d97b6a"
        },
        {
          "id": "L02-O02",
          "core": false,
          "type": "MCQ",
          "slide": "requeue",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "A class loses one of its possible time slots. Should you recheck related room and teacher rules?",
          "seconds": 90,
          "choices": [
            "No. A rule can only be checked once.",
            "No. Removing an option can never affect another class.",
            "Yes. Fewer options for one class can affect the options for others.",
            "Yes, because removing a slot adds every previously rejected slot back."
          ],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa90155d2f1e8b522d97b6f"
        }
      ]
    },
    {
      "pack": "06_Constraints_Part_2",
      "eventCode": "JCKQKTX",
      "questions": [
        {
          "id": "L02-C05",
          "core": true,
          "type": "MCQ",
          "slide": "split-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "You must try all four choices 1, 2, 3 and 4. Which split covers every choice exactly once?",
          "seconds": 60,
          "choices": [
            "Try {1,2} in one branch and {3,4} in the other.",
            "Try {1,2} and {2,3}.",
            "Try {1} and {2}.",
            "Try {1,2,3} and {3,4}."
          ],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa8fdea099c5058e29a75a3"
        },
        {
          "id": "L02-C06",
          "core": true,
          "type": "MCQ",
          "slide": "local-intro",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "In local search for a timetable, what might the starting timetable look like?",
          "seconds": 90,
          "choices": [
            "Only a timetable already proved to have no clashes.",
            "A complete timetable with some clashes that we try to repair.",
            "A list of every possible correct timetable.",
            "A proof that making a timetable is impossible."
          ],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa8fdea099c5058e29a75a8"
        },
        {
          "id": "L02-C07",
          "core": true,
          "type": "MCQ",
          "slide": "anneal-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "You are rearranging a timetable and seem stuck. Why might you briefly accept a change that adds a clash?",
          "seconds": 90,
          "choices": [
            "It guarantees the very next change solves everything.",
            "It proves the current timetable is already the best possible one.",
            "Adding a clash is the final goal of timetable construction.",
            "It might let you reach a better arrangement after later changes."
          ],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa8fdea099c5058e29a75ad"
        },
        {
          "id": "L02-C08",
          "core": true,
          "type": "OpenQuestion",
          "slide": "summary",
          "when": "after",
          "purpose": "Exit / one takeaway",
          "stem": "Your timetable search runs out of time without finding a solution. Does that prove no valid timetable exists? Briefly explain.",
          "seconds": 120,
          "choices": [],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa8fdea099c5058e29a75b2"
        },
        {
          "id": "L02-O03",
          "core": false,
          "type": "MCQ",
          "slide": "cooling",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "Why might you restart a local search from a different initial timetable?",
          "seconds": 90,
          "choices": [
            "Every restart guarantees a valid timetable.",
            "A different starting point may lead to a better result.",
            "The rules of the problem stop applying after a restart.",
            "All starting points must produce the same sequence of changes."
          ],
          "src": "https://app.wooclap.com/events/JCKQKTX/questions/6aa90155d2f1e8b522d97b74"
        }
      ]
    },
    {
      "pack": "07_Intro_ML_Part_1",
      "eventCode": "JCBAAQM",
      "questions": [
        {
          "id": "L03-C01",
          "core": true,
          "type": "MCQ",
          "slide": "training-inference",
          "when": "before",
          "purpose": "Opening / everyday intuition",
          "stem": "An app is shown many photos marked “cat” or “dog”. It then labels a new photo. Which part is learning from examples?",
          "seconds": 90,
          "choices": [
            "Displaying the app’s logo.",
            "Saving the new photo’s file name.",
            "Simply opening the app on a phone.",
            "Using the marked photos to adjust how it recognizes cats and dogs."
          ],
          "src": "https://app.wooclap.com/events/JCBAAQM/questions/6aa8fe064c33f3f9df45d408"
        },
        {
          "id": "L03-C02",
          "core": true,
          "type": "MCQ",
          "slide": "signal-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "You want to teach a computer to tell cats from dogs using examples. Which training collection gives it the most useful feedback?",
          "seconds": 90,
          "choices": [
            "Photos paired only with random file names.",
            "Photos paired with the correct “cat” or “dog” label.",
            "A list of camera prices with no animal photos.",
            "Only the words “cat” and “dog”, with no examples."
          ],
          "src": "https://app.wooclap.com/events/JCBAAQM/questions/6aa8fe064c33f3f9df45d40d"
        },
        {
          "id": "L03-C03",
          "core": true,
          "type": "MCQ",
          "slide": "mask-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "We hide one word from an existing sentence and ask a model to guess it. Where can we find the correct answer?",
          "seconds": 60,
          "choices": [
            "In the original sentence before the word was hidden.",
            "Only by asking someone to write an entirely new sentence.",
            "In the model’s guess, which must always be right.",
            "Nowhere: hiding a word removes all possibility of checking it."
          ],
          "src": "https://app.wooclap.com/events/JCBAAQM/questions/6aa8fe064c33f3f9df45d412"
        },
        {
          "id": "L03-C04",
          "core": true,
          "type": "MCQ",
          "slide": "bandit-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "You usually choose a restaurant you like. Why might you try a new one?",
          "seconds": 90,
          "choices": [
            "Because a new restaurant is guaranteed to be better.",
            "To learn whether it might be even better.",
            "Because trying something new guarantees a good meal.",
            "Because previous experience tells you exactly how every new restaurant tastes."
          ],
          "src": "https://app.wooclap.com/events/JCBAAQM/questions/6aa8fe064c33f3f9df45d417"
        },
        {
          "id": "L03-O01",
          "core": false,
          "type": "MCQ",
          "slide": "semi-supervised",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "A training collection has a few labeled photos and many unlabeled photos. Learning from both is called what?",
          "seconds": 90,
          "choices": [
            "Semi-supervised learning.",
            "Testing only.",
            "Reinforcement learning because every photo gives a reward.",
            "Supervised learning that ignores all unlabeled photos."
          ],
          "src": "https://app.wooclap.com/events/JCBAAQM/questions/6aa90164d2f1e8b522d99a9e"
        }
      ]
    },
    {
      "pack": "08_Intro_ML_Part_2",
      "eventCode": "JCBAAQM",
      "questions": [
        {
          "id": "L03-C05",
          "core": true,
          "type": "MCQ",
          "slide": "matrix",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "A table has one row per house and columns for area, number of rooms and price. Which column is the target when predicting price?",
          "seconds": 60,
          "choices": [
            "Area.",
            "Price.",
            "Number of rooms.",
            "The row number."
          ],
          "src": "https://app.wooclap.com/events/JCBAAQM/questions/6aa8fe064c33f3f9df45d41c"
        },
        {
          "id": "L03-C06",
          "core": true,
          "type": "MCQ",
          "slide": "leakage",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "You want a fair test of whether a student can solve new exercises. Which set should you use for the test?",
          "seconds": 90,
          "choices": [
            "Only the exercises they have memorized.",
            "The practice sheet with the answers printed next to each question.",
            "Whichever practice exercises gave the highest score.",
            "Exercises the student has not already practiced or used to choose a strategy."
          ],
          "src": "https://app.wooclap.com/events/JCBAAQM/questions/6aa8fe064c33f3f9df45d421"
        },
        {
          "id": "L03-C07",
          "core": true,
          "type": "OpenQuestion",
          "slide": "summary",
          "when": "after",
          "purpose": "Exit / one takeaway",
          "stem": "Why do we test a machine-learning model on examples it did not learn from? Answer in one sentence.",
          "seconds": 120,
          "choices": [],
          "src": "https://app.wooclap.com/events/JCBAAQM/questions/6aa8fe064c33f3f9df45d426"
        },
        {
          "id": "L03-O02",
          "core": false,
          "type": "MCQ",
          "slide": "hypotheses",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "Which is a setting you choose before fitting a polynomial model, rather than a coefficient learned during fitting?",
          "seconds": 90,
          "choices": [
            "The fitted intercept.",
            "The fitted coefficient of x.",
            "The fitted coefficient of x squared.",
            "The polynomial degree: for example, choosing a line or a quadratic curve."
          ],
          "src": "https://app.wooclap.com/events/JCBAAQM/questions/6aa90164d2f1e8b522d99aa3"
        },
        {
          "id": "L03-O03",
          "core": false,
          "type": "MCQ",
          "slide": "generalization",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "You want to predict next month’s sales. Which test best resembles that use?",
          "seconds": 90,
          "choices": [
            "Learn from next month’s actual sales before predicting them.",
            "Learn from earlier months and test on a later month.",
            "Report only how well the model fits its training months.",
            "Include the answer for each test month among its inputs."
          ],
          "src": "https://app.wooclap.com/events/JCBAAQM/questions/6aa90164d2f1e8b522d99aa8"
        }
      ]
    },
    {
      "pack": "09_Regression_Part_1",
      "eventCode": "RBCJRAP",
      "questions": [
        {
          "id": "L04-C01",
          "core": true,
          "type": "MCQ",
          "slide": "residual-lab",
          "when": "before",
          "purpose": "Opening / everyday intuition",
          "stem": "A house costs 7 units, but a model predicts 5. Using error = actual value minus prediction, what is the error?",
          "seconds": 60,
          "choices": [
            "-2.",
            "12.",
            "+2.",
            "4."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa8fe5d4c33f3f9df46d96b"
        },
        {
          "id": "L04-C02",
          "core": true,
          "type": "MCQ",
          "slide": "fit-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A line predicts every training value exactly. What is its sum of squared prediction errors?",
          "seconds": 60,
          "choices": [
            "0.",
            "1.",
            "The number of training examples.",
            "We cannot tell even though every prediction is exact."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa8fe5d4c33f3f9df46d970"
        },
        {
          "id": "L04-C03",
          "core": true,
          "type": "MCQ",
          "slide": "r2",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "On the same nonconstant dataset, model A has R²=0.8 and model B has R²=0.3. Which has the smaller sum of squared errors?",
          "seconds": 90,
          "choices": [
            "Model A.",
            "Model B.",
            "They must have equal errors.",
            "R² only tells us whether the slope is positive."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa8fe5d4c33f3f9df46d975"
        },
        {
          "id": "L04-C04",
          "core": true,
          "type": "MCQ",
          "slide": "polynomial",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A scatterplot shows a clear U-shaped pattern. Which model could follow that shape better than a straight line?",
          "seconds": 90,
          "choices": [
            "A horizontal line only.",
            "The same straight line with a different color.",
            "A curve that includes an x-squared term.",
            "Deleting the response values before fitting."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa8fe5d4c33f3f9df46d97a"
        },
        {
          "id": "L04-C05",
          "core": true,
          "type": "MCQ",
          "slide": "overfit-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A student memorizes every practice answer but struggles with new exercises. Which model behavior is this most like?",
          "seconds": 90,
          "choices": [
            "Doing poorly on both practice and new examples.",
            "Doing equally well on every new example.",
            "Having too little flexibility to fit any practice example.",
            "Doing very well on training examples but poorly on new examples."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa8fe5d4c33f3f9df46d97f"
        },
        {
          "id": "L04-O01",
          "core": false,
          "type": "MCQ",
          "slide": "line",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "In a straight-line model y ≈ intercept + slope × x, what does the slope describe?",
          "seconds": 90,
          "choices": [
            "The total number of observations.",
            "The prediction when x is zero.",
            "The color of the plotted line.",
            "The predicted change in y when x increases by one unit."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa90172f68598b6f2411259"
        }
      ]
    },
    {
      "pack": "10_Regression_Part_2",
      "eventCode": "RBCJRAP",
      "questions": [
        {
          "id": "L04-C06",
          "core": true,
          "type": "MCQ",
          "slide": "bias-lab",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "You fit a model again using a slightly different training sample, and its curve changes a lot. What does this suggest?",
          "seconds": 90,
          "choices": [
            "The model must make identical predictions on every dataset.",
            "The fitted model is sensitive to which training examples it receives.",
            "The training sample has no effect on the fit.",
            "The target must be a category rather than a number."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa8fe5d4c33f3f9df46d984"
        },
        {
          "id": "L04-C07",
          "core": true,
          "type": "MCQ",
          "slide": "pvalues",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "A regression slope has a small p-value. Does that alone prove that changing the input causes the output to change?",
          "seconds": 90,
          "choices": [
            "Yes. Every small p-value proves causation.",
            "No. Evidence of an association is not by itself proof of causation.",
            "Yes, provided the graph uses a straight line.",
            "No, because a small p-value means the slope must be exactly zero."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa8fe5d4c33f3f9df46d989"
        },
        {
          "id": "L04-C08",
          "core": true,
          "type": "MCQ",
          "slide": "adjustment",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "Ice-cream sales and swimming incidents both rise in warm weather. What could help explain their association?",
          "seconds": 90,
          "choices": [
            "Warm weather can affect both ice-cream buying and swimming activity.",
            "Buying ice cream has been proved to cause every incident.",
            "An association guarantees that one variable causes the other.",
            "Two quantities that rise together cannot share another cause."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa8fe5d4c33f3f9df46d98e"
        },
        {
          "id": "L04-C09",
          "core": true,
          "type": "OpenQuestion",
          "slide": "summary",
          "when": "after",
          "purpose": "Exit / one takeaway",
          "stem": "In one sentence, explain what overfitting would look like when comparing training results with results on new data.",
          "seconds": 120,
          "choices": [],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa8fe5d4c33f3f9df46d993"
        },
        {
          "id": "L04-O02",
          "core": false,
          "type": "MCQ",
          "slide": "interval",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "Two confidence intervals for the same slope are computed using the same confidence level. What does the wider interval communicate?",
          "seconds": 90,
          "choices": [
            "Greater precision about the slope.",
            "Proof that the slope causes the outcome.",
            "Less precision about the slope.",
            "A guarantee that every future observation lies in the interval."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa90172f68598b6f241125e"
        },
        {
          "id": "L04-O03",
          "core": false,
          "type": "MCQ",
          "slide": "multiple",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "A model uses house area and number of rooms to predict price. How does this differ from using area alone?",
          "seconds": 90,
          "choices": [
            "It uses more than one input feature.",
            "It no longer predicts a number.",
            "It cannot be a regression model.",
            "It is guaranteed to make every prediction correctly."
          ],
          "src": "https://app.wooclap.com/events/RBCJRAP/questions/6aa90172f68598b6f2411263"
        }
      ]
    },
    {
      "pack": "11_Classification_Part_1",
      "eventCode": "LQMJZRC",
      "questions": [
        {
          "id": "L05-C01",
          "core": true,
          "type": "MCQ",
          "slide": "classification",
          "when": "before",
          "purpose": "Opening / everyday intuition",
          "stem": "Which task predicts a category rather than a number?",
          "seconds": 60,
          "choices": [
            "Predicting a house price.",
            "Deciding whether an email is spam or not spam.",
            "Predicting tomorrow’s temperature.",
            "Predicting the duration of a journey."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa8fe9b4c33f3f9df472d89"
        },
        {
          "id": "L05-C02",
          "core": true,
          "type": "MCQ",
          "slide": "bayes-error",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A model says an email has a 70% chance of being spam. Can that email still turn out not to be spam?",
          "seconds": 60,
          "choices": [
            "No. Anything above 50% is certain.",
            "No. A model’s most likely answer is always correct.",
            "Yes. A probability below 100% leaves room for another outcome.",
            "Yes, but only if 70% is less than 50%."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa8fe9b4c33f3f9df472d8e"
        },
        {
          "id": "L05-C03",
          "core": true,
          "type": "MCQ",
          "slide": "bayes-theorem",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "An email contains a word that is more common in spam than in ordinary mail. What can this word provide?",
          "seconds": 90,
          "choices": [
            "Evidence that can increase the estimated chance of spam.",
            "Proof that the email is certainly spam.",
            "Proof that the email is certainly ordinary mail.",
            "A reason to ignore every other piece of information."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa8fe9b4c33f3f9df472d93"
        },
        {
          "id": "L05-C04",
          "core": true,
          "type": "MCQ",
          "slide": "independence",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "What simplifying assumption does Naive Bayes make about input features once the class is known?",
          "seconds": 90,
          "choices": [
            "It assumes every feature has exactly the same value.",
            "It assumes features contain no information about the class.",
            "It treats the features as independent within that class.",
            "It assumes every possible class is always equally common."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa8fe9b4c33f3f9df472d98"
        },
        {
          "id": "L05-C05",
          "core": true,
          "type": "MCQ",
          "slide": "logistic-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A spam filter flags emails when their spam score is at least 0.5. If we lower the cutoff to 0.2 and keep all scores fixed, what can happen?",
          "seconds": 90,
          "choices": [
            "Fewer emails must be flagged as spam.",
            "Every email’s score is automatically recalculated.",
            "The cutoff can never affect a decision.",
            "More emails may be flagged as spam."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa8fe9b4c33f3f9df472d9d"
        },
        {
          "id": "L05-O01",
          "core": false,
          "type": "MCQ",
          "slide": "decision-lab",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "In a screening task, missing a real problem is much more costly than a false alarm. What tradeoff might we accept?",
          "seconds": 90,
          "choices": [
            "More missed problems just to avoid every false alarm.",
            "A guarantee of making neither kind of mistake.",
            "Ignoring the different costs of the two errors.",
            "More false alarms in order to miss fewer real problems."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa9017cd2f1e8b522d9c1c6"
        },
        {
          "id": "L05-O02",
          "core": false,
          "type": "MCQ",
          "slide": "smoothing",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "Why might Naive Bayes use smoothing for a word that never appeared in one class’s training examples?",
          "seconds": 90,
          "choices": [
            "To avoid treating that unseen word as completely impossible in the class.",
            "To guarantee that all future messages are classified correctly.",
            "To delete all the other words from the model.",
            "To avoid needing any labeled training messages."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa9017cd2f1e8b522d9c1cb"
        }
      ]
    },
    {
      "pack": "12_Classification_Part_2",
      "eventCode": "LQMJZRC",
      "questions": [
        {
          "id": "L05-C06",
          "core": true,
          "type": "MCQ",
          "slide": "log-loss",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "The correct label for a training photo is “cat”. Which prediction gives the correct label more probability?",
          "seconds": 60,
          "choices": [
            "Cat: 10%; dog: 90%.",
            "Cat: 90%; dog: 10%.",
            "Cat: 30%; dog: 70%.",
            "Cat: 50%; dog: 50%."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa8fe9b4c33f3f9df472da2"
        },
        {
          "id": "L05-C07",
          "core": true,
          "type": "MCQ",
          "slide": "neighbors-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A new point’s three nearest labeled neighbors are two cats and one dog. What does a simple majority vote predict?",
          "seconds": 60,
          "choices": [
            "Dog.",
            "A new third category.",
            "There is a tie.",
            "Cat."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa8fe9b4c33f3f9df472da7"
        },
        {
          "id": "L05-C08",
          "core": true,
          "type": "MCQ",
          "slide": "validation-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "You are choosing among several classifiers. Which data should you use to compare choices while keeping a final test fair?",
          "seconds": 90,
          "choices": [
            "The final test set after every change, keeping only the best score.",
            "Only the examples each model trained on.",
            "A validation set, leaving the final test set unused until the choice is made.",
            "The final test answers as extra training features."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa8fe9b4c33f3f9df472dac"
        },
        {
          "id": "L05-C09",
          "core": true,
          "type": "OpenQuestion",
          "slide": "summary",
          "when": "after",
          "purpose": "Exit / one takeaway",
          "stem": "A spam filter wrongly blocks an important email. In one sentence, explain why counting only its correct predictions might miss something important.",
          "seconds": 120,
          "choices": [],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa8fe9b4c33f3f9df472db1"
        },
        {
          "id": "L05-O03",
          "core": false,
          "type": "MCQ",
          "slide": "regression-lab",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "A nearest-neighbor regressor averages two nearby examples with values 2 and 6. What does it predict?",
          "seconds": 60,
          "choices": [
            "2.",
            "6.",
            "8.",
            "4."
          ],
          "src": "https://app.wooclap.com/events/LQMJZRC/questions/6aa9017cd2f1e8b522d9c1d0"
        }
      ]
    },
    {
      "pack": "13_Classification_Part_3",
      "eventCode": "LQCRNNR",
      "questions": [
        {
          "id": "L06-C01",
          "core": true,
          "type": "MCQ",
          "slide": "threshold-lab",
          "when": "before",
          "purpose": "Opening / everyday intuition",
          "stem": "An alarm should activate only when BOTH switches are on. Which input should activate it?",
          "seconds": 60,
          "choices": [
            "Switch 1 on and switch 2 on.",
            "Switch 1 on and switch 2 off.",
            "Switch 1 off and switch 2 on.",
            "Both switches off."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa8fec9f68598b6f23c1f90"
        },
        {
          "id": "L06-C02",
          "core": true,
          "type": "MCQ",
          "slide": "update-intuition",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "A perceptron predicts the wrong class for a training example. What is the purpose of its weight update?",
          "seconds": 90,
          "choices": [
            "To move its decision rule toward giving this example the correct label.",
            "To make its prediction on this example even less correct on purpose.",
            "To remove every other training example.",
            "To prove it will now classify every possible example correctly."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa8fec9f68598b6f23c1f95"
        },
        {
          "id": "L06-C03",
          "core": true,
          "type": "MCQ",
          "slide": "training-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A classifier gets one training example right. Is that enough to know it gets every training example right?",
          "seconds": 60,
          "choices": [
            "Yes. One correct example proves the whole dataset is correct.",
            "No. The other examples must also be checked.",
            "Yes, if that example was shown first.",
            "No, because no classifier can ever get more than one example right."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa8fec9f68598b6f23c1f9a"
        },
        {
          "id": "L06-C04",
          "core": true,
          "type": "MCQ",
          "slide": "xor-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "Two classes are arranged so that no straight line can separate them. What kind of change could help?",
          "seconds": 90,
          "choices": [
            "Draw the same straight line in a different color.",
            "Use a model that can make a curved or more complex boundary.",
            "Repeat the same straight-line attempt and assume geometry will change.",
            "Rename the two classes without moving any points."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa8fec9f68598b6f23c1f9f"
        },
        {
          "id": "L06-C05",
          "core": true,
          "type": "MCQ",
          "slide": "distance",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A point lies very close to a classifier’s dividing line. What could a small change to that point’s measured features do?",
          "seconds": 90,
          "choices": [
            "Guarantee that its class prediction stays the same.",
            "Remove the need for a dividing line.",
            "Move it across the line and change its predicted class.",
            "Force every other point to change class too."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa8fec9f68598b6f23c1fa4"
        },
        {
          "id": "L06-C06",
          "core": true,
          "type": "MCQ",
          "slide": "soft-margin",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "Why does a soft-margin SVM allow some training points to violate the margin?",
          "seconds": 90,
          "choices": [
            "Its goal is to misclassify every point.",
            "Real data may overlap or contain noise, so a perfect separation can be too rigid.",
            "It ignores all training labels.",
            "Allowing a violation guarantees perfect predictions on future data."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa8fec9f68598b6f23c1fa9"
        },
        {
          "id": "L06-O01",
          "core": false,
          "type": "MCQ",
          "slide": "hinge",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "For an SVM, can a correctly classified point still lie too close to the boundary to satisfy the desired margin?",
          "seconds": 90,
          "choices": [
            "Yes. A point can be on the correct side but still inside the margin.",
            "No. Every correct prediction must be far from the boundary.",
            "No. Only misclassified points have a distance to the boundary.",
            "Yes, but only when the model has no features."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa90189f68598b6f241330a"
        }
      ]
    },
    {
      "pack": "14_Classification_Part_4",
      "eventCode": "LQCRNNR",
      "questions": [
        {
          "id": "L06-C07",
          "core": true,
          "type": "MCQ",
          "slide": "lift-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "Points near the center belong to one class; points in a surrounding ring belong to another. Which extra feature could help describe this pattern?",
          "seconds": 90,
          "choices": [
            "The order in which the points were typed into the file.",
            "Distance from the center.",
            "A random name assigned to each point.",
            "The color used to draw the page background."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa8fec9f68598b6f23c1fae"
        },
        {
          "id": "L06-C08",
          "core": true,
          "type": "MCQ",
          "slide": "kernel-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "What is the main benefit of a kernel in the SVM examples?",
          "seconds": 90,
          "choices": [
            "It guarantees that no training data are needed.",
            "It guarantees that every training fit will work on new data.",
            "It helps the model represent more complex boundaries through suitable similarity calculations.",
            "It turns every class label into a measured distance."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa8fec9f68598b6f23c1fb3"
        },
        {
          "id": "L06-C09",
          "core": true,
          "type": "OpenQuestion",
          "slide": "summary",
          "when": "after",
          "purpose": "Exit / one takeaway",
          "stem": "An SVM gets every training example right. What would you check before trusting it on new examples?",
          "seconds": 120,
          "choices": [],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa8fec9f68598b6f23c1fb8"
        },
        {
          "id": "L06-O02",
          "core": false,
          "type": "MCQ",
          "slide": "dual",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "Why are support vectors important in an SVM?",
          "seconds": 90,
          "choices": [
            "They are new test points that supply the correct answer.",
            "They are arbitrary names assigned to the classes.",
            "They are training points that help determine the fitted boundary.",
            "They are the axes used to draw every plot."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa90189f68598b6f241330f"
        },
        {
          "id": "L06-O03",
          "core": false,
          "type": "MCQ",
          "slide": "valid-kernel",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "Why should we compare a flexible kernel model with a simpler model on validation data?",
          "seconds": 90,
          "choices": [
            "Extra flexibility can fit training details that do not help on new cases.",
            "A more flexible model is always better on every dataset.",
            "Validation removes the need to train either model.",
            "A simpler model cannot make any correct predictions."
          ],
          "src": "https://app.wooclap.com/events/LQCRNNR/questions/6aa90189f68598b6f2413314"
        }
      ]
    },
    {
      "pack": "15_Clustering_Part_1",
      "eventCode": "IZOXLUG",
      "questions": [
        {
          "id": "L07-C01",
          "core": true,
          "type": "MCQ",
          "slide": "unlabeled",
          "when": "before",
          "purpose": "Opening / everyday intuition",
          "stem": "You have a folder of unlabeled photos and want to group similar ones. Which information is missing compared with supervised classification?",
          "seconds": 90,
          "choices": [
            "The photos themselves.",
            "Every possible similarity between photos.",
            "The correct category label for each training photo.",
            "The ability to store photos on a computer."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa8feeaee75ef7f05b43b5d"
        },
        {
          "id": "L07-C02",
          "core": true,
          "type": "MCQ",
          "slide": "kmeans-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "Three points lie at positions 0, 2 and 4 on a line. Where is their average position?",
          "seconds": 60,
          "choices": [
            "2.",
            "0.",
            "4.",
            "6."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa8feeaee75ef7f05b43b62"
        },
        {
          "id": "L07-C03",
          "core": true,
          "type": "MCQ",
          "slide": "choose-k",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "You group 20 photos. If you put each photo in its own group, have you necessarily found a useful summary?",
          "seconds": 90,
          "choices": [
            "Yes. More groups always make a better summary.",
            "No. Twenty separate groups may tell us little about shared patterns.",
            "Yes. One-photo groups prove there are exactly 20 natural categories.",
            "No. A group is never allowed to contain only one photo."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa8feeaee75ef7f05b43b67"
        },
        {
          "id": "L07-C04",
          "core": true,
          "type": "MCQ",
          "slide": "silhouette-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A point is close to others in its own group and far from other groups. Does it appear well placed?",
          "seconds": 90,
          "choices": [
            "No. A good grouping requires it to be far from its own group.",
            "No. Every point must be equally close to all groups.",
            "We can conclude its group is certainly a real-world category.",
            "Yes. Its own group seems a better geometric match."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa8feeaee75ef7f05b43b6c"
        },
        {
          "id": "L07-C05",
          "core": true,
          "type": "MCQ",
          "slide": "gmm-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A point sits between two overlapping groups. What could a soft assignment say?",
          "seconds": 90,
          "choices": [
            "The point has some membership probability in each group.",
            "The point must belong to neither group because groups overlap.",
            "Every point must have exactly the same membership probabilities.",
            "The groups must immediately be given known ground-truth labels."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa8feeaee75ef7f05b43b71"
        },
        {
          "id": "L07-C06",
          "core": true,
          "type": "MCQ",
          "slide": "em-limits",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A fitting method stops because its result is no longer changing much. Does this prove it found the best possible result?",
          "seconds": 90,
          "choices": [
            "Yes. Stopping always proves a global best solution.",
            "No. A different starting point might lead to a better result.",
            "Yes. Any unchanged result must match the real-world categories.",
            "No. A fitting method is never allowed to stop."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa8feeaee75ef7f05b43b76"
        },
        {
          "id": "L07-O01",
          "core": false,
          "type": "MCQ",
          "slide": "update",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "What does a K-means centroid represent?",
          "seconds": 90,
          "choices": [
            "Always the very first point in the file.",
            "The number of labels supplied by a teacher.",
            "A point that must be outside every cluster.",
            "The average location of the points assigned to a nonempty cluster."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa90192a9ab4759acaaa117"
        }
      ]
    },
    {
      "pack": "16_Clustering_Part_2",
      "eventCode": "IZOXLUG",
      "questions": [
        {
          "id": "L07-C07",
          "core": true,
          "type": "MCQ",
          "slide": "hierarchy-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A grouping method starts with each point alone and repeatedly joins the closest groups. What does it build?",
          "seconds": 90,
          "choices": [
            "A list of known correct class labels.",
            "A hierarchy of groups, from smaller groups to larger ones.",
            "A rule that never changes the number of groups.",
            "A model that must predict a numeric target."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa8feeaee75ef7f05b43b7b"
        },
        {
          "id": "L07-C08",
          "core": true,
          "type": "MCQ",
          "slide": "pca-lab",
          "when": "before",
          "purpose": "Prediction / intuition",
          "stem": "A cloud of points is stretched along a diagonal. Which line would usually preserve more of its spread when the points are projected onto it?",
          "seconds": 90,
          "choices": [
            "A line following the cloud’s long direction.",
            "A line across the cloud’s narrow direction.",
            "Any line: the direction never matters.",
            "A line chosen only from the points’ row numbers."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa8feeaee75ef7f05b43b80"
        },
        {
          "id": "L07-C09",
          "core": true,
          "type": "MCQ",
          "slide": "scaling",
          "when": "after",
          "purpose": "Check / core understanding",
          "stem": "Why can feature scaling matter before clustering?",
          "seconds": 90,
          "choices": [
            "Scaling supplies the missing correct class labels.",
            "A feature with much larger numerical values can dominate the distance calculation.",
            "Scaling guarantees that every group has a real-world meaning.",
            "Distances are always unchanged when just one feature is rescaled."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa8feeaee75ef7f05b43b85"
        },
        {
          "id": "L07-C10",
          "core": true,
          "type": "OpenQuestion",
          "slide": "summary",
          "when": "after",
          "purpose": "Exit / one takeaway",
          "stem": "In one sentence, explain one reason why a clustering result should be interpreted rather than automatically accepted as the truth.",
          "seconds": 120,
          "choices": [],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa8feeaee75ef7f05b43b8a"
        },
        {
          "id": "L07-O02",
          "core": false,
          "type": "MCQ",
          "slide": "reconstruct",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "PCA keeps only a few directions from a dataset with many features. What is a possible tradeoff?",
          "seconds": 90,
          "choices": [
            "Guaranteed perfect reconstruction using any number of directions.",
            "New correct class labels are automatically created.",
            "Every discarded detail is proved irrelevant to every task.",
            "A simpler representation, with some information lost."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa90192a9ab4759acaaa11c"
        },
        {
          "id": "L07-O03",
          "core": false,
          "type": "MCQ",
          "slide": "hierarchy-limits",
          "when": "after",
          "purpose": "Optional / basic extension",
          "stem": "In a clustering tree, two observations join together early, at a small merge distance. What does that suggest under the chosen method?",
          "seconds": 90,
          "choices": [
            "They have been proved to share a known class label.",
            "They are necessarily the most different observations.",
            "Their row numbers must be consecutive.",
            "The method regards them as relatively similar."
          ],
          "src": "https://app.wooclap.com/events/IZOXLUG/questions/6aa90192a9ab4759acaaa121"
        }
      ]
    }
  ]
};
