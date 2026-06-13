(function () {
  "use strict";

  function truncateHash(hash) {
    if (!hash || hash.length < 20) return hash || "Pending release";
    return hash.slice(0, 8) + "…" + hash.slice(-8);
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  async function copyText(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      const prev = button.textContent;
      button.textContent = "Copied";
      setTimeout(function () {
        button.textContent = prev;
      }, 1400);
    } catch (_err) {
      button.textContent = "Copy failed";
    }
  }

  function renderWindowsBlock(windows) {
    var hash = windows.sha256;
    var hashHtml = hash
      ? '<code class="hash-value" title="' +
        escapeHtml(hash) +
        '">' +
        escapeHtml(truncateHash(hash)) +
        '</code> <button type="button" class="hash-copy" data-copy="' +
        escapeHtml(hash) +
        '">Copy</button>'
      : '<span class="hash-pending">Checksum temporarily unavailable.</span>';

    var vt =
      windows.virustotal && hash
        ? ' · <a href="' +
          escapeHtml(windows.virustotal) +
          '" rel="noopener noreferrer">VirusTotal</a>'
        : "";

    return (
      '<p class="hash-line">' +
      '<span class="hash-label">Windows SHA-256</span> ' +
      hashHtml +
      vt +
      "</p>"
    );
  }

  function renderAndroidRecommended(android) {
    var variants = android.variants || [];
    var rec =
      variants.find(function (v) {
        return v.id === android.recommended;
      }) || variants[0];
    if (!rec) return "";

    var hash = rec.sha256;
    var hashHtml = hash
      ? '<code class="hash-value" title="' +
        escapeHtml(hash) +
        '">' +
        escapeHtml(truncateHash(hash)) +
        '</code> <button type="button" class="hash-copy" data-copy="' +
        escapeHtml(hash) +
        '">Copy</button>'
      : '<span class="hash-pending">Checksum temporarily unavailable.</span>';

    var vt =
      rec.virustotal && hash
        ? ' · <a href="' +
          escapeHtml(rec.virustotal) +
          '" rel="noopener noreferrer">VirusTotal</a>'
        : "";

    return (
      '<p class="hash-line">' +
      '<span class="hash-label">Android SHA-256 (' +
      escapeHtml(rec.label) +
      ")</span> " +
      hashHtml +
      vt +
      "</p>"
    );
  }

  function renderAndroidVariants(android) {
    var rows = (android.variants || [])
      .map(function (v) {
        var hash = v.sha256;
        var hashCell = hash
          ? '<code class="dl-hash" title="' +
            escapeHtml(hash) +
            '">' +
            escapeHtml(truncateHash(hash)) +
            '</code><button type="button" class="hash-copy hash-copy-sm" data-copy="' +
            escapeHtml(hash) +
            '">Copy</button>'
          : '<span class="hash-pending">TBD</span>';

        var vt = v.virustotal
          ? '<a class="dl-vt" href="' +
            escapeHtml(v.virustotal) +
            '" rel="noopener noreferrer">VT</a>'
          : "";

        return (
          "<tr>" +
          '<td class="dl-abi"><strong>' +
          escapeHtml(v.label) +
          "</strong><span>" +
          escapeHtml(v.hint) +
          "</span></td>" +
          '<td class="dl-action"><a class="btn btn-ghost btn-sm" href="' +
          escapeHtml(v.url) +
          '" rel="noopener noreferrer">Download</a></td>' +
          '<td class="dl-hash-cell">' +
          hashCell +
          " " +
          vt +
          "</td>" +
          "</tr>"
        );
      })
      .join("");

    return (
      '<details class="dl-variants">' +
      "<summary>All Android builds by CPU (5 APKs, smaller per device)</summary>" +
      '<p class="dl-variants-lead">Most users should use <strong>Universal</strong> above. Pick a split APK only if you want a smaller download for a specific phone or emulator.</p>' +
      '<div class="dl-table-wrap"><table class="dl-table">' +
      "<thead><tr><th>Build</th><th></th><th>SHA-256</th></tr></thead>" +
      "<tbody>" +
      rows +
      "</tbody></table></div>" +
      '<p class="dl-variants-foot"><a href="' +
      escapeHtml(android.releasesPage) +
      '" rel="noopener noreferrer">Full release notes on GitHub</a></p>' +
      "</details>"
    );
  }

  function bindCopyButtons(root) {
    root.querySelectorAll(".hash-copy").forEach(function (btn) {
      btn.addEventListener("click", function () {
        copyText(btn.getAttribute("data-copy"), btn);
      });
    });
  }

  function applyDownloads(data) {
    var winBtn = document.getElementById("btn-download-windows");
    var androidBtn = document.getElementById("btn-download-android");
    var hashesEl = document.getElementById("downloads-hashes");
    var androidExtra = document.getElementById("downloads-android-extra");

    if (winBtn && data.windows) {
      winBtn.href = data.windows.url;
      winBtn.textContent = "Download for " + data.windows.label;
    }

    if (androidBtn && data.android) {
      var rec =
        data.android.variants.find(function (v) {
          return v.id === data.android.recommended;
        }) || data.android.variants[0];
      if (rec) {
        androidBtn.href = rec.url;
        androidBtn.textContent = "Download for Android (" + rec.label + " .apk)";
      }
    }

    if (hashesEl) {
      hashesEl.innerHTML =
        renderWindowsBlock(data.windows) +
        renderAndroidRecommended(data.android) +
        '<p class="hashes-hint"><strong>Security check:</strong> Compare the downloaded file hash with the official signature above using your system tools (like <code>Get-FileHash</code> on Windows).</p>';
      bindCopyButtons(hashesEl);
    }

    if (androidExtra && data.android) {
      androidExtra.innerHTML = renderAndroidVariants(data.android);
      bindCopyButtons(androidExtra);
    }

    document.querySelectorAll('meta[property="og:description"]').forEach(function (el) {
      if (data.release) {
        el.setAttribute(
          "content",
          "Official site: VibranceFlow " +
            data.release +
            " for Windows and Android. Verify SHA-256, pair over Wi-Fi. Open source."
        );
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    fetch("/downloads.json", { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("manifest missing");
        return res.json();
      })
      .then(applyDownloads)
      .catch(function () {
        console.warn("downloads.json not loaded; using static fallbacks in HTML");
      });
  });
})();
