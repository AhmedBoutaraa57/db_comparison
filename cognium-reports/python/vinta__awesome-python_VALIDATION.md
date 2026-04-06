# awesome-python (Python) Scan Validation Summary

Source report: `vinta__awesome-python.json`

## Scan Metadata

- **Scanner:** `cognium-ai` (LLM-enhanced · `default`)
- **Validation model:** `gpt-5.4`
- **Repository:** [vinta/awesome-python](https://github.com/vinta/awesome-python)

## Final Classification

- Files scanned (report): **0**
- Total findings: **7**
- **Security-related findings (by rule):** **0**
- **Code quality / reliability / architecture findings (by rule):** **7**
- **Valid (actionable or objectively correct signal):** **0**
- **Not valid (false positive, wrong language model, or scanner noise for this corpus):** **7**

## Rule-Level Validation

| Rule | Total | Valid | Not Valid | Verdict |
| --- | ---: | ---: | ---: | --- |
| `missing-public-doc` | 5 | 0 | 5 | not_valid |
| `unchecked-return` | 2 | 0 | 2 | not_valid |

## Notes

### `missing-public-doc` (5 × )

These findings target Python TypedDict declarations used as lightweight structural type aliases, not public runtime classes that typically require API docstrings. The remediation is also clearly wrong-language for Python, suggesting JavaDoc-style '/** ... */' comments instead of Python docstrings. In this codebase, the module docstrings and inline field comments already make these schema-like types sufficiently self-describing, so flagging them as missing public docs is scanner noise.

### `unchecked-return` (2 × )

These findings are false positives caused by applying a non-Python remediation model to Python's pathlib API. In Python, Path.mkdir() does not return a success value to check; it either succeeds or raises an exception such as OSError/FileExistsError, so ignoring its return is idiomatic and does not suppress failures.

## Validation Policy

- **Valid:** The local pattern matches the rule description **and** the fix/remediation text applies to the language, or the metric is objectively measured.
- **Not valid:** Wrong-language remediation, framework/RAII semantics missed, or stylistic noise.
