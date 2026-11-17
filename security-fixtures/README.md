# Security scan fixtures

Deliberately unsafe, non-production fixtures used only to verify SuperQA
security scanning. Do not import, execute, publish, or deploy these files.

`vulnerable-dependencies/` contains deliberately outdated package versions for
dependency-scanner testing. Run scans against the fixture's lockfile; never run
or import the installed packages.
