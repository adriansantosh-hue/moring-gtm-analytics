# LinkedIn comment targets, week of 13 Oct 2026

Status: DRAFT. Nothing posted. Found via ConnectSafely post search (past week, by each person's lane). Hiring posts, recruiters, vendor promos and Moring's own posts were dropped. Comments are written short and plain, answer what the post says, and pitch nothing. Each person should be comfortable with their lines before anything goes out.

Posting rule when approved: spread over the day and across days, one comment per account every 20 to 60 minutes, never a burst. No links, no tags, no "great post".

## Nikhil (workflow owners: KYC, onboarding, claims, bank ops)
| Author | Their post | Comment |
|---|---|---|
| Glenn Fratangelo, Product Marketing Director, FinCrime tech | "KYC programmes fail between the checkpoints, not at them" ([post](https://www.linkedin.com/feed/update/urn:li:activity:7513933149987422208)) | feels like the analyst's real job ends up being stitching those four outputs together by hand. who owns that gap in most teams you work with? |
| Parthasarathi Dash, Everest Group (BFSI) | Agentic AI near-term value is in human-supervised onboarding/KYC ([post](https://www.linkedin.com/feed/update/urn:li:activity:7514206166285963264)) | agree the near-term wins aren't the most autonomous ones. onboarding and KYC work because a person still signs off. did the research look at how long these take to clear model risk review? |
| Jitesh Karamchandani, Sr Delivery Manager | P&C claims: a gate decides what AI handles and what a person owns ([post](https://www.linkedin.com/feed/update/urn:li:activity:7514275253284425728)) | the gate is the part most teams skip. what share of FNOL would you expect the AI side to own after the first few months? |
| Rishav Sharma, Product Owner, Guardian Life | AI processes a claim in about 60 seconds, but rejections worry him ([post](https://www.linkedin.com/feed/update/urn:li:activity:7514173111303348224)) | the 60 seconds gets the headline, the rejection rate is the bit that matters. who reviews the denials in that setup? |
| Debashish Ghosh, VP Wholesale Lending Ops, Wells Fargo | Is AI governance keeping pace in loan ops, KYC, exceptions? ([post](https://www.linkedin.com/feed/update/urn:li:activity:7513866601679597568)) | exception management is where I'd start too. high volume, and the evidence trail is usually the messy part. are your teams trying anything there yet? |

## Ashvath (AI cost, inference, routing)
| Author | Their post | Comment |
|---|---|---|
| Bo Shen, Founder, TokenWatt | Same H100, different hosts, very different inference results ([post](https://www.linkedin.com/feed/update/urn:li:activity:7514342552192499713)) | same GPU name, very different throughput. would love to see cost per 1M output tokens next to the hourly price |
| Saravana Jaikumar, Professor, IIM Calcutta | Token prices down 98% yet AI budgets still break; Google adds spend caps ([post](https://www.linkedin.com/feed/update/urn:li:activity:7515008972827836416)) | cheaper tokens, way more of them. hard caps that pause the agent feel like the right default |
| Chirag Roy, Accenture S&C | AI tools and tokens cost 4x the consultant using them ([post](https://www.linkedin.com/feed/update/urn:li:activity:7513865925360807936)) | 4x the person is wild. did you split it by tool? my guess is a couple of tools drive most of it |
| Seong Joon Oh, Professor, KAIST | Agents keep doing repetitive work a human would script ([post](https://www.linkedin.com/feed/update/urn:li:activity:7513613856011726851)) | this is the cheapest fix nobody does. if the agent notices it's repeating itself, write the script once and stop paying per page |
| Nimit Wadhwa, LLM research, IIT Guwahati | Cost-aware routing with a 7B open model ([post](https://www.linkedin.com/feed/update/urn:li:activity:7514994889521041408)) | nice result. routing the simple tasks to a small model is where most of the savings hide. how did you decide which tasks counted as simple? |

## Ellakkia (approvals, audit, access)
| Author | Their post | Comment |
|---|---|---|
| Juan O., Tax Practitioner | An AI agent is still a role inside an operating system ([post](https://www.linkedin.com/feed/update/urn:li:activity:7514322008910856192)) | "a role inside an operating system" is a great way to put it. I'd add one question: who signs off when it wants to do something outside that role? |
| Alifia Ghantiwala, Director, Morgan Stanley | In financial services, governance is the bottleneck, not the LLM ([post](https://www.linkedin.com/feed/update/urn:li:activity:7514576210358829056)) | agree, it's rarely the model. in regulated teams the slow part is proving afterwards what the agent did and who approved it |
| Zafer Khallouf, ERP Transformation Leader | We controlled ERP users; now we must control AI agents ([post](https://www.linkedin.com/feed/update/urn:li:activity:7514281735426158592)) | the SoD parallel is a good one. same rule should apply: an agent shouldn't be able to raise and approve its own change |
| Thanigaivel S., Product Leader | Access to data is one decision, permission to act is another ([post](https://www.linkedin.com/feed/update/urn:li:activity:7514007032073502720)) | access vs permission to act is the distinction more teams need. flag and recommend, fine. paying or posting to the ledger, a named person approves |
| Tanushri B, AI Transformation Leader | AI agents act faster than our approval processes ([post](https://www.linkedin.com/feed/update/urn:li:activity:7515323992791031808)) | "design control into the architecture", yes. otherwise people just click approve to keep up |

## Balaji (control plane, kill switch, identity) - not connected yet, he posts these by hand
| Author | Their post | Comment |
|---|---|---|
| Egil Østhus, CEO, Unleash | Every AI agent should have a kill switch ([post](https://www.linkedin.com/feed/update/urn:li:activity:7513700994724163585)) | agree. the bit people miss is retries and queued jobs, the switch has to stop those too, not just new calls. have you seen teams actually test theirs? |
| Mark Wojtasiak, SVP, Vectra AI | An AI kill switch as an emergency brake ([post](https://www.linkedin.com/feed/update/urn:li:activity:7514021135315828736)) | emergency brake is the right picture. I'd add that someone should practise pulling it before they need to |
| Paul Snow, Accumulate | Agents get access but orgs can't reconstruct what they accessed ([post](https://www.linkedin.com/feed/update/urn:li:activity:7514397306733989888)) | this is the scary part. if you can't list what the agent touched, you can't undo it either |
| Andreas Racké, Agentic AI and identity | AI agents are a new identity class ([post](https://www.linkedin.com/feed/update/urn:li:activity:7515448733908742144)) | agents as their own identity class makes sense. the hard part is the "on behalf of" chain when one agent hands work to another |
| Dilip D Vyas, VP Enterprise Integration | Enterprise AI control plane: identity, policy, runtime ... audit ([post](https://www.linkedin.com/feed/update/urn:li:activity:7514192755489820672)) | nice list. what sits in the runtime vs the gateway in your view? that line moves a lot between teams |

## Moring AI company page (AI leaders, pilot to production, banks)
| Author | Their post | Comment |
|---|---|---|
| Piali Ghose, VP Director of AI | Brief a bank board on AI risk with five numbers ([post](https://www.linkedin.com/feed/update/urn:li:activity:7513617197798387712)) | five numbers beats a 40 page report. we'd add one: how many agent actions last month had a named person approving them |
| Dhiraj J., Director Solution Architecture, adidas | "What happens if this works?" changed how he runs AI pilots ([post](https://www.linkedin.com/feed/update/urn:li:activity:7513868761439932416)) | such a good week-one question. most pilots never write down what yes looks like |
| Michael Rasmussen, CEO, W(AI)kforce | Getting from pilot to production is the recurring theme ([post](https://www.linkedin.com/feed/update/urn:li:activity:7513964829511127040)) | same theme for us. the pilots that make it usually had one owner and one number from day one |
| Abhisek Singh, Solutions Architect, Verizon | Agents fail in production on the 5% of runs that go wrong ([post](https://www.linkedin.com/feed/update/urn:li:activity:7513921104852221952)) | the 5% point is spot on. designing for the runs that go wrong is most of the work |
| Nikhil Sareen, Federal Reserve Bank of Dallas | Wide variation in how banks govern AI ([post](https://www.linkedin.com/feed/update/urn:li:activity:7515175602224599040)) | interesting to hear how much it varies. the teams moving fastest seem to treat each agent like a new hire: scoped access and a clear approver |

Left out on purpose: hiring and recruiter posts, vendor product promos (incl. a direct "authority governance for AI agents" competitor), and posts already full of comments where a new voice gets lost.

## ICP follow-up from comment threads (2026-10-13)
Rule: no pitch in the connection request; M1 only after they accept (approved message architecture); M2 (offer + 15 min) only after a reply. One active person per account, 14-day cooling gap.

| Person | Company | Connect from | Status |
|---|---|---|---|
| Alifia Ghantiwala | Morgan Stanley (Director, Data Eng & Regulatory Reporting) | Nikhil | Connection request sent 2026-10-13 (last MS email touch 2026-09-14, clear) |
| Piali Ghose | Chain Bridge Bank (VP, Director of AI) | Nikhil | Connection request sent 2026-10-13. Check bank size (may be under the $2B floor) before M1 |
| Debashish Ghosh | Wells Fargo (VP Wholesale Lending Ops) | Nikhil | HOLD until 2026-10-16: Wells Fargo last emailed 2026-10-02 |
| Rishav Sharma | Guardian Life (Product Owner, AI & Automation) | Nikhil | HOLD until 2026-10-16: Guardian Life last emailed 2026-10-02 |
| Tanushri B | InnoWise / iLink Digital | Ellakkia (thread) | Partner route, not a buyer pitch |

Connection notes (no pitch):
- Debashish: "Hi Debashish, enjoyed your post on governance in loan ops and exceptions. would be good to connect."
- Rishav: "Hi Rishav, liked your take on claim speed vs rejections. would be good to stay in touch."

M1 drafts, send only after acceptance:
- Alifia: "Alifia, you lead data engineering and regulatory reporting at Morgan Stanley. In regulated teams, the slow part of moving an AI agent to production is usually proving afterwards what it did and who approved it. I work on this problem, so I am curious: is that true for your team today?"
- Piali: "Piali, you lead AI at Chain Bridge Bank with a model risk lens. A common problem for banks: AI use cases stall at review because no one can show what the agent did, under which rule, and who approved it. I work on this problem, so I am curious: is that true for your team today?"
- Debashish: "Debashish, you run wholesale lending operations at Wells Fargo. In lending ops, AI pilots often stall at exceptions: the evidence for each case sits in several systems and someone still has to assemble it before a reviewer can decide. I work on this problem, so I am curious: is that true for your team today?"
- Rishav: "Rishav, you work on AI and automation at Guardian Life. When claims get faster, the hard question becomes who reviews the denials, and the evidence for that review is usually scattered. I work on this problem, so I am curious: is that true for your team today?"
