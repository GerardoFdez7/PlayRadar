<p align="center">
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/>
  </a>
  <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/nextjs/nextjs-icon.svg" alt="nextjs" width="40" height="40"/>
  </a>
  <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/>
  </a>  
  <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
    <img src="https://cdn.creazilla.com/icons/3254431/tailwindcss-icon-icon-lg.png" alt="tailwind" width="55" height="40"/>
  </a>   
  <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/>
  </a>
  <a href="https://www.prisma.io/" target="_blank" rel="noreferrer">
    <img src="https://cdn.worldvectorlogo.com/logos/prisma-3.svg" alt="prisma" width="40" height="40"/>
  </a>
  <a href="https://storybook.js.org/" target="_blank" rel="noreferrer">
    <img src="https://cms.digitalpolygon.com/sites/default/files/2022-07/storybook-logo.png" alt="storybook" width="40" height="40"/>
  </a>
  <a href="https://oauth.net/2/" target="_blank" rel="noreferrer">
    <img src="https://oauth.net/images/oauth-logo-square.png" alt="oauth" width="40" height="40"/>
  </a>
  <a href="https://nodejs.org/en" target="_blank" rel="noreferrer">
    <img src="https://upload.vectorlogo.zone/logos/nodejs/images/eca9ff97-5734-46c4-b8a1-621819eaeaa9.svg" alt="nodejs" width="50" height="50"/>
  </a>
  <a href="https://www.npmjs.com/" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/npmjs/npmjs-ar21.svg" alt="npm" width="60" height="40"/>
  </a>
  <a href="https://vercel.com/" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg" alt="vercel" width="40" height="40"/>
  </a>
  <a href="https://cloudinary.com/" target="_blank" rel="noreferrer">
    <img src="https://appexchange.salesforce.com/image_host/54d359f8-a104-40ee-b94c-91488f80db81.png" alt="cloudinary" width="60" height="40"/>
  </a>
  
</p>

# PlayRadar

Scroll, click, play… repeat!

PlayRadar is a fullstack project, the ultimate hub for discovering the next video game you'll love. My website taps into an extensive API boasting millions of video games, offering you personalized recommendations and a dynamic way to explore new titles. Whether you're a casual gamer or a hardcore enthusiast, PlayRadar helps you stay ahead of the curve.

My unique content-based recommendation algorithm analyzes your gaming preferences and browsing habits, serving you tailored suggestions so you can always find that perfect next game to dive into.

## Table of Contents
- [Architecture](#architecture)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Development Environment](#development-environment)
  - [Production Environment](#production-environment)
- [Repository Rules](#repository-rules)
  - [ESLint Rules](#eslint-rules)
  - [Commit Rules](#commit-rules)
  - [Branch Rules](#branch-rules)


## Architecture
PlayRadar is built using the following architecture and technologies:

- Design Pattern: Unidirectional Data Flow
- Programming Language: TypeScript
- Framework: Next.js
- UI Library: React
- CSS Framework: Tailwind CSS
- Documentation & Testing: Storybook
- Authentication: OAuth 2.0
- Database: MongoDB
- ORM: Prisma
- Hosting: Vercel
- Image Hosting: Cloudinary
> [!NOTE]
> The Unidirectional Data Flow pattern ensures predictable state changes and makes debugging easier by providing a clear path for data throughout the application.

## Features
- Massive Game Database: Access millions of video games from a comprehensive REST API.
- Personalized Recommendations: My intelligent algorithm curates suggestions based on your interests.
- Seamless Navigation: Enjoy a smooth and interactive interface powered by Next.js and React.
- Modern Design: An engaging, user-friendly design that keeps you coming back for more.

## Getting Started

Follow these instructions to set up and run the PlayRadar application if you want:

### Development Environment

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/playradar.git
   cd playradar
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ````bash
   npm run dev

> [!TIP]
> The application will be available at http://localhost:3000

 > [!NOTE]
 > Alternatively, you can use Docker for development:

   ```bash
   npm run docker:dev
   ```
### Production Environment
To run the application in production mode:

```bash
npm run build
npm run start
```
> [!NOTE]
> Alternatively, you can use Docker for production:

```bash
npm run docker
```

## Repository Rules

### ESLint Rules

My codebase follows strict linting rules to ensure code quality and consistency:

- Base Rules:

  - No console logs in production code
  - Curly braces required for all control statements
  - Strict equality checks (=== and !==)

- TypeScript Rules:

  - No explicit any types
  - No non-null assertions
  - Proper promise handling
  - Unused variables must be prefixed with underscore

- Naming Conventions:
  - Variables: camelCase or PascalCase
  - Types/Interfaces: PascalCase
  - Functions: camelCase or PascalCase
> [!IMPORTANT]
> All code must pass ESLint checks before being committed.

### Commit Rules

I follow the Conventional Commits specification:

```plaintext
<type>: <description>
```

Supported types include: feat, fix, docs, style, refactor, test, chore, etc.

### Branch Rules

Branches must follow this naming convention:

```plaintext
<type>/<kebab-case-description>
```

Supported types include: feat, fix, docs, style, refactor, test, chore, etc.
