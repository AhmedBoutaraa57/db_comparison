# Scan Validation Summary

## Classification

- Number of OpenSource Projects Scanned: **102**
- Total findings: **222**
- **Valid:** 35
- **Not valid (false positive / not actionable in this repo):** 187

## Rule-Level Validation

| Rule | Valid | Not valid |
|---|---:|---:|
| `code_injection` | 0 | 3 |
| `external_taint_escape` | 0 | 4 |
| `missing-await` | 1 | 15 |
| `variable-shadowing` | 0 | 75 |
| `leaked-global` | 4 | 0 |
| `sync-io-async` | 2 | 0 |
| `unused-variable` | 20 | 0 |
| `string-concat-loop` | 7 | 0 |
| `dependency-fan-out` | 1 | 0 |
| `orphan-module` | 0 | 69 |
| `missing-public-doc` | 0 | 21 |

## Notes Used For Validation

- `code_injection` and `external_taint_escape` findings in this dataset did not resolve to a real dangerous sink in reviewed files.
- Most `missing-await` findings are Promise chains already handled with `.then/.catch`; one case is valid:
  - `_javascript_/exercise-app/server.js` (`mongoose.connect(...)` call not awaited/caught in that file).
- `variable-shadowing` appears systematically noisy in this run (same-line/self-shadow style output).
- `orphan-module` is mostly not valid for this repo due to script-tag entrypoints and non-import-based loading.
- `missing-public-doc` is treated as non-actionable policy noise for this validation exercise.

## Validation Policy

- **Valid:** real correctness/perf/runtime issues observable from source.
- **Not valid:** scanner noise, policy-only warnings, or findings incompatible with repo architecture/loading model.

### Finding-by-Finding Rationale

#### Security findings (7)
- [24] `code_injection` (Critical) in `_javascript_/100-javascript-projects/15-Interactive Quiz/index.js:57` -> **not valid**: no dangerous sink observed in reviewed flow.
- [52] `external_taint_escape` (Medium) in `_javascript_/100-javascript-projects/44-3D Cube Puzzle/script.js:22` -> **not valid**: no dangerous sink observed in reviewed flow.
- [77] `external_taint_escape` (Medium) in `_javascript_/100-javascript-projects/54-Unit Converter/script.js:6` -> **not valid**: no dangerous sink observed in reviewed flow.
- [87] `external_taint_escape` (Medium) in `_javascript_/100-javascript-projects/60-Clipboard Manager/script.js:31` -> **not valid**: no dangerous sink observed in reviewed flow.
- [113] `code_injection` (Critical) in `_javascript_/100-javascript-projects/93-Debouncing and Throttling Functions/script.js:18` -> **not valid**: no dangerous sink observed in reviewed flow.
- [114] `code_injection` (Critical) in `_javascript_/100-javascript-projects/93-Debouncing and Throttling Functions/script.js:18` -> **not valid**: no dangerous sink observed in reviewed flow.
- [116] `external_taint_escape` (Medium) in `_javascript_/100-javascript-projects/94-Caching Mechanism/script.js:11` -> **not valid**: no dangerous sink observed in reviewed flow.

