/* ═══════════════════════════════════════════════════════
   SBAC FIAB REVIEW · Place Value & Multidigit Whole Numbers
   FORM C — 15 items (parallel to Forms A & B, new numbers)
═══════════════════════════════════════════════════════ */
window.FORM_C = [

  { id:"C01", type:"grid",
    q:"Read each statement. Select True or False for each one.",
    cols:["True","False"],
    rows:[
      { text:"308 = 300 + 80",                                    answer:"False" },
      { text:"nine thousand fifty > 9 thousands + 5 ones",        answer:"True"  },
      { text:"six hundred ninety-nine < seven hundred",           answer:"True"  }
    ],
    explanation:"300 + 80 is 380, not 308 — 308 is 300 + 8, so the first one is False. Nine thousand fifty is 9,050 and 9 thousands + 5 ones is 9,005, so 9,050 is greater — True. 699 is less than 700 — True." },

  { id:"C02", type:"entry",
    q:"Round 84,236 to the nearest hundred.",
    answer:"84,200",
    explanation:"The hundreds digit is 2. Look at the digit to its right: 3. Since 3 is less than 5, the hundreds digit stays the same — 84,200." },

  { id:"C03", type:"entry",
    q:"73,&#9723;58 > 73,858 — What is the SMALLEST digit that makes this comparison true?",
    answer:"9",
    explanation:"The thousands are the same, so compare the hundreds place. The missing digit must be greater than 8. The only digit greater than 8 is 9." },

  { id:"C04", type:"symbol",
    q:"6,072 &#9723; 7 hundreds + 2 ones + 6 thousands",
    explanation:"The terms are out of order. 7 hundreds + 2 ones + 6 thousands is 6,000 + 700 + 2 = 6,702. Since 6,072 is less than 6,702, the answer is <.",
    answer:"<" },

  { id:"C05",
    q:"The value of the digit 8 in 80,000 is how many times the value of the digit 8 in 8,000?",
    choices:["1 time as large","10 times as large","100 times as large","1,000 times as large"],
    answer:"10 times as large",
    explanation:"80,000 is 8 ten thousands and 8,000 is 8 thousands. Each place is 10 times the place to its right, so 80,000 is 10 times 8,000." },

  { id:"C06", type:"grid",
    q:"Does each number round to 19,000 when rounded to the nearest thousand?",
    cols:["Yes","No"],
    rows:[
      { text:"18,741", answer:"Yes" },
      { text:"19,320", answer:"Yes" },
      { text:"19,555", answer:"No"  }
    ],
    explanation:"18,741 has 7 hundreds, so it rounds UP to 19,000 — Yes. 19,320 has 3 hundreds, so it rounds down to 19,000 — Yes. 19,555 has 5 hundreds, so it rounds up to 20,000 — No." },

  { id:"C07", type:"entry",
    q:"Round 57,483 to the nearest thousand.",
    answer:"57,000",
    explanation:"The thousands digit is 7. Look at the hundreds digit: 4. Since 4 is less than 5, the thousands digit stays the same — 57,000. The 83 does not matter." },

  { id:"C08", type:"grid",
    q:"Read each statement. Select True or False for each one.",
    cols:["True","False"],
    rows:[
      { text:"920 < 20 + 900",                                        answer:"False" },
      { text:"60 tens + 60 ones = 6 hundreds + 6 tens",               answer:"True"  },
      { text:"80 + 4 + 700 > 7 hundreds + 4 tens + 8 ones",           answer:"True"  }
    ],
    explanation:"20 + 900 is 920, so the two sides are EQUAL — 920 is not less than 920, so False. 60 tens + 60 ones is 600 + 60 = 660, and 6 hundreds + 6 tens is also 660 — True. 80 + 4 + 700 is 784, and 7 hundreds + 4 tens + 8 ones is 748. 784 IS greater than 748 — True." },

  { id:"C09", type:"grid",
    q:"Does each number round to 76,000 when rounded to the nearest thousand?",
    cols:["Yes","No"],
    rows:[
      { text:"75,903", answer:"Yes" },
      { text:"76,274", answer:"Yes" },
      { text:"76,613", answer:"No"  }
    ],
    explanation:"75,903 has 9 hundreds, so it rounds UP to 76,000 — Yes. 76,274 has 2 hundreds, so it rounds down to 76,000 — Yes. 76,613 has 6 hundreds, so it rounds up to 77,000 — No." },

  { id:"C10", type:"symbol",
    q:"400 + 80 + 2,000 + 1 &#9723; 1 thousand + 14 hundreds + 1 one + 8 tens",
    explanation:"The left side is 2,481. On the right, 14 hundreds is a regrouped way of writing 1,400: 1,000 + 1,400 + 1 + 80 = 2,481. The two sides are equal, so the answer is =.",
    answer:"=" },

  { id:"C11",
    q:"How do the numbers 520 and 5,200 compare?",
    choices:["5,200 is 1 time as large as 520","5,200 is 10 times as large as 520","5,200 is 100 times as large as 520","5,200 is 1,000 times as large as 520"],
    answer:"5,200 is 10 times as large as 520",
    explanation:"Every digit in 5,200 has shifted one place to the left compared with 520. Moving one place to the left makes a number 10 times as large." },

  { id:"C12", type:"entry",
    q:"Round 819,547 to the nearest ten thousand.",
    answer:"820,000",
    explanation:"The ten thousands digit is 1. Look at the thousands digit: 9. Since 9 is 5 or more, round the ten thousands up — 820,000." },

  { id:"C13",
    q:"Priya rounded 3,756 to the nearest thousand and got 4,000. Lucas rounded 3,756 to the nearest hundred and got 3,800. Both students are correct. Priya then says: \"A number rounded to the thousands place is ALWAYS greater than the same number rounded to the hundreds place.\" Which number shows that Priya is WRONG?",
    choices:["2,849","4,683","6,517","7,238"],
    answer:"7,238",
    explanation:"7,238 rounded to the nearest thousand is 7,000, but rounded to the nearest hundred it is 7,200. Here the thousands rounding is SMALLER, so Priya's rule is not always true. The other three numbers all round up to a greater thousand, so they support her claim instead of disproving it." },

  { id:"C14",
    q:"What is 300,000 + 8,000 + 90 + 4 written in standard form?",
    choices:["308,094","380,094","308,904","38,094"],
    answer:"308,094",
    explanation:"3 hundred thousands, 0 ten thousands, 8 thousands, 0 hundreds, 9 tens, 4 ones. Every empty place needs a zero to hold it: 308,094." },

  { id:"C15",
    q:"A city library loaned out 537,209 books in 2023, 519,843 books in 2024, and 562,014 books in 2025. Which list orders the numbers from GREATEST to LEAST?",
    choices:[
      "562,014   537,209   519,843",
      "519,843   537,209   562,014",
      "537,209   562,014   519,843",
      "562,014   519,843   537,209"
    ],
    answer:"562,014   537,209   519,843",
    explanation:"All three have 5 hundred thousands, so compare the ten thousands: 6 is greatest, so 562,014 comes first. Then compare 537,209 and 519,843 — 3 ten thousands is more than 1 ten thousand, so 537,209 comes next and 519,843 is least." }

];
