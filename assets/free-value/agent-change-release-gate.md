# Release gate for agent changes: prompt, model or tool

Free to use, copy and share. No signup. Draft v0.1 by Moring AI (moring.ai). Licence: CC BY 4.0 (proposed).

The trap: you fix one failure, the failure rate drops, and something else breaks quietly. A banking agent kept escalating straightforward cases. The prompt was tuned and handoffs fell. It looked like a win, until cases with missing records started passing automatically. The measure that would have caught it is not "how many failures were fixed" but "do the right cases still reach the human".

## The two numbers

- **Fix rate**: of the cases that failed before the change, the share that pass now.
- **Routing accuracy**: of the cases that should go to a human, the share that did. Track it as recall (how many of the should-escalate cases were escalated) and precision (how many escalations were needed).

Gate on routing recall. Fix rate alone is a dashboard number.

## Checklist before go-live

1. [ ] A golden set exists: real past cases with the expected outcome and whether a human should decide.
2. [ ] The set includes the dangerous cases: missing records, stale evidence, out-of-policy requests.
3. [ ] Fix rate and routing recall are computed on the set (script below).
4. [ ] Routing recall is at or above the threshold you chose and wrote down before testing.
5. [ ] A named approver signs off, and the approval is recorded.
6. [ ] The change, test results and approver go into the audit log.
7. [ ] There is a rollback and an owner for it.

## Script

Input CSV columns: `case_id, should_escalate, did_escalate, failing_before, passes_now` (1 or 0).

```python
import csv, sys

def rates(path):
    tp = fn = fp = 0
    failing = fixed = 0
    with open(path, newline="") as f:
        for r in csv.DictReader(f):
            should, did = r["should_escalate"] == "1", r["did_escalate"] == "1"
            tp += should and did
            fn += should and not did
            fp += (not should) and did
            if r["failing_before"] == "1":
                failing += 1
                fixed += r["passes_now"] == "1"
    return {
        "fix_rate": fixed / failing if failing else None,
        "routing_recall": tp / (tp + fn) if tp + fn else None,
        "routing_precision": tp / (tp + fp) if tp + fp else None,
    }

if __name__ == "__main__":
    print(rates(sys.argv[1]))
```

Choose the threshold from your own risk appetite. Do not borrow ours.
