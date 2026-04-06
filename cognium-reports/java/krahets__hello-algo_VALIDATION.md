# hello-algo (Java) Scan Validation Summary

Source report: `krahets__hello-algo.json`

## Scan Metadata

- **Scanner:** `cognium` (static analysis only)
- **Validation model:** `gpt-5.4`
- **Repository:** [krahets/hello-algo](https://github.com/krahets/hello-algo)

## Final Classification

- Files scanned (report): **0**
- Total findings: **8500**
- **Security-related findings (by rule):** **0**
- **Code quality / reliability / architecture findings (by rule):** **8500**
- **Valid (actionable or objectively correct signal):** **934**
- **Not valid (false positive, wrong language model, or scanner noise for this corpus):** **7566**

## Rule-Level Validation

| Rule | Total | Valid | Not Valid | Verdict |
| --- | ---: | ---: | ---: | --- |
| `missing-public-doc` | 3397 | 0 | 3397 | not_valid |
| `orphan-module` | 2059 | 137 | 1922 | not_valid |
| `infinite-loop` | 1055 | 0 | 1055 | not_valid |
| `naming-convention` | 635 | 593 | 42 | mixed |
| `unbounded-collection` | 265 | 0 | 265 | not_valid |
| `redundant-loop-computation` | 200 | 0 | 200 | not_valid |
| `unhandled-exception` | 176 | 0 | 176 | not_valid |
| `leaked-global` | 160 | 0 | 160 | not_valid |
| `unused-variable` | 159 | 148 | 11 | mixed |
| `xss` | 110 | 0 | 110 | not_valid |
| `variable-shadowing` | 101 | 34 | 67 | mixed |
| `string-concat-loop` | 100 | 7 | 93 | mixed |
| `excessive-allocation` | 55 | 15 | 40 | mixed |
| `missing-await` | 13 | 0 | 13 | not_valid |
| `information_exposure` | 10 | 0 | 10 | not_valid |
| `prototype_pollution` | 5 | 0 | 5 | not_valid |

## Notes

### `missing-public-doc` (3397 × )

These Java examples already use explanatory comments, but the rule specifically demands Javadoc-style /** ... */ comments on public APIs and even flags non-public types, which indicates the scanner is applying an overly rigid documentation convention rather than identifying a real defect. In this educational codebase, missing Javadoc on sample classes, main methods, and package-private helper classes is a style preference, not a correctness or framework requirement, so extrapolating these findings as actionable issues would be noise.

### `orphan-module` (2059 × )

This repository is an educational Java code collection where many files are standalone chapter examples rather than application modules intended to be imported by other code. The scanner is misclassifying these example classes as dead code simply because they lack incoming imports; in Java, classes may also be executed directly via a main method or kept as self-contained reference implementations. Only the file that appears to define a helper class in a mismatched filename/package pattern without a public top-level class is plausibly an actual orphan, while the rest are normal tutorial artifacts.

### `infinite-loop` (1055 × )

These findings are false positives caused by a simplistic rule that expects an explicit break/return/throw inside loop bodies, but in Java bounded for/while loops normally terminate via their loop condition and update expression. The reviewed code uses standard counted loops and finite backtracking iterations with clear progress variables (i++, j++, col++, row recursion toward a base case), so the suggested remediation does not apply. Given the consistency of the pattern across these samples, the rule appears broadly noisy for this Java educational codebase.

### `naming-convention` (635 × )

Most findings are valid because these Java source files declare public classes with lowercase or snake_case names, which violates standard Java naming conventions requiring PascalCase class names. However, the constructor finding is a false positive: in Java constructors must match the class name exactly and are not camelCase methods, so renaming `MyList()` as if it were a regular method would be incorrect. Given the sampled files, this rule is generally useful for this codebase but includes some Java-language misunderstanding around constructors.

### `unbounded-collection` (265 × )

These findings are false positives in this Java educational codebase because the reported collection growth occurs in bounded loops driven by explicit limits such as constants, array lengths, graph size, or the input parameter n. The rule is overfitting on any add/put/push inside a loop and ignoring that these are normal finite data-structure construction patterns, often intentionally demonstrating algorithmic space usage. The suggested remediation to add arbitrary MAX checks or periodic clears would be incorrect and would break the examples' intended behavior.

### `redundant-loop-computation` (200 × )

These findings are false positives for Java. Array length is a field access and List.size() on standard JDK collections is O(1); HotSpot/JIT routinely hoists such loop-invariant expressions, so manually caching them is not a meaningful or generally applicable remediation. Several findings also misclassify non-loop expressions like state.remove(state.size() - 1), where size() is evaluated once per call rather than redundantly across loop iterations.

### `unhandled-exception` (176 × )

These findings are false positives caused by applying an 'unhandled exception' rule to intentional argument-validation code and even to non-Java files in a Java repository. In JavaScript and Python, explicitly throwing/raising on invalid input is idiomatic and does not need to be wrapped in try/catch at the throw site; the suggested remediation is especially wrong for Python and partly wrong for JavaScript ('document in function signature'). The sample also includes a test runner that intentionally throws to fail the process, which is expected behavior rather than a reliability defect.

### `leaked-global` (160 × )

These findings are all from JavaScript example files in a repository otherwise labeled Java, and in every case the flagged identifier is already declared as a function parameter or within the same `let`/`const` declaration list. Reassigning a parameter or a previously declared local variable does not create an accidental global in JavaScript, so the scanner is misreading normal local-variable usage and comma-separated declarations.

### `unused-variable` (159 × )

Most reviewed findings are true positives in the Java code: these examples intentionally create variables or accumulate values for demonstration, but the variables are never subsequently read, so the rule correctly reports unused locals/assignments. However, one reviewed finding is from a JavaScript file even though this repository review is scoped to Java, so that finding is not valid for this language-specific validation; extrapolating from the sample, the rule is generally valid for the Java portion but the overall result is mixed due to cross-language noise.

### `xss` (110 × )

These findings are false positives because the codebase consists of standalone Java console/demo programs that print algorithm results to standard output, not web applications rendering HTML/JavaScript to a browser. CWE-79 XSS requires a web response context with untrusted data embedded in page content; simple System.out.println calls on local variables, collections, and hardcoded sample data are not XSS sinks in Java. The scanner appears to be over-tainting ordinary data flow into console output and misclassifying generic printing as browser-side script injection.

### `variable-shadowing` (101 × )

Most reviewed findings are false positives caused by the scanner treating ordinary reassignment or same-scope mutation as shadowing, especially in Java and JavaScript where the flagged lines do not introduce new variables. However, several Rust examples do use intentional `let` rebinding that truly shadows an earlier binding or parameter, so the rule does match real shadowing in that part of the repository. Given the mixed sample, the full rule output is likely a blend of genuine Rust shadowing and substantial noise from non-Rust files.

### `string-concat-loop` (100 × )

Most findings are false positives because the scanner is matching numeric '+=' accumulation as if it were string concatenation, and several findings are in JavaScript/TypeScript files despite this repository review being for Java. The only reviewed true positive is the JavaScript nested loop that appends to a growing string with '+=' on each iteration, which does match the rule semantics, though the Java-specific remediation text is not fully applicable there. Based on this sample, the rule appears noisy for this codebase and should not be broadly trusted without type-aware filtering.

### `excessive-allocation` (55 × )

Most findings are false positives because the reported allocations are intentional construction of distinct nested collections or one-off formatting in small educational/demo code; reusing a single collection outside the loop would change semantics or provide no meaningful benefit. A smaller subset is valid where the code repeatedly allocates temporary lists purely for display/serialization inside loops, which could be avoided or replaced with direct printing/stream mapping if performance mattered. Based on this sample, the rule is noisy for this Java codebase and should not be broadly trusted without manual review. Extrapolating from the sample, only a minority of the 55 findings are likely true positives.

### `missing-await` (13 × )

These findings are false positives caused by misclassifying ordinary synchronous JavaScript/TypeScript functions as Promise-returning APIs. In every sample, the called function is defined locally and returns a plain value (`number` or node reference), with TypeScript annotations explicitly confirming non-Promise return types in the `.ts` files. The suggested remediation to add `await` is incorrect for this codebase and would not apply to these synchronous educational examples.

### `information_exposure` (10 × )

These findings are in JavaScript utility modules used to print data structures for an educational algorithms repository, not in Java application code handling secrets or production responses. The flagged sinks are intentional console/stdout output in helper functions whose purpose is to display tree and heap contents, so treating them as security information exposure is scanner noise rather than a real vulnerability in this codebase.

### `prototype_pollution` (5 × )

These findings are false positives. The code is a straightforward merge sort over arrays, using numeric indices and local temporary arrays; it does not merge attacker-controlled object properties into another object or write to dangerous keys like __proto__, constructor, or prototype. The scanner appears to have misclassified ordinary array element assignment and function calls in JavaScript as prototype-pollution sinks.

## Validation Policy

- **Valid:** The local pattern matches the rule description **and** the fix/remediation text applies to the language, or the metric is objectively measured.
- **Not valid:** Wrong-language remediation, framework/RAII semantics missed, or stylistic noise.
