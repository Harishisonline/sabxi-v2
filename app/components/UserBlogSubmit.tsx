"use client";

import { useState } from "react";
import styles from "./UserBlogSubmit.module.css";

const MAX_BODY = 2000;

export function UserBlogSubmit() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = title.trim().length > 0 && body.trim().length > 0 && !submitting;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    // STUB: no persistence. We just simulate a delay and show success.
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSubmitted(true);
    setTitle("");
    setAuthor("");
    setBody("");
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <section className={styles.wrap} id="user-blog">
      <div className={styles.inner}>
        {submitted ? (
          <div className={styles.success} role="status" aria-live="polite">
            <div className={styles.successIcon} aria-hidden="true">✓</div>
            <h2 className={styles.successTitle}>Thanks for sharing your story!</h2>
            <p className={styles.successText}>
              We’ll publish your post on the SABXI blog once our team has a quick
              look. Look for it under /blog/ soon.
            </p>
          </div>
        ) : (
          <>
            <span className={styles.label}>Share your story</span>
            <h2 className={styles.title}>Got a SABXI moment?</h2>
            <p className={styles.desc}>
              Did SABXI make your week easier? Tell us how. We publish customer
              stories, kitchen wins, and recipe experiments on the SABXI blog.
            </p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Title</span>
                <input
                  type="text"
                  className={styles.input}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={100}
                  placeholder="e.g. How I cut my weekday cooking in half"
                  required
                />
              </label>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>Your name (optional)</span>
                <input
                  type="text"
                  className={styles.input}
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  maxLength={60}
                  placeholder="Leave blank to publish anonymously"
                />
              </label>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>Your story</span>
                <textarea
                  className={styles.textarea}
                  value={body}
                  onChange={(e) => setBody(e.target.value.slice(0, MAX_BODY))}
                  maxLength={MAX_BODY}
                  rows={8}
                  placeholder="What did you order? What did you cook? What surprised you?"
                  required
                />
                <span className={styles.counter}>
                  {body.length} / {MAX_BODY}
                </span>
              </label>

              <button type="submit" className={styles.submit} disabled={!canSubmit}>
                {submitting ? "Submitting..." : "Submit your story"}
              </button>

              <p className={styles.legal}>
                By submitting, you agree we may edit for clarity and publish on
                sabxi.com. This is a demo — your story is NOT persisted.
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
