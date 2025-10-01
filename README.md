## Crypsol Frontend (Next.js)

Yeh repository Crypsol Rust backend ke liye Next.js frontend provide karta hai. Signup/login flows backend ke `/api/v1/users` endpoints se integrate kiye gaye hain.

### Environment Variables

Frontend ko backend se connect karne ke liye `.env.local` create karein:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

Production ke liye appropriate base URL set karein. Trailing slash auto remove ho jayega.

### Development Setup

```
npm install
npm run dev
```

App default taur par `http://localhost:3000` par run karega. Login/signup backend ke saath tabhi kaam kareinge jab backend server chal raha ho.

### Available Pages

- `/` – Landing page jahan se signup/login navigation milta hai.
- `/signup` – React Hook Form + Zod ke saath signup form.
- `/login` – Login form jo successful response par token local storage me store karta hai.
- `/dashboard` – Placeholder protected page (middleware token check karta hai).

### Tech Stack Highlights

- Next.js 15 (App Router)
- TailwindCSS 4 design tokens
- Axios instance for API calls (`src/lib/http.ts`)
- Jotai for lightweight auth state
- react-hook-form + zod validation

### Lint/Test

- `npm run lint`
- (future) Tests configure karne ke liye Playwright/React Testing Library add kiye ja sakte hain.
