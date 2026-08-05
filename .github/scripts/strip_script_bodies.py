#!/usr/bin/env python3
"""Blank out inline <script> bodies (non-src) in an HTML file before running
it through an HTML-only validator. libxml2's HTML parser doesn't special-case
<script> content, so it misreads things like `</div>` inside JS template
literals as real closing tags and reports bogus "Unexpected end tag" errors.
JS correctness should be checked separately (see extract_inline_js.py).

Writes the stripped HTML to stdout.

Usage: python3 strip_script_bodies.py path/to/file.html
"""
import re
import sys


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: strip_script_bodies.py <html-file>", file=sys.stderr)
        return 1

    src = open(sys.argv[1], encoding="utf-8").read()
    stripped = re.sub(
        r'(<script(?![^>]*\bsrc=)[^>]*>)([\s\S]*?)(</script>)',
        lambda m: m.group(1) + m.group(3),
        src, flags=re.IGNORECASE
    )
    sys.stdout.write(stripped)
    return 0


if __name__ == "__main__":
    sys.exit(main())
