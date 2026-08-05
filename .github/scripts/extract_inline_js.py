#!/usr/bin/env python3
"""Extract inline <script> bodies (non-src) from an HTML file so they can be
syntax-checked with `node --check`. Writes the combined JS to stdout.

Usage: python3 extract_inline_js.py path/to/file.html
"""
import re
import sys


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: extract_inline_js.py <html-file>", file=sys.stderr)
        return 1

    src = open(sys.argv[1], encoding="utf-8").read()
    scripts = re.findall(
        r'<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>',
        src, re.DOTALL | re.IGNORECASE
    )
    sys.stdout.write("\n;\n".join(scripts))
    return 0


if __name__ == "__main__":
    sys.exit(main())
