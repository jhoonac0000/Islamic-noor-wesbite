# Noor Article Images + Content Standard — Pattern (Batch 1 done 1 Nov 2026)

This is the repeatable pattern for adding images and upgrading articles on Noor.
It implements three binding user decisions (1 Nov 2026):
1. **Every article (new AND old) gets 2–4 unique, attractive, high-quality images** — hero + in-content. (User rule; decided late Oct, enforced from 1 Nov.)
2. **Article standard** = `~/workspace/article-writing-standard-2026-11-01.md` (1500+ words, human blogger tone, hook opening, TOC, 6–8 sections, short paragraphs, lists/tips, warm conclusion, 5 FAQs of 40–50+ word answers, meta description 150–160 chars, keyword slug).
3. **GEO rule**: all material SEO **and** GEO friendly (rank/cite in ChatGPT, Perplexity, Gemini, AI Overviews): direct answer up front, clear section structure, quotable factual statements, FAQs + FAQPage schema, images with descriptive filenames/alt/captions.

**Noor override (always wins over style):** religious accuracy beats everything — no fabricated religious claims, no invented personal religious experiences presented as fact (illustrative everyday scenarios must be framed as such, e.g. "Imagine someone — call him Yusuf —"), never alter Quran/hadith content or meanings, keep the verified-source note + differences note + disclaimer paragraphs untouched, English only.

## Data model (in `data/articles.ts`, `Article` interface)

