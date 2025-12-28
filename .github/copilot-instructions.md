# Copilot / AI Agent Quick Instructions

Purpose: Help AI agents be immediately productive in this repo by documenting local conventions, run/debug instructions, and code examples based on discoverable patterns.

## Quick start (dev & build)
- Dev: `npm install` then `npm start` (Create React App - `react-scripts start`). See `package.json`.
- Build for production: `npm run build` -> `build/` contains hashed assets.
- Tests: `npm test` (CRA/Jest runner).

## Big picture
- React single-page app bootstrapped with Create React App.
- Key folders:
  - `src/pages/` – route targets (Home, Login, Profile, ForumDetails, etc.)
  - `src/components/` – shared UI and route guards (`ProtectedRoute`, `AdminProtectedRoute`)
  - `src/admin/` – admin area components (dashboard, users, categories, posts)
  - `src/api/api.js` – central axios instance used for all HTTP calls
- Routing: `src/App.js` branches between admin routes (no `Layout`) and public routes (wrapped in `Layout`).

## API & Auth (critical)
- `src/api/api.js` exports an axios instance with `baseURL` set to `http://127.0.0.1:8000/api` and an interceptor that attaches `Authorization: Bearer <token>` when `localStorage.token` exists. Update this file to point to other environments.
- Authentication state: `localStorage.token` (string) and `localStorage.user` (JSON). Admin checks use `user.role === 'admin'` (see `src/components/AdminProtectedRoute.js`).
- Example: `api.get('/admin/categories')` will include auth token automatically.

## UI & notifications
- Uses `react-bootstrap` for UI components (e.g., `Modal`, `Form`) and `react-toastify` for notifications.
- `ToastContainer` is mounted in `src/index.js`.
- Pattern: API errors and results are surfaced via `toast.error(...)` / `toast.success(...)` across pages.

## Patterns & conventions (examples)
- Stateful modal pattern: pass `show`, `handleClose`, and `refresh` props to child modals (see `src/admin/AddPostModal.js`). After successful post, call `refresh()` to reload parent list.
- Protected routes: `ProtectedRoute` redirects to `/login` if `localStorage.token` missing.
- Admin area: Admin routes use `AdminProtectedRoute` to verify `user.role === 'admin'`.
- API payload naming: follow backend fields (example: AddPost uses `{ title, category_id }`).

## Notable issues found (actionable)
- In `src/App.js`, the admin posts route renders `<Ad />` but there is no `Ad` import. It likely should import & use `src/admin/AdminPosts.js` (component name `AdminPosts`). Fix: replace `<Ad />` with `<AdminPosts />` and add the import.

## When adding features
- Use the central `api` instance in `src/api/api.js` for network calls so tokens are applied consistently.
- Put new routes in `src/App.js`, add pages under `src/pages/` for public pages or `src/admin/` for admin-only pages.
- Use `ProtectedRoute` / `AdminProtectedRoute` wrappers when appropriate.

## Files to look at first
- `package.json` (scripts)
- `src/api/api.js` (base URL, auth interceptor)
- `src/App.js` (routing & admin vs public layout behavior)
- `src/components/ProtectedRoute.js` and `AdminProtectedRoute.js` (auth guards)
- `src/admin/AddPostModal.js` (typical CRUD UI pattern)

## Contact / follow-ups
- If anything relies on a backend change or environment variable, note that `baseURL` is hard-coded here; adjust `src/api/api.js` when switching environments.

---
If you'd like, I can (1) open a PR with the fix to `src/App.js` and this instruction file, or (2) expand any section with concrete code examples or an FAQ for common tasks. Which do you prefer?