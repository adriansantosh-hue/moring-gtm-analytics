# Enterprise RAG: version-pinned corpus and an eval before each index swap

Free to use, copy and share. No signup. Draft v0.1 by Moring AI (moring.ai). Licence: CC BY 4.0 (proposed).

A common failure: retrieval finds chunks that look relevant, and generation cites the wrong policy version. The retrieval worked; the answer was still wrong. This checklist is the fix we use: control which documents and versions can be retrieved, and test before every change.

## Version-pinned corpus
- [ ] Every document in the index has an id, a version, an effective date and an owner.
- [ ] Superseded versions are marked and excluded from retrieval by default.
- [ ] A question that depends on a date can ask for the version in force on that date.
- [ ] The source filter limits retrieval to the right business unit and region.

## Eval before each index swap
- [ ] Build 50 golden question and answer pairs from real questions, each with the expected source document and version.
- [ ] Include traps: a superseded version that looks similar, and questions with no answer in the corpus.
- [ ] Run before any index swap, embedding change or chunking change.
- [ ] Measure: correct source cited, correct version cited, answered when it should have said "not found".
- [ ] A swap does not go live if citation accuracy drops against the previous index.

## Trace for each answer
- [ ] The answer lists the document id, version and passage it used.
- [ ] A reviewer can follow the citation to the source in one click.

Label any before and after numbers as illustrative or measured, with the sample size.
