# system-design-primer (Python) Scan Validation Summary

Source report: `donnemartin__system-design-primer.json`

## Scan Metadata

- **Scanner:** `cognium-ai` (LLM-enhanced · `default`)
- **Validation model:** `gpt-5.4`
- **Repository:** [donnemartin/system-design-primer](https://github.com/donnemartin/system-design-primer)

## Final Classification

- Files scanned (report): **0**
- Total findings: **129**
- **Security-related findings (by rule):** **0**
- **Code quality / reliability / architecture findings (by rule):** **129**
- **Valid (actionable or objectively correct signal):** **0**
- **Not valid (false positive, wrong language model, or scanner noise for this corpus):** **129**

## Rule-Level Validation

| Rule | Total | Valid | Not Valid | Verdict |
| --- | ---: | ---: | ---: | --- |
| `missing-public-doc` | 124 | 0 | 124 | not_valid |
| `unhandled-exception` | 5 | 0 | 5 | not_valid |

## Notes

### `missing-public-doc` (124 × )

These findings are not valid for this Python repository because the remediation is clearly from another language ecosystem: Python uses docstrings, not '/** ... */' doc comments. In this codebase, many flagged items are simple enums, small example classes, and straightforward methods in educational sample code where missing docstrings are not a correctness issue, and one method already has a proper Python docstring. The rule appears to be a generic documentation-style check misapplied to Python rather than a meaningful maintainability defect for this project.

### `unhandled-exception` (5 × )

These findings are false positives for Python: explicitly raising built-in exceptions like ValueError, KeyError, or NotImplementedError is normal API behavior and does not need to be wrapped in try/except at the raise site. The scanner is applying a generic 'unhandled exception' rule that is not appropriate here, especially for validation errors, missing-key semantics, and abstract/unsupported-method signaling in example Python code.

## Validation Policy

- **Valid:** The local pattern matches the rule description **and** the fix/remediation text applies to the language, or the metric is objectively measured.
- **Not valid:** Wrong-language remediation, framework/RAII semantics missed, or stylistic noise.
