# PiStudios Website Workflow

## Golden Rule
All changes to the pistudios.app website **must** go through a Pull Request.

Direct pushes to `main` are forbidden.

## Restore Point
Current working state is tagged:
`working-state-20260629`

To restore:
```bash
git checkout working-state-20260629
git push origin main --force-with-lease
```

## Process
1. Create a branch from `main` (`git checkout -b feature/your-change`)
2. Make changes
3. Open Pull Request to `main`
4. Merge only after review/approval
5. Tag new stable states when the site is working

## Location
All work happens in:
`/workspace/PiStudios/Web Development/pistudios-website/`

No stray clones allowed anywhere else.
