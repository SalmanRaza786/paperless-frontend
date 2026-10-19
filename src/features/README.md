# Feature-Based Architecture Guidelines

Place domain-specific features inside `src/features/<feature-name>/`.

Each feature should follow this internal layout:
```text
src/features/<feature-name>/
├── api/             # Feature-specific API queries, mutations, or endpoints
├── components/      # Feature-specific components (e.g., DocumentCard, UploadModal)
├── hooks/           # Feature-specific custom React hooks
├── types/           # Feature-specific TypeScript interfaces/types
└── index.ts         # Public interface exported to the rest of the application
```

Rules:
1. Cross-feature imports should strictly use the public interface (`@/features/<feature-name>`).
2. General-purpose, non-domain components belong in `src/components/ui/` or `src/components/common/`.
