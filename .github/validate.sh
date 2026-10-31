#!/bin/bash

# HTML Validation
echo "🔍 Running HTML validation..."
for file in 10-websites/*.html; do
  echo "Checking $file..."
  xmllint --html --noout "$file" 2>&1 | grep -v "parser warning"
done

# JavaScript Linting
echo -e "\n📋 Running ESLint..."
npx eslint 10-websites/ --ext .js,html --no-eslintrc --config .eslintrc.json || true

echo -e "\n✅ Validation complete!"
