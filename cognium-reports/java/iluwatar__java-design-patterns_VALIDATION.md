# java-design-patterns (Java) Scan Validation Summary

Source report: `iluwatar__java-design-patterns.json`

## Scan Metadata

- **Scanner:** `cognium` (static analysis only)
- **Validation model:** `gpt-5.4`
- **Repository:** [iluwatar/java-design-patterns](https://github.com/iluwatar/java-design-patterns)

## Final Classification

- Files scanned (report): **0**
- Total findings: **3957**
- **Security-related findings (by rule):** **0**
- **Code quality / reliability / architecture findings (by rule):** **3957**
- **Valid (actionable or objectively correct signal):** **1718**
- **Not valid (false positive, wrong language model, or scanner noise for this corpus):** **2239**

## Rule-Level Validation

| Rule | Total | Valid | Not Valid | Verdict |
| --- | ---: | ---: | ---: | --- |
| `orphan-module` | 1112 | 0 | 1112 | not_valid |
| `missing-public-doc` | 1035 | 1035 | 0 | valid |
| `stale-doc-ref` | 594 | 594 | 0 | valid |
| `naming-convention` | 554 | 0 | 554 | not_valid |
| `unused-interface-method` | 369 | 0 | 369 | not_valid |
| `infinite-loop` | 58 | 15 | 43 | mixed |
| `unchecked-return` | 30 | 0 | 30 | not_valid |
| `log_injection` | 28 | 15 | 13 | mixed |
| `redundant-loop-computation` | 25 | 25 | 0 | valid |
| `path_traversal` | 18 | 13 | 5 | mixed |
| `unbounded-collection` | 17 | 3 | 14 | mixed |
| `unused-variable` | 16 | 1 | 15 | mixed |
| `external_taint_escape` | 13 | 0 | 13 | not_valid |
| `missing-stream` | 13 | 0 | 13 | not_valid |
| `trust_boundary` | 10 | 0 | 10 | not_valid |
| `xss` | 10 | 0 | 10 | not_valid |
| `swallowed-exception` | 9 | 3 | 6 | mixed |
| `n-plus-one` | 9 | 2 | 7 | mixed |
| `ssrf` | 7 | 7 | 0 | valid |
| `string-concat-loop` | 6 | 0 | 6 | not_valid |
| `deserialization` | 5 | 1 | 4 | mixed |
| `excessive-allocation` | 4 | 0 | 4 | not_valid |
| `code_injection` | 4 | 3 | 1 | mixed |
| `nosql_injection` | 4 | 0 | 4 | not_valid |
| `sql_injection` | 4 | 0 | 4 | not_valid |
| `xxe` | 1 | 1 | 0 | valid |
| `variable-shadowing` | 1 | 0 | 1 | not_valid |
| `ldap_injection` | 1 | 0 | 1 | not_valid |

## Notes

### `orphan-module` (1112 × )

These findings are false positives for a Java multi-module example repository. The scanner is treating individual source files as standalone modules and relying on incoming import counts, which misses normal Java usage patterns such as implementations referenced via interfaces, inheritance, package-local/demo wiring, tests, reflection, and same-module entry classes. In a design-patterns codebase, many classes are intentionally leaf types or API definitions used by companion examples rather than broadly imported across the repository, so 'no incoming imports' does not imply dead code.

### `missing-public-doc` (1035 × )

These findings are true positives for Java: the flagged members are public and lack Javadoc comments, while the suggested remediation of adding a /** ... */ comment is appropriate for this language and code style. Although many are simple overrides or trivial constructors that teams may choose not to document, the rule as stated is about missing public documentation, and the scanner is correctly identifying undocumented public API elements in this repository.

### `stale-doc-ref` (594 × )

These findings are true positives in Java: Javadoc {@link ...} references must resolve to visible types or members in scope, and the reported symbols are not imported, fully qualified, or otherwise resolvable from the documented classes. In this repository many examples describe pattern participants that live in subpackages or have been renamed, so the comments are semantically helpful but technically stale for Javadoc resolution. The appropriate remediation is to update the links to fully qualified names, add imports where suitable, or replace broken links with plain text.

### `naming-convention` (554 × )

These findings are false positives caused by treating Java constructors as ordinary methods and by applying an overly generic constant-naming rule to logger fields. In Java, constructors must match the class name and therefore are correctly PascalCase, and many Java codebases intentionally use `private static final Logger logger`/Lombok-generated `LOGGER` as idiomatic logging names rather than requiring UPPER_SNAKE_CASE for every static final reference. The scanner's suggested remediations would break Java semantics for constructors and are not appropriate for this repository.

### `unused-interface-method` (369 × )

These findings are false positives caused by a file-local heuristic that treats interface declarations and default trait methods as unused if they are not invoked within the same source file. In Java, interface methods define contracts for implementers and callers in other classes, so lack of self-use inside the declaring interface is expected and not a maintainability issue by itself. The reviewed examples are core pattern APIs (Abstract Document, Abstract Factory, Visitor) whose methods are intentionally consumed across files, making the suggested removal inappropriate. This pattern is representative enough to extrapolate that the rule is not valid for this Java codebase.

### `infinite-loop` (58 × )

Most findings are false positives caused by the scanner treating ordinary bounded for/while loops, iterator traversal, and intentional event/game loops as infinite simply because there is no explicit break/return inside the body. In Java, loops controlled by changing counters, iterator state, queue/journal exhaustion, or external lifecycle flags are idiomatic and not CWE-835 by themselves. The only findings that are plausibly valid are long-running loops whose termination depends on external state that may never change or on blocking behavior that can prevent shutdown, making the infinite-loop concern materially applicable.

### `unchecked-return` (30 × )

These findings are false positives caused by a rule that assumes ignored return values indicate unchecked failure, but in this Java code the methods return domain objects or collections, not boolean/error-status values. Several calls are intentionally made for side effects such as populating or exercising cache behavior in demo code, and others are directly consumed inside collection operations, so the suggested `if (!call())` remediation is type-incorrect and inapplicable. The MongoDB and combinator examples likewise use returned iterables/lists idiomatically rather than ignoring failure signals.

### `log_injection` (28 × )

This rule is partially valid in this Java codebase: several findings log externally influenced strings such as JSON payloads, HTTP response bodies, UI route/data, exception messages, or arbitrary log messages without sanitizing CR/LF, which is a real CWE-117 concern. However, a substantial subset are false positives where the scanner invents impossible taint flows or flags logging of internal numeric state and framework-provided startup args that are not actually incorporated into the logged value. The representative sample suggests the full set of 28 findings likely mixes genuine unsanitized logging of untrusted content with noisy dataflow matches.

### `redundant-loop-computation` (25 × )

These findings are valid for Java: repeated calls to array length, String length(), and collection size() inside loop conditions or bodies are loop-invariant in the shown code and can be safely cached in a local variable. Although the performance impact is usually tiny because some of these accessors are cheap, the rule is correctly identifying redundant repeated computation rather than misunderstanding Java idioms or suggesting a wrong-language fix. The reviewed samples are representative of straightforward loops over stable arrays, strings, and collections, so extrapolating validity to the remaining findings is reasonable.

### `path_traversal` (18 × )

Most findings are valid because the code directly opens, reads, writes, or checks filesystem paths supplied via method parameters or system properties without any normalization or restriction to a safe base directory. However, several findings in the reactor module are clear false positives because they involve network channel writes and socket addresses, not filesystem path handling, and one promise finding appears to be a spurious cross-flow report unrelated to a path source.

### `unbounded-collection` (17 × )

Most findings are false positives because the collections are populated under explicit, small, or structurally bounded conditions: fixed-count for-loops, traversal of already-bounded data structures, or methods that intentionally materialize current contents for return. The rule is only meaningful where growth is tied to retry loops and the collection retains every failure across attempts, which can accumulate until the configured retry limit is reached. In this Java codebase, adding arbitrary MAX checks to examples, iterators, serializers, or cache-export helpers would be incorrect or non-idiomatic.

### `unused-variable` (16 × )

Most findings are false positives caused by Java patterns the scanner does not model well: Lombok-generated getters/setters, JPA-managed entity fields, state fields read indirectly by framework or other methods, and ordinary variables that are clearly used after assignment. The only convincing true positive in the reviewed set is the enhanced-for loop variable named 'ignored', which is intentionally unused and could be replaced by a different counting approach. Given the sample, this rule is mostly noisy for this codebase, though at least one real unused-variable style issue exists.

### `external_taint_escape` (13 × )

These findings are false positives caused by treating ordinary Java data flow, object construction, collection access, logging, concurrency orchestration, and return values as a security sink. The flagged lines do not represent a real taint escape vulnerability in this codebase; they are mostly demo-pattern code passing values between in-memory objects without crossing a trust boundary or invoking a dangerous API that would require sanitization. CWE-20 is also a poor fit here because the reports do not identify actual input validation failures, only benign propagation of values through normal Java methods.

### `missing-stream` (13 × )

These findings are false positives because in Java, BufferedReader, FileInputStream, and related stream classes are already streaming I/O primitives and do not inherently load an entire file into memory. The scanner is conflating the presence of reader/input-stream construction with whole-file materialization, but most examples either process incrementally line-by-line or use standard APIs like Properties.load/ObjectInputStream that are idiomatic for the data format. A few call sites do ultimately collect all lines into memory, but the rule's specific remediation and message about replacing these constructors with streams/channels is incorrect for this codebase and language.

### `trust_boundary` (10 × )

These findings flag ordinary Hibernate/JPA persistence of domain objects updated from method parameters, but no actual trust-boundary violation is demonstrated. In Java ORM code, session.update()/save() are not inherently security sinks; without evidence of unsafe query construction, deserialization, authorization bypass, or framework-specific mass-assignment issues, this is just normal data persistence. The scanner appears to be treating any externally influenced field update crossing into the database layer as CWE-501, which is too broad for this codebase.

### `xss` (10 × )

These findings are false positives because the flagged code is plain Java delegation, logging, file/network I/O, and JSON deserialization, not HTML generation or browser response rendering where XSS occurs. The scanner appears to be treating generic data flow to sinks like logger calls, socket writes, method forwarding, and file writes as XSS sinks, which is not applicable in this Java codebase.

### `swallowed-exception` (9 × )

Most findings are false positives because the catch blocks do handle the exception in Java-idiomatic ways: restoring interrupt status, invoking an error callback, printing/logging, or converting the failure into promise completion. However, a few InterruptedException handlers do not preserve the interrupt or otherwise report it, which is a real reliability issue in concurrent Java code. So this rule is only partially applicable here, and the scanner overflags non-empty catch blocks as 'swallowed.'

### `n-plus-one` (9 × )

Most findings are false positives caused by a syntactic rule that flags any method call inside a loop as an N+1 query. In this Java codebase, calls like ExecutorService.execute(), Stream.findFirst() over an in-memory collection, and a single DAO findAll() used as the loop source are not N+1 query patterns. The only plausible true positives are the per-entity save() loop and iterating cakes while dereferencing associated entities/collections, which can trigger repeated persistence operations or lazy-load queries in a layered/JPA-style architecture.

### `ssrf` (7 × )

These findings are valid in Java: both locations construct outbound network requests from caller-controlled URL data without any allowlist, scheme restriction, or host validation. In TinyRestClient, the request URI is built from a configurable base URL plus method arguments and then sent via Java HttpClient; in promise.Utility, an arbitrary string is turned into a URL and fetched with openStream(), which is a classic SSRF sink. Several findings are duplicates on adjacent sink lines, but they still point to real SSRF-prone flows rather than scanner noise or wrong-language guidance.

### `string-concat-loop` (6 × )

All reviewed findings are false positives caused by the scanner confusing numeric '+=' accumulation with string concatenation. In each case the variable involved is a primitive numeric type (long or int), so there is no String growth, no O(n^2) copying behavior, and the suggested StringBuilder/join remediation is inapplicable to this Java codebase.

### `deserialization` (5 × )

The Jackson usages in JsonUtil deserialize JSON into an explicitly supplied concrete Class or collection element type, which by itself is not the Java unsafe deserialization issue covered by CWE-502 unless polymorphic/default typing or attacker-controlled gadget types are enabled; these findings are generic taint hits rather than demonstrated exploitable deserialization flaws. In contrast, BlobSerializer uses java.io.ObjectInputStream.readObject on input provided from a caller, which is the classic unsafe Java native deserialization sink and squarely matches CWE-502.

### `excessive-allocation` (4 × )

These findings are false positives in Java because the allocations are semantically required to create distinct result containers or array slices, not wasteful temporaries that could be safely hoisted and reused. Reusing a single list or array across loop iterations would alias multiple map entries/results to the same mutable object and break correctness; the scanner is flagging normal collection-building patterns rather than a real performance bug.

### `code_injection` (4 × )

The front-controller findings are valid because untrusted request data is concatenated into a class name and then reflectively loaded and instantiated, which is a real Java code-loading/code execution risk if an attacker can influence available classes on the classpath. The three Dispatcher reports are duplicates of the same underlying sink with different taint origins, but each reported flow is still substantively valid. The ServiceLocator finding is not code injection: passing a string into a JNDI-style lookup is a naming/resource resolution pattern, not dynamic code generation or reflective execution in this sample.

### `nosql_injection` (4 × )

These findings are false positives in this Java MongoDB code because the queries are built with fixed field names and scalar values, not by concatenating user-controlled operators or raw JSON into a query document. Using a user-supplied string as the value of the fixed "_id" field in a typed Document constructor does not create NoSQL injection in the usual CWE-943 sense, and the system property for host/port is connection configuration rather than query construction.

### `sql_injection` (4 × )

These findings are false positives because the flagged code is a recursive spatial query over an in-memory QuadTree and contains no SQL construction, database API usage, or query execution sink. The parameter `Rect r` is a geometry object used for intersection and containment checks, and the recursive calls simply traverse child nodes, so SQL injection remediation does not apply to this Java code.

### `xxe` (1 × )

This finding is valid in Java because the code parses XML from potentially untrusted input using a default DOM parser without disabling external entities or DTD processing. In JAXP, DocumentBuilderFactory must be explicitly hardened against XXE; using newDefaultInstance() alone does not make this safe, so the scanner's remediation direction matches the language and framework.

### `variable-shadowing` (1 × )

This finding is a false positive because the code shows only a single local variable named 'response' declared at line 55 and then reassigned or appended to within the if/else block. In Java, shadowing requires a new declaration in an inner scope that hides an outer declaration, which is not happening here. The suggested fix to rename an inner variable does not apply to this code sample.

### `ldap_injection` (1 × )

This finding is a false positive in this Java example code. The code is implementing the Service Locator pattern with a local demo InitContext/lookup mechanism, not constructing or executing an LDAP query/filter against an LDAP server, so CWE-90 remediation does not meaningfully apply here. The scanner appears to have conflated generic JNDI-style lookup by name with LDAP injection.

## Validation Policy

- **Valid:** The local pattern matches the rule description **and** the fix/remediation text applies to the language, or the metric is objectively measured.
- **Not valid:** Wrong-language remediation, framework/RAII semantics missed, or stylistic noise.