#### Code quality findings (215)
- [1] `orphan-module` (Low) in `_javascript_/100-javascript-projects/01-To-Do List App/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [2] `variable-shadowing` (Medium) in `_javascript_/100-javascript-projects/03-Digital Clock/index.js:38` -> **not valid**: pattern appears scanner-noisy in this run.
- [3] `variable-shadowing` (Medium) in `_javascript_/100-javascript-projects/03-Digital Clock/index.js:39` -> **not valid**: pattern appears scanner-noisy in this run.
- [4] `variable-shadowing` (Medium) in `_javascript_/100-javascript-projects/03-Digital Clock/index.js:40` -> **not valid**: pattern appears scanner-noisy in this run.
- [5] `variable-shadowing` (Medium) in `_javascript_/100-javascript-projects/03-Digital Clock/index.js:41` -> **not valid**: pattern appears scanner-noisy in this run.
- [6] `variable-shadowing` (Medium) in `_javascript_/100-javascript-projects/03-Digital Clock/index.js:42` -> **not valid**: pattern appears scanner-noisy in this run.
- [7] `leaked-global` (Medium) in `_javascript_/100-javascript-projects/03-Digital Clock/index.js:66` -> **valid**: implicit global assignment without declaration.
- [8] `leaked-global` (Medium) in `_javascript_/100-javascript-projects/03-Digital Clock/index.js:74` -> **valid**: implicit global assignment without declaration.
- [9] `unused-variable` (Low) in `_javascript_/100-javascript-projects/03-Digital Clock/index.js:89` -> **valid**: assigned symbol not read (dead code).
- [10] `unused-variable` (Low) in `_javascript_/100-javascript-projects/08-Countdown Timer/script.js:2` -> **valid**: assigned symbol not read (dead code).
- [11] `orphan-module` (Low) in `_javascript_/100-javascript-projects/08-Countdown Timer/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [12] `orphan-module` (Low) in `_javascript_/100-javascript-projects/09-BMI Calculator/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [13] `missing-await` (Medium) in `_javascript_/100-javascript-projects/10-Currency Converter/index.js:6` -> **not valid**: Promise chain already handled with then/catch.
- [14] `missing-await` (Medium) in `_javascript_/100-javascript-projects/10-Currency Converter/index.js:39` -> **not valid**: Promise chain already handled with then/catch.
- [15] `orphan-module` (Low) in `_javascript_/100-javascript-projects/100-Code Splitting/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [16] `missing-await` (Medium) in `_javascript_/100-javascript-projects/11-Weather App/index.js:14` -> **not valid**: Promise chain already handled with then/catch.
- [17] `variable-shadowing` (Medium) in `_javascript_/100-javascript-projects/12-Expense Tracker/index.js:85` -> **not valid**: pattern appears scanner-noisy in this run.
- [18] `variable-shadowing` (Medium) in `_javascript_/100-javascript-projects/12-Expense Tracker/index.js:87` -> **not valid**: pattern appears scanner-noisy in this run.
- [19] `variable-shadowing` (Medium) in `_javascript_/100-javascript-projects/12-Expense Tracker/index.js:88` -> **not valid**: pattern appears scanner-noisy in this run.
- [20] `variable-shadowing` (Medium) in `_javascript_/100-javascript-projects/12-Expense Tracker/index.js:89` -> **not valid**: pattern appears scanner-noisy in this run.
- [21] `variable-shadowing` (Medium) in `_javascript_/100-javascript-projects/12-Expense Tracker/index.js:96` -> **not valid**: pattern appears scanner-noisy in this run.
- [22] `unused-variable` (Low) in `_javascript_/100-javascript-projects/12-Expense Tracker/index.js:3` -> **valid**: assigned symbol not read (dead code).
- [23] `unused-variable` (Low) in `_javascript_/100-javascript-projects/14-Chat Application/index.js:4` -> **valid**: assigned symbol not read (dead code).
- [25] `unused-variable` (Low) in `_javascript_/100-javascript-projects/16-Pomodoro Timer/index.js:1` -> **valid**: assigned symbol not read (dead code).
- [26] `unused-variable` (Low) in `_javascript_/100-javascript-projects/16-Pomodoro Timer/index.js:2` -> **valid**: assigned symbol not read (dead code).
- [27] `unused-variable` (Low) in `_javascript_/100-javascript-projects/16-Pomodoro Timer/index.js:3` -> **valid**: assigned symbol not read (dead code).
- [28] `orphan-module` (Low) in `_javascript_/100-javascript-projects/19-Car Rental Website/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [29] `orphan-module` (Low) in `_javascript_/100-javascript-projects/20-Blogging Platform/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [30] `orphan-module` (Low) in `_javascript_/100-javascript-projects/21-Social Media Dashboard/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [31] `orphan-module` (Low) in `_javascript_/100-javascript-projects/22-E-commerce Website/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [32] `orphan-module` (Low) in `_javascript_/100-javascript-projects/23-Real-time Chat Room/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [33] `unused-variable` (Low) in `_javascript_/100-javascript-projects/24-Photo Editing Tool/script.js:5` -> **valid**: assigned symbol not read (dead code).
- [34] `orphan-module` (Low) in `_javascript_/100-javascript-projects/24-Photo Editing Tool/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [35] `orphan-module` (Low) in `_javascript_/100-javascript-projects/25-Cryptocurrency Tracker/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [36] `orphan-module` (Low) in `_javascript_/100-javascript-projects/26-Fitness Tracker/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [37] `orphan-module` (Low) in `_javascript_/100-javascript-projects/27-Job Board Platform/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [38] `orphan-module` (Low) in `_javascript_/100-javascript-projects/28-AI-powered Recommendation System/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [39] `variable-shadowing` (Medium) in `_javascript_/100-javascript-projects/34-GitHub Profile Viewer/app.js:47` -> **not valid**: pattern appears scanner-noisy in this run.
- [40] `variable-shadowing` (Medium) in `_javascript_/100-javascript-projects/34-GitHub Profile Viewer/app.js:60` -> **not valid**: pattern appears scanner-noisy in this run.
- [41] `variable-shadowing` (Medium) in `_javascript_/100-javascript-projects/34-GitHub Profile Viewer/app.js:63` -> **not valid**: pattern appears scanner-noisy in this run.
- [42] `missing-await` (Medium) in `_javascript_/100-javascript-projects/35-Weather Forecast using OpenWeatherMap API/app.js:9` -> **not valid**: Promise chain already handled with then/catch.
- [43] `missing-await` (Medium) in `_javascript_/100-javascript-projects/36-News Aggregator/index.js:6` -> **not valid**: Promise chain already handled with then/catch.
- [44] `missing-await` (Medium) in `_javascript_/100-javascript-projects/39-Random Joke Generator using Joke API/script.js:12` -> **not valid**: Promise chain already handled with then/catch.
- [45] `unused-variable` (Low) in `_javascript_/100-javascript-projects/39-Random Joke Generator using Joke API/script.js:2` -> **valid**: assigned symbol not read (dead code).
- [46] `orphan-module` (Low) in `_javascript_/100-javascript-projects/39-Random Joke Generator using Joke API/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [47] `missing-await` (Medium) in `_javascript_/100-javascript-projects/40-Recipe Finder using Food API/script.js:20` -> **not valid**: Promise chain already handled with then/catch.
- [48] `orphan-module` (Low) in `_javascript_/100-javascript-projects/40-Recipe Finder using Food API/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [49] `orphan-module` (Low) in `_javascript_/100-javascript-projects/41-Drawing App/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [50] `orphan-module` (Low) in `_javascript_/100-javascript-projects/42-Virtual Piano/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [51] `orphan-module` (Low) in `_javascript_/100-javascript-projects/43-Interactive Storytelling/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [53] `orphan-module` (Low) in `_javascript_/100-javascript-projects/44-3D Cube Puzzle/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [54] `orphan-module` (Low) in `_javascript_/100-javascript-projects/45-Text-based Adventure Game/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [55] `missing-await` (Medium) in `_javascript_/100-javascript-projects/46-Music Visualizer/script.js:33` -> **not valid**: Promise chain already handled with then/catch.
- [56] `missing-await` (Medium) in `_javascript_/100-javascript-projects/46-Music Visualizer/script.js:34` -> **not valid**: Promise chain already handled with then/catch.
- [57] `orphan-module` (Low) in `_javascript_/100-javascript-projects/46-Music Visualizer/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [58] `orphan-module` (Low) in `_javascript_/100-javascript-projects/47-Meme Generator/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [59] `orphan-module` (Low) in `_javascript_/100-javascript-projects/48-Virtual Pet/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [60] `leaked-global` (Medium) in `_javascript_/100-javascript-projects/49-Color Palette Generator/script.js:45` -> **valid**: implicit global assignment without declaration.
- [61] `orphan-module` (Low) in `_javascript_/100-javascript-projects/49-Color Palette Generator/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [62] `orphan-module` (Low) in `_javascript_/100-javascript-projects/50-Emoji Translator/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [63] `orphan-module` (Low) in `_javascript_/100-javascript-projects/51-File Uploader/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [64] `string-concat-loop` (Low) in `_javascript_/100-javascript-projects/52-Password Generator/script.js:32` -> **valid**: real low-priority performance smell.
- [65] `orphan-module` (Low) in `_javascript_/100-javascript-projects/52-Password Generator/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [66] `string-concat-loop` (Low) in `_javascript_/100-javascript-projects/53-QR Code Generator/qrcode.min.js:278` -> **valid**: real low-priority performance smell.
- [67] `string-concat-loop` (Low) in `_javascript_/100-javascript-projects/53-QR Code Generator/qrcode.min.js:298` -> **valid**: real low-priority performance smell.
- [68] `string-concat-loop` (Low) in `_javascript_/100-javascript-projects/53-QR Code Generator/qrcode.min.js:338` -> **valid**: real low-priority performance smell.
- [69] `string-concat-loop` (Low) in `_javascript_/100-javascript-projects/53-QR Code Generator/qrcode.min.js:348` -> **valid**: real low-priority performance smell.
- [70] `variable-shadowing` (Medium) in `_javascript_/100-javascript-projects/53-QR Code Generator/qrcode.min.js:889` -> **not valid**: pattern appears scanner-noisy in this run.
- [71] `variable-shadowing` (Medium) in `_javascript_/100-javascript-projects/53-QR Code Generator/qrcode.min.js:957` -> **not valid**: pattern appears scanner-noisy in this run.
- [72] `variable-shadowing` (Medium) in `_javascript_/100-javascript-projects/53-QR Code Generator/qrcode.min.js:963` -> **not valid**: pattern appears scanner-noisy in this run.
- [73] `leaked-global` (Medium) in `_javascript_/100-javascript-projects/53-QR Code Generator/qrcode.min.js:968` -> **valid**: implicit global assignment without declaration.
- [74] `orphan-module` (Low) in `_javascript_/100-javascript-projects/53-QR Code Generator/qrcode.min.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [75] `unused-variable` (Low) in `_javascript_/100-javascript-projects/53-QR Code Generator/script.js:12` -> **valid**: assigned symbol not read (dead code).
- [76] `orphan-module` (Low) in `_javascript_/100-javascript-projects/53-QR Code Generator/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [78] `orphan-module` (Low) in `_javascript_/100-javascript-projects/54-Unit Converter/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [79] `orphan-module` (Low) in `_javascript_/100-javascript-projects/55-Markdown Editor/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [80] `unused-variable` (Low) in `_javascript_/100-javascript-projects/56-Voice Assistant/script.js:1` -> **valid**: assigned symbol not read (dead code).
- [81] `orphan-module` (Low) in `_javascript_/100-javascript-projects/56-Voice Assistant/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [82] `orphan-module` (Low) in `_javascript_/100-javascript-projects/57-Note-taking App/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [83] `orphan-module` (Low) in `_javascript_/100-javascript-projects/58-Browser Extension/popup/content.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [84] `orphan-module` (Low) in `_javascript_/100-javascript-projects/58-Browser Extension/popup/popup.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [85] `string-concat-loop` (Low) in `_javascript_/100-javascript-projects/59-Calendar/script.js:45` -> **valid**: real low-priority performance smell.
- [86] `orphan-module` (Low) in `_javascript_/100-javascript-projects/59-Calendar/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [88] `orphan-module` (Low) in `_javascript_/100-javascript-projects/60-Clipboard Manager/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [89] `orphan-module` (Low) in `_javascript_/100-javascript-projects/62-Heatmap Generator/heatmap.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [90] `unused-variable` (Low) in `_javascript_/100-javascript-projects/63-Dashboard with Graphs and Metrics/dashboard.js:64` -> **valid**: assigned symbol not read (dead code).
- [91] `unused-variable` (Low) in `_javascript_/100-javascript-projects/63-Dashboard with Graphs and Metrics/dashboard.js:67` -> **valid**: assigned symbol not read (dead code).
- [92] `orphan-module` (Low) in `_javascript_/100-javascript-projects/63-Dashboard with Graphs and Metrics/dashboard.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [93] `string-concat-loop` (Low) in `_javascript_/100-javascript-projects/64-Geographical Data Visualization/app.js:33` -> **valid**: real low-priority performance smell.
- [94] `unused-variable` (Low) in `_javascript_/100-javascript-projects/65-Network Traffic Analyzer/app.js:56` -> **valid**: assigned symbol not read (dead code).
- [95] `unused-variable` (Low) in `_javascript_/100-javascript-projects/72-Snake Game/script.js:2` -> **valid**: assigned symbol not read (dead code).
- [96] `orphan-module` (Low) in `_javascript_/100-javascript-projects/72-Snake Game/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [97] `unused-variable` (Low) in `_javascript_/100-javascript-projects/75-Chess Game/script.js:2` -> **valid**: assigned symbol not read (dead code).
- [98] `orphan-module` (Low) in `_javascript_/100-javascript-projects/75-Chess Game/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [99] `orphan-module` (Low) in `_javascript_/100-javascript-projects/76-Hangman/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [100] `orphan-module` (Low) in `_javascript_/100-javascript-projects/77-Memory Puzzle Game/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [101] `orphan-module` (Low) in `_javascript_/100-javascript-projects/78-Battleship/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [102] `orphan-module` (Low) in `_javascript_/100-javascript-projects/79-Crossword Puzzle/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [103] `unused-variable` (Low) in `_javascript_/100-javascript-projects/80-Platformer Game/script.js:4` -> **valid**: assigned symbol not read (dead code).
- [104] `orphan-module` (Low) in `_javascript_/100-javascript-projects/80-Platformer Game/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [105] `variable-shadowing` (Medium) in `_javascript_/100-javascript-projects/83-Contrast Checker/app.js:9` -> **not valid**: pattern appears scanner-noisy in this run.
- [106] `orphan-module` (Low) in `_javascript_/100-javascript-projects/86-Speech Recognition Interface/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [107] `orphan-module` (Low) in `_javascript_/100-javascript-projects/87-Focus Management/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [108] `orphan-module` (Low) in `_javascript_/100-javascript-projects/88-High-Contrast Mode/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [109] `orphan-module` (Low) in `_javascript_/100-javascript-projects/89-Aria Role Implementation/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [110] `orphan-module` (Low) in `_javascript_/100-javascript-projects/90-Responsive Design for Accessibility/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [111] `orphan-module` (Low) in `_javascript_/100-javascript-projects/91-Code Profiler and Optimizer/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [112] `orphan-module` (Low) in `_javascript_/100-javascript-projects/92-Lazy Loading Images/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [115] `orphan-module` (Low) in `_javascript_/100-javascript-projects/93-Debouncing and Throttling Functions/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [117] `orphan-module` (Low) in `_javascript_/100-javascript-projects/94-Caching Mechanism/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [118] `orphan-module` (Low) in `_javascript_/100-javascript-projects/95-Reducing DOM Manipulations/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [119] `unused-variable` (Low) in `_javascript_/100-javascript-projects/96-Memory Leak Detection/script.js:8` -> **valid**: assigned symbol not read (dead code).
- [120] `unused-variable` (Low) in `_javascript_/100-javascript-projects/96-Memory Leak Detection/script.js:1` -> **valid**: assigned symbol not read (dead code).
- [121] `unused-variable` (Low) in `_javascript_/100-javascript-projects/96-Memory Leak Detection/script.js:2` -> **valid**: assigned symbol not read (dead code).
- [122] `orphan-module` (Low) in `_javascript_/100-javascript-projects/96-Memory Leak Detection/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [123] `missing-await` (Medium) in `_javascript_/100-javascript-projects/97-Network Performance Analyzer/script.js:9` -> **not valid**: Promise chain already handled with then/catch.
- [124] `orphan-module` (Low) in `_javascript_/100-javascript-projects/97-Network Performance Analyzer/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [125] `orphan-module` (Low) in `_javascript_/100-javascript-projects/98-Minification and Bundling/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [126] `orphan-module` (Low) in `_javascript_/100-javascript-projects/99-Tree Shaking for Unused Code/script.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [127] `orphan-module` (Low) in `_javascript_/Blog-App-using-MERN-stack/client/src/App.test.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [128] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/AddBlogs.js:12` -> **not valid**: pattern appears scanner-noisy in this run.
- [129] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/AddBlogs.js:13` -> **not valid**: pattern appears scanner-noisy in this run.
- [130] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/AddBlogs.js:19` -> **not valid**: pattern appears scanner-noisy in this run.
- [131] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/AddBlogs.js:25` -> **not valid**: pattern appears scanner-noisy in this run.
- [132] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/AddBlogs.js:26` -> **not valid**: pattern appears scanner-noisy in this run.
- [133] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/AddBlogs.js:37` -> **not valid**: pattern appears scanner-noisy in this run.
- [134] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/AddBlogs.js:34` -> **not valid**: pattern appears scanner-noisy in this run.
- [135] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Blog.js:19` -> **not valid**: pattern appears scanner-noisy in this run.
- [136] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Blog.js:20` -> **not valid**: pattern appears scanner-noisy in this run.
- [137] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Blog.js:21` -> **not valid**: pattern appears scanner-noisy in this run.
- [138] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Blog.js:24` -> **not valid**: pattern appears scanner-noisy in this run.
- [139] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Blog.js:25` -> **not valid**: pattern appears scanner-noisy in this run.
- [140] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Blog.js:28` -> **not valid**: pattern appears scanner-noisy in this run.
- [141] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Blog.js:31` -> **not valid**: pattern appears scanner-noisy in this run.
- [142] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/BlogDetail.js:11` -> **not valid**: pattern appears scanner-noisy in this run.
- [143] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/BlogDetail.js:17` -> **not valid**: pattern appears scanner-noisy in this run.
- [144] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/BlogDetail.js:25` -> **not valid**: pattern appears scanner-noisy in this run.
- [145] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/BlogDetail.js:27` -> **not valid**: pattern appears scanner-noisy in this run.
- [146] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/BlogDetail.js:43` -> **not valid**: pattern appears scanner-noisy in this run.
- [147] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/BlogDetail.js:55` -> **not valid**: pattern appears scanner-noisy in this run.
- [148] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/BlogDetail.js:45` -> **not valid**: pattern appears scanner-noisy in this run.
- [149] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Blogs.js:8` -> **not valid**: pattern appears scanner-noisy in this run.
- [150] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Blogs.js:9` -> **not valid**: pattern appears scanner-noisy in this run.
- [151] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Blogs.js:12` -> **not valid**: pattern appears scanner-noisy in this run.
- [152] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/DeleteBlogs.js:6` -> **not valid**: pattern appears scanner-noisy in this run.
- [153] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Header.js:19` -> **not valid**: pattern appears scanner-noisy in this run.
- [154] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Header.js:20` -> **not valid**: pattern appears scanner-noisy in this run.
- [155] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Header.js:21` -> **not valid**: pattern appears scanner-noisy in this run.
- [156] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Header.js:23` -> **not valid**: pattern appears scanner-noisy in this run.
- [157] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Header.js:26` -> **not valid**: pattern appears scanner-noisy in this run.
- [158] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Header.js:27` -> **not valid**: pattern appears scanner-noisy in this run.
- [159] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Header.js:52` -> **not valid**: pattern appears scanner-noisy in this run.
- [160] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Header.js:57` -> **not valid**: pattern appears scanner-noisy in this run.
- [161] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Header.js:58` -> **not valid**: pattern appears scanner-noisy in this run.
- [162] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Header.js:63` -> **not valid**: pattern appears scanner-noisy in this run.
- [163] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Header.js:67` -> **not valid**: pattern appears scanner-noisy in this run.
- [164] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Header.js:30` -> **not valid**: pattern appears scanner-noisy in this run.
- [165] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Header.js:31` -> **not valid**: pattern appears scanner-noisy in this run.
- [166] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Header.js:40` -> **not valid**: pattern appears scanner-noisy in this run.
- [167] `dependency-fan-out` (Low) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Header.js:1` -> **valid**: high coupling signal is real for module.
- [168] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Login.js:10` -> **not valid**: pattern appears scanner-noisy in this run.
- [169] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Login.js:11` -> **not valid**: pattern appears scanner-noisy in this run.
- [170] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Login.js:12` -> **not valid**: pattern appears scanner-noisy in this run.
- [171] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Login.js:21` -> **not valid**: pattern appears scanner-noisy in this run.
- [172] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Login.js:30` -> **not valid**: pattern appears scanner-noisy in this run.
- [173] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Login.js:33` -> **not valid**: pattern appears scanner-noisy in this run.
- [174] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Login.js:47` -> **not valid**: pattern appears scanner-noisy in this run.
- [175] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/Login.js:41` -> **not valid**: pattern appears scanner-noisy in this run.
- [176] `orphan-module` (Low) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/UpdateBlog.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [177] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/UserBlogs.js:52` -> **not valid**: pattern appears scanner-noisy in this run.
- [178] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/UserBlogs.js:54` -> **not valid**: pattern appears scanner-noisy in this run.
- [179] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/UserBlogs.js:56` -> **not valid**: pattern appears scanner-noisy in this run.
- [180] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/UserBlogs.js:57` -> **not valid**: pattern appears scanner-noisy in this run.
- [181] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/UserBlogs.js:68` -> **not valid**: pattern appears scanner-noisy in this run.
- [182] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/client/src/componets/UserBlogs.js:60` -> **not valid**: pattern appears scanner-noisy in this run.
- [183] `orphan-module` (Low) in `_javascript_/Blog-App-using-MERN-stack/client/src/reportWebVitals.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [184] `orphan-module` (Low) in `_javascript_/Blog-App-using-MERN-stack/client/src/setupTests.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [185] `missing-await` (Medium) in `_javascript_/Blog-App-using-MERN-stack/server/config/db.js:8` -> **not valid**: Promise chain already handled with then/catch.
- [186] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/server/controller/blog-controller.js:21` -> **not valid**: pattern appears scanner-noisy in this run.
- [187] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/server/controller/blog-controller.js:45` -> **not valid**: pattern appears scanner-noisy in this run.
- [188] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/server/controller/blog-controller.js:60` -> **not valid**: pattern appears scanner-noisy in this run.
- [189] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/server/controller/blog-controller.js:73` -> **not valid**: pattern appears scanner-noisy in this run.
- [190] `variable-shadowing` (Medium) in `_javascript_/Blog-App-using-MERN-stack/server/controller/blog-controller.js:91` -> **not valid**: pattern appears scanner-noisy in this run.
- [191] `sync-io-async` (Medium) in `_javascript_/Blog-App-using-MERN-stack/server/controller/user-contoller.js:28` -> **valid**: sync crypto in async path blocks event loop.
- [192] `sync-io-async` (Medium) in `_javascript_/Blog-App-using-MERN-stack/server/controller/user-contoller.js:53` -> **valid**: sync crypto in async path blocks event loop.
- [193] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/create_ExerciseName.js:15` -> **not valid**: policy warning, non-actionable for validation.
- [194] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/create_ExerciseName.js:17` -> **not valid**: policy warning, non-actionable for validation.
- [195] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/create_ExerciseName.js:27` -> **not valid**: policy warning, non-actionable for validation.
- [196] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/create_ExerciseName.js:82` -> **not valid**: policy warning, non-actionable for validation.
- [197] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/create_ExerciseName.js:86` -> **not valid**: policy warning, non-actionable for validation.
- [198] `orphan-module` (Low) in `_javascript_/exercise-app/client/src/components/create_ExerciseName.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [199] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/create_exercise.js:8` -> **not valid**: policy warning, non-actionable for validation.
- [200] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/create_exercise.js:10` -> **not valid**: policy warning, non-actionable for validation.
- [201] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/create_exercise.js:22` -> **not valid**: policy warning, non-actionable for validation.
- [202] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/create_exercise.js:67` -> **not valid**: policy warning, non-actionable for validation.
- [203] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/create_exercise.js:71` -> **not valid**: policy warning, non-actionable for validation.
- [204] `orphan-module` (Low) in `_javascript_/exercise-app/client/src/components/create_exercise.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [205] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/edit_exercises.js:8` -> **not valid**: policy warning, non-actionable for validation.
- [206] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/edit_exercises.js:9` -> **not valid**: policy warning, non-actionable for validation.
- [207] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/edit_exercises.js:20` -> **not valid**: policy warning, non-actionable for validation.
- [208] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/edit_exercises.js:60` -> **not valid**: policy warning, non-actionable for validation.
- [209] `orphan-module` (Low) in `_javascript_/exercise-app/client/src/components/edit_exercises.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [210] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/exercises_list.js:32` -> **not valid**: policy warning, non-actionable for validation.
- [211] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/exercises_list.js:34` -> **not valid**: policy warning, non-actionable for validation.
- [212] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/exercises_list.js:44` -> **not valid**: policy warning, non-actionable for validation.
- [213] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/exercises_list.js:88` -> **not valid**: policy warning, non-actionable for validation.
- [214] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/exercises_list.js:92` -> **not valid**: policy warning, non-actionable for validation.
- [215] `orphan-module` (Low) in `_javascript_/exercise-app/client/src/components/exercises_list.js:1` -> **not valid**: import-graph miss for script-tag/tool entrypoints.
- [216] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/navbar.js:6` -> **not valid**: policy warning, non-actionable for validation.
- [217] `missing-public-doc` (Low) in `_javascript_/exercise-app/client/src/components/navbar.js:8` -> **not valid**: policy warning, non-actionable for validation.
- [218] `missing-await` (Medium) in `_javascript_/exercise-app/routes/exercises.js:31` -> **not valid**: Promise chain already handled with then/catch.
- [219] `missing-await` (Medium) in `_javascript_/exercise-app/routes/exercises.js:37` -> **not valid**: Promise chain already handled with then/catch.
- [220] `missing-await` (Medium) in `_javascript_/exercise-app/routes/exercises.js:53` -> **not valid**: Promise chain already handled with then/catch.
- [221] `missing-await` (Medium) in `_javascript_/exercise-app/routes/exercisesName.js:21` -> **not valid**: Promise chain already handled with then/catch.
- [222] `missing-await` (Medium) in `_javascript_/exercise-app/server.js:13` -> **valid**: connect Promise not awaited/caught in file.

