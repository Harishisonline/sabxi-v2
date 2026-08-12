/**
 * ThemeScript — runs synchronously before paint to set `data-theme` on <html>
 * based on localStorage, falling back to prefers-color-scheme. Prevents FOUC.
 */
export function ThemeScript() {
  const code = `
(function() {
  try {
    var stored = localStorage.getItem('sabxi-theme');
    var theme;
    if (stored === 'light' || stored === 'dark') {
      theme = stored;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = 'dark';
    } else {
      theme = 'light';
    }
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
