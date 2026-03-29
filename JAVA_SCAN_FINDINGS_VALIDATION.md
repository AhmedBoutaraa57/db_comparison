# JAVA Scan Validation Summary

Source report: `cognium-java-scan.txt`

Per-finding rationale is **intentionally omitted** from this file to avoid bloat (the full pass produced one line per finding). The rule-level **Valid / Not valid** counts below are the aggregate of that same heuristic classification.

## Final Classification

- Files scanned (report): **1026**
- Total findings: **9525**
- **Security-related findings (by rule):** **3730**
- **Code quality / reliability / architecture findings (by rule):** **5795**
- **Valid:** 2438
- **Not valid (false positive / not actionable in this pass):** 7087

## Rule-Level Validation


| Rule                    | Valid | Not valid |
| ----------------------- | ----- | --------- |
| `missing-public-doc`    | 0     | 4160      |
| `xss`                   | 1303  | 1503      |
| `orphan-module`         | 0     | 1010      |
| `path_traversal`        | 184   | 118       |
| `unused-variable`       | 290   | 0         |
| `log_injection`         | 185   | 0         |
| `todo-in-prod`          | 132   | 0         |
| `sql_injection`         | 44    | 67        |
| `deserialization`       | 105   | 0         |
| `external_taint_escape` | 0     | 86        |
| `code_injection`        | 0     | 80        |
| `string-concat-loop`    | 70    | 0         |
| `variable-shadowing`    | 0     | 59        |
| `dependency-fan-out`    | 32    | 0         |
| `ssrf`                  | 29    | 0         |
| `unchecked-return`      | 27    | 0         |
| `n-plus-one`            | 11    | 0         |
| `insecure_cookie`       | 10    | 0         |
| `weak_random`           | 5     | 0         |
| `trust_boundary`        | 0     | 4         |
| `weak_crypto`           | 4     | 0         |
| `ldap_injection`        | 3     | 0         |
| `stale-doc-ref`         | 3     | 0         |
| `resource-leak`         | 1     | 0         |


## Notes Used For Validation

- **missing-public-doc** is treated as policy noise for this exercise (same stance as the JavaScript scan README).
- **orphan-module** is mostly not valid here: Java/Spring and servlet apps are wired by frameworks, XML, or reflection, so import graphs miss real entrypoints.
- **variable-shadowing** is treated as scanner-noisy for this corpus (aligned with the JS assessment).
- **Security rules** use lightweight source-window heuristics next to the reported line (e.g., JSON `ResponseEntity` vs `PrintWriter` HTML). Findings are still triage candidates, not pen-test conclusions.
- **external_taint_escape** and **code_injection** are defaulted conservative (not valid) unless a clear sink appears in the local window.
- **trust_boundary** is marked not valid generically; it needs product-specific trust modeling.

## Validation Policy

- **Valid:** matches a real pattern in source within the heuristic window, or a maintainability signal that is objectively present.
- **Not valid:** policy-only warnings, framework/graph blind spots, or findings where the local sink does not match the rule (e.g., XSS on JSON responses).