- `image` — hero image path, e.g. `/images/<slug>.jpg`
- `imageAlt` — descriptive English alt text (topic-rich, natural)
- `imageCaption` — short natural caption shown under the hero (supports SEO + GEO: state the article's point in one line)
- `bodyImages` — array of `{ src, alt, caption, after }` for in-content images. `after` = 0-based index of the body paragraph AFTER which the image renders (section breaks). 2 in-content images per article in Batch 1 (3 images total per article; up to 4 allowed where sensible).

Rendering (already implemented — do not rebuild):
- `components/ArticleView.tsx`: hero `<figure class="article-hero">` (1200×675 attrs, lazy) after the meta line; body images interleaved at `after` indices with the same figure style; Article JSON-LD `image` array includes hero + all body images; **FAQPage JSON-LD auto-emitted** when ≥3 body paragraphs match the `Q: ... A: ...` format; per-article OG/Twitter image = hero image.
- `components/ArticleCard.tsx`: card thumbnail (`card-thumb`) when `image` exists.
- `app/globals.css`: `.card-thumb`, `.article-hero`, figcaption styles.

## Image rules

- **Style (Noor):** warm, dignified, publish-worthy. NO human faces. Landscapes, mosque architecture, Quran/books, prayer beads, nature, objects. Kids-story scenes: illustrations, children from behind/silhouette or objects only.
- **Quality gate:** every generated image is visually inspected before use (sharp, on-topic, no faces, no readable gibberish text). Blurry/off-topic = regenerate.
- **Filenames (SEO):** hero = `public/images/<article-slug>.jpg`; in-content = `public/images/<article-slug>-<descriptor>.jpg` (e.g. `-tied-camel.jpg`). JPG, ~1920px wide from the generator. Unique per article — never reuse an image across articles.
- **Alt text:** one descriptive sentence naming the scene AND the topic (written for screen readers + image search + AI vision).
- **Captions:** one short line that adds meaning (a takeaway), not a repeat of the alt.

## Content upgrade pattern (per article, alongside images)

1. TOC paragraph right after the intro/answer paragraph ("In this guide: ...").
2. Light humanization of existing text: natural tone, varied rhythm; facts, steps, religious content unchanged.
3. Expansion to **1500+ words** with REAL depth only (no padding/repetition): an illustrative example section, a practical-tips paragraph, a common-mistakes paragraph where useful, a warm closing ("A last word...").
4. FAQ block before the verified-source note: lead paragraph "Questions people often ask" + exactly the paragraphs in the format `Q: ...? A: ...` (40–60 word answers) — the format is what triggers FAQPage schema.
5. Meta description (`seoDescription`) checked to 150–160 characters.
6. **Kids stories are the one format exception:** a 1500-word target would destroy a 2–4 minute read-aloud story for ages 4–10. Kids stories instead get: one extra story scene + a "For parents — reading this story together" block (read-aloud tips, 3 discussion questions, one small activity). Batch 1 kids stories land ~880–930 words. If the user later orders full 1500 for kids too, revisit.
7. **Editing safety:** `data/articles.ts` object layout puts `seoDescription` BEFORE `slug`; never patch fields by forward line search from the slug line (Batch 1 lesson: it overwrites the NEXT article's field). Work on the parsed data and re-serialize, or use object-span-bounded edits — and afterwards diff ALL 82 articles against a backup: only intended bodies/seo may differ.

## Batch workflow (repeat per batch of ~10)

1. Pick the next 10 articles from the remaining list below (keep category mix).
2. Generate hero + 2 in-content images per article (media generation), inspect visually (contact sheet), install into `public/images/` with the naming rules.
3. Apply the content upgrade (steps above) + set `image/imageAlt/imageCaption/bodyImages` on the parsed data.
4. `npx next build` — must be error-free. Check built HTML of 1–2 articles: 3 `<img>` with alts, 3 `<figcaption>`, FAQPage present on guide articles.
5. Pre-push checklist: secret scan, original content only → push via `gh-push-tree.py` (PYTHONPATH=/opt/muse/skills/custom-connector-setup/bin; repo `jhoonac0000/Islamic-noor-wesbite`, branch `master`).
6. **Live-verify** after Vercel deploys: fetch 2+ article URLs — confirm `<img>` + alt present, image URLs return 200, FAQPage schema present. A batch is NOT done until live-verified.
7. Update this file: move the batch's slugs from "Remaining" to "Done".

## DONE — Batch 1 (1 Nov 2026, live-verified, commits 02e296ec + 163348dd)

| Route | Words after upgrade | Images |
|---|---|---|
| /everyday/stop-worrying-future-islamic-guide-anxiety-trust | 1774 | 3 |
| /everyday/build-daily-quran-reading-habit-islamic-guide | 1685 | 3 |
| /everyday/handle-criticism-work-without-losing-temper-islamic-guide | 1853 | 3 |
| /everyday/deal-with-loneliness-new-city-muslim-guide | 1951 | 3 |
| /everyday/family-pressure-marry-soon-not-ready-guide | 1955 | 3 |
| /everyday/exam-stress-study-pressure-calm-guide | 2103 | 3 |
| /kids/kids-thankfulness-rain-came-at-last | 931 (kids format) | 3 |
| /kids/kids-helping-at-home-little-helper | 882 (kids format) | 3 |
| /stories/forgiving-a-debt-shopkeepers-ledger | 1746 | 3 |
| /stories/patience-difficult-customer-patient-shopkeeper | 1872 | 3 |

## REMAINING — 72 articles without images

| Section | Index in data array | Route slug | Title |
|---|---|---|---|
| kids | 0 | islamic-story-for-kids-about-keeping-promises-the | Islamic Story for Kids About Keeping Promises: The Last Piece of Cake |
| kids | 1 | bilal-and-the-cracked-jug | Bilal and the Cracked Jug |
| kids | 2 | the-smallest-gift | The Smallest Gift |
| kids | 3 | maryam-and-the-long-day | Maryam and the Long Day |
| kids | 4 | the-lemon-tree | The Lemon Tree |
| kids | 5 | a-chair-for-layla | A Chair for Layla |
| kids | 6 | islamic-story-for-kids-about-gratitude-the-warm | Islamic Story for Kids About Gratitude: The Warm Jacket |
| kids | 7 | islamic-story-for-kids-about-kindness-to-animals | Islamic Story for Kids About Kindness to Animals: The Thirsty Cat |
| kids | 8 | islamic-story-for-kids-about-respecting-parents-the | Islamic Story for Kids About Respecting Parents: The Warm Shoes |
| kids | 9 | clean-little-hands | Islamic Story for Kids About Cleanliness: The Clean Little Hands |
| kids | 10 | prayer-habit-five-golden-coins | Islamic Story for Kids About Prayer Habit: The Five Golden Coins |
| kids | 11 | sharing-siblings-two-red-apples | Islamic Story for Kids About Sharing: The Two Red Apples |
| kids | 12 | patience-green-mango | Islamic Story for Kids About Patience: The Green Mango |
| kids | 13 | gratitude-for-parents-morning-tea | Islamic Story for Kids About Gratitude for Parents: The Morning Tea |
| kids | 14 | forgiveness-torn-kite | Islamic Story for Kids About Forgiveness: The Torn Kite |
| kids | 15 | kindness-animals-grey-stray | Islamic Story for Kids About Kindness to Animals: The Grey Stray |
| kids | 16 | generosity-red-toy-truck | Islamic Story for Kids About Generosity: The Red Toy Truck |
| kids | 17 | honesty-lost-wallet | Islamic Story for Kids About Honesty: The Lost Wallet |
| kids | 18 | no-wasting-food-clean-plate | Islamic Story for Kids About Not Wasting Food: The Clean Plate |
| kids | 19 | helping-elders-heavy-shopping-bags | Islamic Story for Kids About Helping Elders: The Heavy Shopping Bags |
| kids | 20 | truthfulness-broken-classroom-window | Islamic Story for Kids About Truthfulness: The Broken Window |
| kids | 21 | kids-courage-brave-voice | Islamic Story for Kids About Courage: The Brave Voice |
| kids | 22 | kids-good-manners-polite-guest | Islamic Story for Kids About Good Manners: The Polite Guest |
| kids | 23 | kids-responsibility-tidy-room | Islamic Story for Kids About Responsibility: The Tidy Room |
| kids | 24 | kids-saying-sorry-spilled-paint | Islamic Story for Kids About Saying Sorry: The Spilled Paint |
| kids | 25 | kids-sharing-new-neighbour-welcome-plate | Islamic Story for Kids About Sharing with a New Neighbour: The Welcome Plate |
| stories | 0 | the-shopkeeper-who-would-not-lie | The Shopkeeper Who Would Not Lie |
| stories | 1 | the-well-of-umm-salim | The Well of Umm Salim |
| stories | 2 | the-night-the-lantern-stayed-lit | The Night the Lantern Stayed Lit |
| stories | 3 | islamic-story-about-trust-and-amanat-the-baker | Islamic Story About Trust and Amanat: The Baker Who Kept the Key |
| stories | 4 | islamic-story-about-keeping-promises-the-merchants-word | Islamic Story About Keeping Promises: The Merchant's Word |
| stories | 5 | the-farmer-who-planted-in-a-storm | The Farmer Who Planted in a Storm |
| stories | 6 | kindness-to-neighbours-extra-plate | Islamic Story About Kindness to Neighbours: The Extra Plate of Food |
| stories | 7 | honesty-in-trade-extra-grain | Islamic Story About Honesty in Trade: The Extra Grain |
| stories | 8 | gratitude-in-hardship-fishermans-broken-net | Islamic Story About Gratitude in Hardship: The Fisherman’s Broken Net |
| stories | 9 | repentance-and-hope-carpenters-secret | Islamic Story About Repentance and Hope: The Carpenter's Secret |
| stories | 10 | trust-in-allah-travellers-empty-waterskin | Islamic Story About Trust in Allah: The Traveller's Empty Waterskin |
| stories | 11 | justice-judges-broken-window | Islamic Story About Justice: The Judge's Broken Window |
| stories | 12 | courage-admit-mistakes-broken-scale | Islamic Story About the Courage to Admit Mistakes: The Broken Scale |
| stories | 13 | patience-hardship-collapsed-wall | Islamic Story About Patience in Hardship: The Collapsed Wall |
| stories | 14 | contentment-happy-cobbler | Islamic Story About Contentment: The Happy Cobbler |
| stories | 15 | repentance-secret-not-his-to-tell | Islamic Story About Repentance: The Secret That Was Not His to Tell |
| stories | 16 | patience-with-people-loud-neighbour | Islamic Story About Patience with People: The Loud Neighbour |
| stories | 17 | caring-for-aging-parents-old-mans-shoes | Islamic Story About Caring for Aging Parents: The Old Man's Shoes |
| stories | 18 | forgiveness-between-friends-borrowed-bicycle | Islamic Story About Forgiveness Between Friends: The Borrowed Bicycle |
| stories | 19 | honesty-online-selling-phone-secret | Islamic Story About Honesty in Online Selling: The Phone with a Secret |
| stories | 20 | generosity-stranger-warm-shawl | Islamic Story About Generosity to a Stranger: The Warm Shawl |
| stories | 21 | gratitude-teacher-old-book | Islamic Story About Gratitude for a Teacher: The Teacher's Old Book |
| stories | 22 | honesty-when-no-one-is-watching-unlocked-shop | Islamic Story About Honesty When No One Is Watching: The Unlocked Shop |
| everyday | 0 | i-keep-missing-fajr-because-of-my-work | I keep missing Fajr because of my work schedule. What can I do? |
| everyday | 1 | my-job-sometimes-makes-me-miss-friday-prayer | My job sometimes makes me miss Friday prayer (Jumu‘ah). What should I do? |
| everyday | 2 | how-can-my-husband-and-i-disagree-without | How can my husband and I disagree without it turning into anger and days of silence? |
| everyday | 3 | i-lose-my-temper-with-my-children-and | I lose my temper with my children and regret it every night. How do I change? |
| everyday | 4 | is-it-allowed-to-take-a-bank-loan | Is it allowed to take a bank loan with interest (riba) to buy a house? |
| everyday | 5 | my-income-is-small-is-there-any-point | My income is small. Is there any point in giving charity — and do I even owe zakat? |
| everyday | 6 | my-parents-want-me-to-marry-someone-i | My parents want me to marry someone I do not like. What does Islam actually say? |
| everyday | 7 | how-can-i-control-my-anger-quickly-a | How Can I Control My Anger Quickly? A Calm Islamic Guide |
| everyday | 8 | how-do-i-stay-consistent-with-my-prayers | How Do I Stay Consistent with My Prayers? A Practical Islamic Guide |
| everyday | 9 | i-have-some-savings-but-no-idea-how | I have some savings but no idea how zakat works. How do I calculate what I owe? |
| everyday | 10 | pray-on-time-at-work-guide | How Can I Pray on Time at Work? A Practical Guide for Busy Muslims |
| everyday | 11 | halal-income-practical-guide | How Can I Make Sure My Income Is Halal? A Practical Guide |
| everyday | 12 | balance-deen-dunya-busy-schedule | How Can I Balance Deen and Dunya with a Busy Schedule? A Practical Guide |
| everyday | 13 | break-social-media-addiction-guide | How Can I Break My Social Media Addiction? A Practical Islamic Guide |
| everyday | 14 | stop-backbiting-gossip-guide | How Can I Stop Backbiting and Protect Myself from Gossip? A Practical Islamic Guide |
| everyday | 15 | meaningful-dua-practical-guide | How Can I Make My Duas More Heartfelt and Meaningful? A Practical Islamic Guide |
| everyday | 16 | cope-grief-loss-islamic-guide | How Can I Cope with Grief and Loss? A Gentle Islamic Guide |
| everyday | 17 | income-halal-job-touches-haram | How Do I Keep My Income Halal When My Job Touches Haram? A Practical Guide |
| everyday | 18 | stop-jealousy-overcome-hasad | How Can I Stop Being Jealous of Others? An Islamic Guide to Overcoming Hasad |
| everyday | 19 | dealing-difficult-relatives-islamic-guide | How Do I Deal with Difficult Relatives Without Breaking Family Ties? An Islamic Guide |
| everyday | 20 | managing-kids-screen-time-islamic-guide | How Can I Manage My Kids' Screen Time? A Practical Islamic Guide for Parents |
| everyday | 21 | keeping-promises-islamic-guide | How Can I Become Someone Who Keeps Their Promises? An Islamic Guide |
| everyday | 22 | overcome-laziness-prayer-work-islamic-guide | How Can I Overcome Laziness in Prayer and Work? A Practical Islamic Guide |
