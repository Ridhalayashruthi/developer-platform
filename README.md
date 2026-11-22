#### DevToolkit Hub — Client-Side Dev Tools, Interview Prep & Career Roadmaps

An all-in-one, privacy-first web platform built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS** that brings together 7 browser-based developer utilities, a searchable technical interview Q&A bank, interactive career roadmaps, and AI prompt engineering tools.

- **Live Production App:** [https://devtoolkit-hub.vercel.app](https://devtoolkit-hub.vercel.app)
- **GitHub Repository:** [https://github.com/Ridhalayashruthi/developer-platform](https://github.com/Ridhalayashruthi/developer-platform)

#### Core Modules & Features

#### 1. 7 Client-Side Developer Utilities (/tools)

All tools execute 100% locally inside browser memory with zero backend logging:

- **JSON Formatter & Validator:** Real-time syntax validation, formatting, minification, and line numbers.
- **JWT Decoder:** Inspect header, payload claims, and expiration timestamps locally.
- **UUID v4 Generator:** Bulk cryptographically random identifier generation via crypto.randomUUID().
- **Base64 Encoder / Decoder:** Instant UTF-8 safe text encoding and decoding.
- **Color Picker & Converter:** Live HEX, RGB, HSL, and CSS custom property conversion.
- **JavaScript Regex Tester:** Real-time ECMAScript pattern testing with flag controls and live match extraction.
- **Cryptographic Password Generator:** CSPRNG password generation (crypto.getRandomValues) with customizable entropy.

#### 2. Interactive Interview Preparation (/interview)

- Topic-filtered and searchable Q&A bank covering **React, JavaScript, TypeScript, System Design, and DSA** with expandable explanations and syntax-highlighted code snippets.

#### 3. Developer Career Roadmaps (/roadmaps)

- Interactive milestone checklists with live completion progress tracking across **Frontend Engineer, Backend & APIs, DevOps & Cloud, and AI Application Engineer** tracks.

#### 4. AI Engineering Hub (/ai)

- Real-time client-side **LLM Token & Context Estimator** paired with copy-ready prompts for code reviews, unit testing, SQL optimization, and system design.

#### 5. Technical SEO & Trust Architecture

- Automated 15-route sitemap.xml, robots.txt, OpenGraph metadata, and dedicated /about, /privacy-policy, and /terms pages.

#### Tech Stack

- **Framework:** Next.js 16 (App Router) & React 19
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4, shadcn/ui primitives & Lucide Icons
- **Architecture:** Feature-based modular folder structure (src/features/\*)
- **Deployment:** Vercel CI/CD

#### Getting Started Locally

#### bash

git clone https://github.com/Ridhalayashruthi/developer-platform.git
cd developer-platform
npm install
npm run dev
