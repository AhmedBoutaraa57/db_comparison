# free-programming-books (Python) Scan Validation Summary

Source report: `EbookFoundation__free-programming-books.json`

## Scan Metadata

- **Scanner:** `cognium-ai` (LLM-enhanced · `default`)
- **Validation model:** `gpt-5.4`
- **Repository:** [EbookFoundation/free-programming-books](https://github.com/EbookFoundation/free-programming-books)

## Final Classification

- Files scanned (report): **0**
- Total findings: **3**
- **Security-related findings (by rule):** **0**
- **Code quality / reliability / architecture findings (by rule):** **3**
- **Valid (actionable or objectively correct signal):** **0**
- **Not valid (false positive, wrong language model, or scanner noise for this corpus):** **3**

## Rule-Level Validation


| Rule             | Total | Valid | Not Valid | Verdict   |
| ---------------- | ----- | ----- | --------- | --------- |
| `path_traversal` | 2     | 0     | 2         | not_valid |
| `missing-stream` | 1     | 0     | 1         | not_valid |


## Notes

### `path_traversal` (2 × )

These findings are false positives in the context of this Python repository: the script is a command-line linter utility that intentionally opens user-specified files and config paths as its primary function. There is no attacker-controlled path crossing a trust boundary in a server/web context, nor any missing sandbox or directory restriction that the code claims to enforce. The scanner is flagging normal file-processing behavior rather than an actual CWE-22 vulnerability.

### `missing-stream` (1 × )

This finding is not a meaningful issue in this Python codebase: the script needs a list of all lines via splitlines() for subsequent indexed analysis, so replacing read() with simple streaming iteration is not an equivalent fix. The target files are Markdown source files in a repository linter, typically small enough that whole-file reads are idiomatic and not a practical performance problem here. The more relevant concern would be using a context manager to close the file, not streaming for memory reduction.

## Validation Policy

- **Valid:** The local pattern matches the rule description **and** the fix/remediation text applies to the language, or the metric is objectively measured.
- **Not valid:** Wrong-language remediation, framework/RAII semantics missed, or stylistic noise.

