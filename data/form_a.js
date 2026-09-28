/* ═══════════════════════════════════════════════════════
   SBAC FIAB REVIEW · Place Value & Multidigit Whole Numbers
   FORM A — 15 items
   Item designs replicate the CT FIAB blueprint (4.NBT.1–3):
   representation translation, out-of-order place-value terms,
   non-standard regrouping, rounding across three place levels,
   and one disprove-the-claim counterexample item.
   All numbers are original — no secure test item is reproduced.
═══════════════════════════════════════════════════════ */
window.FORM_A = [

  { id:"A01", type:"grid",
    q:"Read each statement. Select True or False for each one.",
    cols:["True","False"],
    rows:[
      { text:"406 = 400 + 60",                                    answer:"False" },
      { text:"three thousand forty > 3 thousands + 4 ones",       answer:"True"  },
      { text:"eight hundred ninety-nine < one thousand",          answer:"True"  }
    ],
    explanation:"400 + 60 is 460, not 406 — 406 is 400 + 6, so the first one is False. Three thousand forty is 3,040 and 3 thousands + 4 ones is 3,004, so 3,040 is greater — True. 899 is less than 1,000 — True." },

  { id:"A02",
    q:"Round 47,382 to the nearest hundred.",
    choices:["47,000","47,300","47,400","48,000"],
    answer:"47,400",
    explanation:"The hundreds digit is 3. Look at the digit to its right: 8. Since 8 is 5 or more, round the hundreds up — 47,400." },

  { id:"A03",
    q:"58,&#9723;43 > 58,643 — What is the SMALLEST digit that makes this comparison true?",
    choices:["5","6","7","8"],
    answer:"7",
    explanation:"The thousands are the same, so compare the hundreds place. The missing digit must be greater than 6. The smallest digit greater than 6 is 7." },

  { id:"A04", type:"symbol",
    q:"8,061 &#9723; 6 hundreds + 1 one + 8 thousands",
    explanation:"Careful — the terms are out of order. 6 hundreds + 1 one + 8 thousands is 8,000 + 600 + 1 = 8,601. Since 8,061 is less than 8,601, the answer is <.",
    answer:"<" },

  { id:"A05",
    q:"The value of the digit 5 in 5,000 is how many times the value of the digit 5 in 500?",
    choices:["1 time as large","10 times as large","100 times as large","1,000 times as large"],
    answer:"10 times as large",
    explanation:"Each place is 10 times the place to its right. 5,000 is 5 thousands and 500 is 5 hundreds, so 5,000 is 10 times 500." },

  { id:"A06", type:"grid",
    q:"Does each number round to 45,000 when rounded to the nearest thousand?",
    cols:["Yes","No"],
    rows:[
      { text:"44,803", answer:"Yes" },
      { text:"45,209", answer:"Yes" },
      { text:"44,499", answer:"No"  }
    ],
    explanation:"44,803 has 8 hundreds, so it rounds UP to 45,000 — Yes. 45,209 has 2 hundreds, so it rounds DOWN to 45,000 — Yes. 44,499 has 4 hundreds, so it rounds down to 44,000 — No." },

  { id:"A07",
    q:"Round 72,614 to the nearest thousand.",
    choices:["70,000","72,000","72,600","73,000"],
    answer:"73,000",
    explanation:"The thousands digit is 2. Look at the hundreds digit: 6. Since 6 is 5 or more, round the thousands up — 73,000." },

  { id:"A08", type:"grid",
    q:"Read each statement. Select True or False for each one.",
    cols:["True","False"],
    rows:[
      { text:"540 < 40 + 500",                                        answer:"False" },
      { text:"30 tens + 30 ones = 3 hundreds + 3 tens",               answer:"True"  },
      { text:"50 + 9 + 800 > 8 hundreds + 9 tens + 5 ones",           answer:"False" }
    ],
    explanation:"40 + 500 is 540, so the two sides are EQUAL — 540 is not less than 540, so False. 30 tens + 30 ones is 300 + 30 = 330, and 3 hundreds + 3 tens is also 330 — True. 50 + 9 + 800 is 859, and 8 hundreds + 9 tens + 5 ones is 895. 859 is not greater than 895 — False." },

  { id:"A09", type:"grid",
    q:"Does each number round to 63,000 when rounded to the nearest thousand?",
    cols:["Yes","No"],
    rows:[
      { text:"62,715", answer:"Yes" },
      { text:"63,486", answer:"Yes" },
      { text:"63,502", answer:"No"  }
    ],
    explanation:"62,715 has 7 hundreds, so it rounds UP to 63,000 — Yes. 63,486 has 4 hundreds, so it rounds down to 63,000 — Yes. 63,502 has 5 hundreds, so it rounds up to 64,000 — No." },

  { id:"A10", type:"symbol",
    q:"200 + 70 + 4,000 + 3 &#9723; 3 thousands + 12 hundreds + 3 ones + 7 tens",
    explanation:"The left side is 4,273. On the right, 12 hundreds is a regrouped way of writing 1,200: 3,000 + 1,200 + 3 + 70 = 4,273. The two sides are equal, so the answer is =.",
    answer:"=" },

  { id:"A11",
    q:"How do the numbers 240 and 2,400 compare?",
    choices:["2,400 is 1 time as large as 240","2,400 is 10 times as large as 240","2,400 is 100 times as large as 240","2,400 is 1,000 times as large as 240"],
    answer:"2,400 is 10 times as large as 240",
    explanation:"Every digit in 2,400 has shifted one place to the left compared with 240. Moving one place to the left makes a number 10 times as large." },

  { id:"A12",
    q:"Round 528,461 to the nearest ten thousand.",
    choices:["500,000","520,000","528,000","530,000"],
    answer:"530,000",
    explanation:"The ten thousands digit is 2. Look at the thousands digit: 8. Since 8 is 5 or more, round the ten thousands up — 530,000." },

  { id:"A13",
    q:"Nora rounded 4,872 to the nearest thousand and got 5,000. Owen rounded 4,872 to the nearest hundred and got 4,900. Both students are correct. Nora then says: \"A number rounded to the thousands place is ALWAYS greater than the same number rounded to the hundreds place.\" Which number shows that Nora is WRONG?",
    choices:["1,682","1,925","3,214","5,845"],
    answer:"3,214",
    explanation:"3,214 rounded to the nearest thousand is 3,000, but rounded to the nearest hundred it is 3,200. Here the thousands rounding is SMALLER, so Nora's rule is not always true. The other three numbers all round up to a greater thousand, so they support her claim instead of disproving it." },

  { id:"A14",
    q:"What is 600,000 + 4,000 + 50 + 7 written in standard form?",
    choices:["604,057","640,057","604,507","64,057"],
    answer:"604,057",
    explanation:"6 hundred thousands, 0 ten thousands, 4 thousands, 0 hundreds, 5 tens, 7 ones. Every empty place needs a zero to hold it: 604,057." },

  { id:"A15",
    q:"A stadium sold 318,764 tickets in May, 309,215 tickets in June, and 331,480 tickets in July. Which list orders the numbers from GREATEST to LEAST?",
    choices:[
      "331,480   318,764   309,215",
      "309,215   318,764   331,480",
      "318,764   331,480   309,215",
      "331,480   309,215   318,764"
    ],
    answer:"331,480   318,764   309,215",
    explanation:"All three have 3 hundred thousands, so compare the ten thousands: 3 is greatest, so 331,480 comes first. Then compare 318,764 and 309,215 — 1 ten thousand is more than 0 ten thousands, so 318,764 comes next and 309,215 is least." }

];
