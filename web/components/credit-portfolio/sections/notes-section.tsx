import { BookOpen, Info } from "lucide-react";

export function NotesSection() {
  return (
    <section className="panel footnotes" aria-labelledby="notes-heading">
      <div className="section-head">
        <p className="eyebrow">Notes</p>
        <h2 id="notes-heading" className="section-head__title">
          <BookOpen className="cp-icon cp-icon--section" aria-hidden />
          <span>Context behind the numbers</span>
        </h2>
      </div>
      <ul className="footnote-list">
        <li>
          <Info className="cp-icon cp-icon--footnote" aria-hidden />
          <span>KTC statements use a shared credit limit of THB 360,000 across both KTC cards.</span>
        </li>
        <li>
          <Info className="cp-icon cp-icon--footnote" aria-hidden />
          <span>
            CardX statements each show THB 219,000, but that limit may be shared rather than
            additive.
          </span>
        </li>
        <li>
          <Info className="cp-icon cp-icon--footnote" aria-hidden />
          <span>
            Status labels use April 19, 2026 as the reference date, not today in a moving browser
            session.
          </span>
        </li>
      </ul>
    </section>
  );
}
