/* ═══════════════════════════════════════════════════════
   SBAC FIAB REVIEW · Place Value & Multidigit Whole Numbers
   FORM B — 15 items (parallel to Form A, new numbers)
═══════════════════════════════════════════════════════ */
window.FORM_B = [

  { id:"B01", type:"grid",
    q:"Read each statement. Select True or False for each one.",
    cols:["True","False"],
    rows:[
      { text:"805 = 800 + 50",                                    answer:"False" },
      { text:"five thousand seventy > 5 thousands + 7 ones",      answer:"True"  },
      { text:"seven hundred ninety-nine < eight hundred",         answer:"True"  }
    ],
    explanation:"800 + 50 is 850, not 805 — 805 is 800 + 5, so the first one is False. Five thousand seventy is 5,070 and 5 thousands + 7 ones is 5,007, so 5,070 is greater — True. 799 is less than 800 — True." },

  { id:"B02",
    q:"Round 36,758 to the nearest hundred.",
    choices:["36,000","36,700","36,800","37,000"],
    answer:"36,800",
    explanation:"The hundreds digit is 7. Look at the digit to its right: 5. Since it is 5 or more, round the hundreds up — 36,800." },

  { id:"B03",
    q:"24,&#9723;19 > 24,519 — What is the SMALLEST digit that makes this comparison true?",
    choices:["4","5","6","7"],
    answer:"6",
    explanation:"The thousands are the same, so compare the hundreds place. The missing digit must be greater than 5. The smallest digit greater than 5 is 6." },

  { id:"B04", type:"symbol",
    q:"7,043 &#9723; 4 hundreds + 3 ones + 7 thousands",
    explanation:"The terms are out of order. 4 hundreds + 3 ones + 7 thousands is 7,000 + 400 + 3 = 7,403. Since 7,043 is less than 7,403, the answer is <.",
    answer:"<" },

  { id:"B05",
    q:"The value of the digit 3 in 30,000 is how many times the value of the digit 3 in 3,000?",
    choices:["1 time as large","10 times as large","100 times as large","1,000 times as large"],
    answer:"10 times as large",
    explanation:"30,000 is 3 ten thousands and 3,000 is 3 thousands. Each place is 10 times the place to its right, so 30,000 is 10 times 3,000." },

  { id:"B06", type:"grid",
    q:"Does each number round to 28,000 when rounded to the nearest thousand?",
    cols:["Yes","No"],
    rows:[
      { text:"27,650", answer:"Yes" },
      { text:"28,431", answer:"Yes" },
      { text:"27,382", answer:"No"  }
    ],
    explanation:"27,650 has 6 hundreds, so it rounds UP to 28,000 — Yes. 28,431 has 4 hundreds, so it rounds down to 28,000 — Yes. 27,382 has 3 hundreds, so it rounds down to 27,000 — No." },

  { id:"B07",
    q:"Round 85,097 to the nearest thousand.",
    choices:["85,000","85,100","86,000","90,000"],
    answer:"85,000",
    explanation:"The thousands digit is 5. Look at the hundreds digit: 0. Since 0 is less than 5, the thousands digit stays the same — 85,000. The 97 does not matter." },

  { id:"B08", type:"grid",
    q:"Read each statement. Select True or False for each one.",
    cols:["True","False"],
    rows:[
      { text:"670 < 70 + 600",                                        answer:"False" },
      { text:"40 tens + 40 ones = 4 hundreds + 4 tens",               answer:"True"  },
      { text:"60 + 2 + 900 > 9 hundreds + 2 tens + 6 ones",           answer:"True"  }
    ],
    explanation:"70 + 600 is 670, so the two sides are EQUAL — 670 is not less than 670, so False. 40 tens + 40 ones is 400 + 40 = 440, and 4 hundreds + 4 tens is also 440 — True. 60 + 2 + 900 is 962, and 9 hundreds + 2 tens + 6 ones is 926. 962 IS greater than 926 — True." },

  { id:"B09", type:"grid",
    q:"Does each number round to 51,000 when rounded to the nearest thousand?",
    cols:["Yes","No"],
    rows:[
      { text:"50,617", answer:"Yes" },
      { text:"51,298", answer:"Yes" },
      { text:"51,804", answer:"No"  }
    ],
    explanation:"50,617 has 6 hundreds, so it rounds UP to 51,000 — Yes. 51,298 has 2 hundreds, so it rounds down to 51,000 — Yes. 51,804 has 8 hundreds, so it rounds up to 52,000 — No." },

  { id:"B10", type:"symbol",
    q:"300 + 60 + 5,000 + 4 &#9723; 4 thousands + 13 hundreds + 4 ones + 6 tens",
    explanation:"The left side is 5,364. On the right, 13 hundreds is a regrouped way of writing 1,300: 4,000 + 1,300 + 4 + 60 = 5,364. The two sides are equal, so the answer is =.",
    answer:"=" },

  { id:"B11",
    q:"How do the numbers 170 and 1,700 compare?",
    choices:["1,700 is 1 time as large as 170","1,700 is 10 times as large as 170","1,700 is 100 times as large as 170","1,700 is 1,000 times as large as 170"],
    answer:"1,700 is 10 times as large as 170",
    explanation:"Every digit in 1,700 has shifted one place to the left compared with 170. Moving one place to the left makes a number 10 times as large." },

  { id:"B12",
    q:"Round 463,928 to the nearest ten thousand.",
    choices:["400,000","460,000","464,000","470,000"],
    answer:"460,000",
    explanation:"The ten thousands digit is 6. Look at the thousands digit: 3. Since 3 is less than 5, the ten thousands digit stays the same — 460,000." },

  { id:"B13",
    q:"Devon rounded 6,948 to the nearest thousand and got 7,000. Maya rounded 6,948 to the nearest hundred and got 6,900. Both students are correct. Devon then says: \"A number rounded to the thousands place is ALWAYS greater than the same number rounded to the hundreds place.\" Which number shows that Devon is WRONG?",
    choices:["2,761","4,682","5,132","8,915"],
    answer:"5,132",
    explanation:"5,132 rounded to the nearest thousand is 5,000, but rounded to the nearest hundred it is 5,100. Here the thousands rounding is SMALLER, so Devon's rule is not always true. The other three numbers all round up to a greater thousand, so they support his claim instead of disproving it." },

  { id:"B14",
    q:"What is 900,000 + 7,000 + 60 + 2 written in standard form?",
    choices:["907,062","970,062","907,602","97,062"],
    answer:"907,062",
    explanation:"9 hundred thousands, 0 ten thousands, 7 thousands, 0 hundreds, 6 tens, 2 ones. Every empty place needs a zero to hold it: 907,062." },

  { id:"B15",
    q:"A museum counted 425,306 visitors in 2023, 419,872 visitors in 2024, and 452,130 visitors in 2025. Which list orders the numbers from GREATEST to LEAST?",
    choices:[
      "452,130   425,306   419,872",
      "419,872   425,306   452,130",
      "425,306   452,130   419,872",
      "452,130   419,872   425,306"
    ],
    answer:"452,130   425,306   419,872",
    explanation:"All three have 4 hundred thousands, so compare the ten thousands: 5 is greatest, so 452,130 comes first. Then compare 425,306 and 419,872 — 2 ten thousands is more than 1 ten thousand, so 425,306 comes next and 419,872 is least." }

];
