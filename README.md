# React19-Newhooks-Fingerprintjs

Sandbox app for React 19 new hooks and Fingerprintjs simulation

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

### The Challenge/User Stories

The goal of this project was to create a modern, scalable web application using PayloadCMS and Next.js 15. Users needed a seamless experience managing content through a developer-first CMS while interacting with a fast, responsive frontend. The app had to support secure form submissions (including file uploads), efficient content management, and real-time updates—ideal for building apps like a Todo manager or contact platform. This solution empowers developers to rapidly integrate PayloadCMS into new or existing projects with clean architecture and ease of customization.

### Screenshot

![](/public/screenshot-desktop.png)

### Links

- Solution URL: [https://github.com/traez/payload-headless-cms3](https://github.com/traez/payload-headless-cms3)
- Live Site URL: [https://payload-headless-cms3.vercel.app/](https://payload-headless-cms3.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox and CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- Typescript
- Nodejs
- Tailwind CSS  
- payload  
- nextjs-toploader  
- sharp  

### What I learned

**1 Next.js Routing**   
**Route Groups**: Folders with parentheses like `/(age)` create Route Groups that organize your folder structure without affecting the URL path
Route groups help you organize routes, create specific layouts, and split your application into logical sections
Example: `/(age)/about` still appears as `/about` in the URL  

**2 Installation Best Practices**  
**Start Fresh**: Avoid adding Payload to an existing Next.js app as it requires many error-prone setting adjustments. Always start with a fresh Payload installation that embeds itself in a Next.js app.  
**Package Managers**: PayloadCMS uses npx for initial setup, then pnpm for development work. Adhering to this standard provides the best developer experience.  
**PostgreSQL with Supabase**: When using Supabase, connect through the Transaction Pooler (port 6543). The direct connection (port 5432) doesn't work properly.  

**3 Setup Procedure**  
1 Run `npx create-payload-app` to start (this replaces `npx create-next-app@latest my-next-app`), which gives you a Next.js app optimized for Payload.  
2 During installation, select your necessary options.  
3 Add your Supabase project connection string. Compulsorily from a new project as it will wipe and rewrite database.  
4 Open the project and run `pnpm run dev` to complete the first table migration.  
5 Add Tailwind CSS manually following the documentation, but use the existing styles.css instead of globals.css.  

**4 Project Structure**  
`(frontend)` and `(payload)` route groups separate frontend and backend concerns
`/admin` route is where clients log in when you're working as a web developer/freelancer
**Collections**: Groups of records (Documents) that share a common schema, stored in the database based on defined Fields

**5 Dependencies**  
**Transitive Dependencies**: Some packages (like Drizzle) are available in your project even without being listed in package.json because they're required by explicitly included packages
Example: `@payloadcms/db-postgres` automatically brings in Drizzle-related packages  
**Key Dependencies**:
- `sharp` (0.32.6): High-performance image processing library for handling image uploads and resizing. Necessary when using Next Image component and deploying on platforms outside Vercel.
- `cross-env` (^7.0.3): Allows defining environment variables across different OS platforms

**6 Docker Integration**   
Docker files are part of the deployment infrastructure, separate from application dependencies
GitHub detects Dockerfiles as a distinct language, but they are not runtime dependencies
In development, you can work without Docker, but for production, `docker build` creates an optimized image

**7 Tailwind CSS V4**  
`wrap-break-word` in Tailwind 4 is equivalent to `break-words` in Tailwind 3. Same for many other Tailwind utility classes. Always confirm. 

**8 Next.js App Router Features**  
Use `revalidatePath('/')` and `redirect('/')` for navigation and cache management
Import redirect with: `import { redirect } from "next/navigation"`

**9 Data Access Approaches**  
In dynamic routes (e.g., `todos/[id]/page.tsx`), you can use either Payload API or REST API:
- **Payload API (Direct)**: Preferred for server-side operations, offering better performance without HTTP overhead
- **REST API**: Best for client-side code, maintaining clear separation between frontend and backend

**10 Configuring Vercel Blob Storage with Payload CMS**  
## Key Resources
- [Payload CMS Storage Adapters Documentation](https://payloadcms.com/docs/upload/storage-adapters)
- [How to Configure File Storage in Payload with Vercel Blob, R2, and Uploadthing](https://payloadcms.com/posts/guides/how-to-configure-file-storage-in-payload-with-vercel-blob-r2-and-uploadthing)
- [Vercel Blob Documentation](https://vercel.com/docs/vercel-blob)

## Important Steps
1. Install the adapter: `pnpm add @payloadcms/storage-vercel-blob`
2. **Critical**: Run `pnpm generate:importmap` after installation
3. Without this, you'll get: "Payload CMS can't find the VercelBlobClientUploadHandler component in its import map"
4. This applies to all Payload plugins (`@payloadcms/plugin-form-builder`, etc.)
5. Configure in your Payload config file with your `BLOB_READ_WRITE_TOKEN`

**11 Troubleshooting**  
For build errors like "UnhandledSchemeError: Reading from 'cloudflare:sockets' is not handled by plugins", check the workaround in [GitHub issue #12197](https://github.com/payloadcms/payload/issues/12197#issuecomment-2869524711)

### Continued development

- More projects; increased competence!

### Useful resources

Stackoverflow  
YouTube  
Google  
ChatGPT

## Author

- Website - [Zeeofor Technologies](https://zeeofortech.vercel.app/)
- Twitter - [@trae_z](https://twitter.com/trae_z)

## Acknowledgments

-Jehovah that keeps breath in my lungs
