import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "var(--space-9) var(--space-5)",
        textAlign: "center",
      }}
    >
      {/* Inline SVG: a sliced onion. ~150px tall, simple. */}
      <svg
        viewBox="0 0 120 120"
        width="120"
        height="120"
        style={{ margin: "0 auto var(--space-6)" }}
        aria-hidden="true"
      >
        {/* Outer onion */}
        <ellipse cx="60" cy="60" rx="50" ry="55" fill="#FFE0CC" stroke="#FF6B00" strokeWidth="2" />
        {/* Slice line */}
        <line x1="20" y1="60" x2="100" y2="60" stroke="#FF6B00" strokeWidth="2" />
        {/* Inner rings */}
        <ellipse cx="60" cy="60" rx="35" ry="38" fill="none" stroke="#FF6B00" strokeWidth="1" opacity="0.4" />
        <ellipse cx="60" cy="60" rx="20" ry="22" fill="none" stroke="#FF6B00" strokeWidth="1" opacity="0.3" />
        <ellipse cx="60" cy="60" rx="8" ry="9" fill="none" stroke="#FF6B00" strokeWidth="1" opacity="0.2" />
        {/* Highlight */}
        <ellipse cx="40" cy="35" rx="6" ry="3" fill="white" opacity="0.4" />
      </svg>
      <h1
        style={{
          fontSize: "var(--fs-4xl)",
          marginBottom: "var(--space-4)",
        }}
      >
        Page not found
      </h1>
      <p
        style={{
          color: "var(--text-soft)",
          fontSize: "var(--fs-lg)",
          marginBottom: "var(--space-6)",
        }}
      >
        We cut here. We cut there. But we couldn&apos;t find this page.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          background: "var(--color-orange-500)",
          color: "white",
          padding: "var(--space-3) var(--space-6)",
          borderRadius: "var(--radius-pill)",
          fontWeight: 600,
        }}
      >
        Back to home
      </Link>
    </div>
  );
}
