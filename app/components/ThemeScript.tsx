/**
 * ThemeScript — runs synchronously before paint to set `data-theme` on <html>
 * based on localStorage. Defaults to "light". Prevents flash of wrong theme.
 */
export function ThemeScript() {
  const code = `
(function() {
  try {
    var stored = localStorage.getItem('sabxi-theme');
    var theme = (stored === 'light' || stored === 'dark') ? stored : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
