# Cognium scan summary

Manual review of Cognium results on diverse test projects (various concepts, techniques, and applications).


| Language         | Projects scanned | Notable result                                                                                        |
| ---------------- | ---------------- | ----------------------------------------------------------------------------------------------------- |
| **Rust** (Timon) | 1                | No findings                                                                                           |
| **Java**         | 158              | Many CWE hits; several categories dominated by false positives                                        |
| **JavaScript**   | 102              | 12 reviewed findings; mostly false positives; one item merits follow-up with different classification |


---

## Java: findings by CWE


| CWE                       | Count | Assessment                                                               |
| ------------------------- | ----- | ------------------------------------------------------------------------ |
| CWE-79 (XSS)              | 271   | Many false positives (e.g. prints to console/stdout, not HTML responses) |
| CWE-20 (input validation) | 142   | Many false positives and mislabeled issues                               |
| CWE-22 (path traversal)   | 97    | Many false positives (same pattern as above)                             |
| CWE-89 (SQL injection)    | 33/5  | **Real SQL injection issues**                                            |
| CWE-918 (SSRF)            | 13/13 | False positives; duplicate reports for one sink                          |
| CWE-502 (deserialization) | 5/5   | False positives; mostly JSON parsing, not Java native deserialization    |
| CWE-327 (weak crypto)     | 4/4   | Valid findings; duplicates                                               |
| CWE-90 (LDAP injection)   | 3/3   | False positives                                                          |
| CWE-330 (weak randomness) | 2/2   | Valid findings but not a practical security issue in context; duplicates |
| CWE-94 (code injection)   | 1/1   | False positive                                                           |


---

## JavaScript: reviewed findings


| Project / file                                       | Rule                  | Line(s)         | Verdict                                                                                                                                        |
| ---------------------------------------------------- | --------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 02-Simple Calculator / `index.js`                    | external_taint_escape | 15              | **False positive** — button text as calculator input; no sensitive sink                                                                        |
| 15-Interactive Quiz / `index.js`                     | code_injection        | 57              | **False positive** — `setTimeout(() => {...}, 1500)` with a function, not user-controlled code                                                 |
| 44-3D Cube Puzzle / `script.js`                      | external_taint_escape | 22              | **False positive** — `getComputedStyle(...).transform` is read-only UI state                                                                   |
| 54-Unit Converter / `script.js`                      | external_taint_escape | 6               | **False positive** — `isNaN` validation only                                                                                                   |
| 60-Clipboard Manager / `script.js`                   | external_taint_escape | 31              | **Likely false positive** — localStorage + `textContent` (XSS-safe); privacy is expected behavior                                              |
| 83-Contrast Checker / `app.js`                       | external_taint_escape | 55, 59          | **False positive** — `<input type="color">` values parsed only                                                                                 |
| 85-Color Blindness Simulator / `app.js`              | external_taint_escape | 52              | **False positive** — hex parsing for visualization                                                                                             |
| 93-Debouncing and Throttling Functions / `script.js` | code_injection        | 18 (duplicated) | **False positive** — `setTimeout` with closure/`func.apply`, not user code string; **duplicate alerts**                                        |
| 94-Caching Mechanism / `script.js`                   | external_taint_escape | 11              | **Likely false positive** — localStorage + `textContent`                                                                                       |
| 99-Tree Shaking for Unused Code / `script.js`        | external_taint_escape | 28              | **Misclassified** — user input to `Babel.transform(code, ...)` fits *untrusted code processing / possible DoS* better than CWE-20 taint-escape |


