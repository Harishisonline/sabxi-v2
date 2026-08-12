"use client";

import { useState } from "react";
import styles from "./form.module.css";

const MAX_BODY = 500;

export function ReviewForm() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = name.trim().length > 0 && rating > 0 && body.trim().length > 0 && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    // STUB: no persistence. We just simulate a delay and show success.
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSubmitted(true);
    setName("");
    setRating(0);
    setBody("");
    setTimeout(() => setSubmitted(false), 5000);
  }

  if (submitted) {
    return (
      <div className={styles.success} role="status" aria-live="polite">
        <div className={styles.successIcon} aria-hidden="true">✓</div>
        <h3 className={styles.successTitle}>Thanks for your review!</h3>
        <p className={styles.successText}>
          We’ll publish your review once our team has a quick look. Look for it on
          this page soon.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label className={styles.field}>
        <span className={styles.fieldLabel}>Your name</span>
        <input
          type="text"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
          placeholder="e.g. Priya S."
          required
        />
      </label>

      <fieldset className={styles.field}>
        <legend className={styles.fieldLabel}>Your rating</legend>
        <div
          className={styles.stars}
          role="radiogroup"
          aria-label="Star rating, 1 to 5 stars"
          onMouseLeave={() => setHover(0)}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={`${styles.star} ${(hover || rating) >= n ? styles.starOn : ""}`}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              aria-checked={rating === n}
              role="radio"
            >
              ★
            </button>
          ))}
          <span className={styles.starHint}>
            {rating ? `${rating} of 5 stars` : "Tap to rate"}
          </span>
        </div>
      </fieldset>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>Your review</span>
        <textarea
          className={styles.textarea}
          value={body}
          onChange={(e) => setBody(e.target.value.slice(0, MAX_BODY))}
          maxLength={MAX_BODY}
          rows={5}
          placeholder="What did you order? How was the freshness, the speed, the cut quality?"
          required
        />
        <span className={styles.counter}>
          {body.length} / {MAX_BODY}
        </span>
      </label>

      <button type="submit" className={styles.submit} disabled={!canSubmit}>
        {submitting ? "Submitting..." : "Submit review"}
      </button>

      <p className={styles.legal}>
        By submitting, you agree we may publish this review on sabxi.com after
        moderation. This is a demo — your review is NOT persisted.
      </p>
    </form>
  );
}
