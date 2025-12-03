# DevEvent

**The best events for developers you mustn't miss.**

[Live Demo](https://dev-events-eosin.vercel.app/)

DevEvent is a modern web application designed to help developers discover and book technical events. This project serves as a playground and demonstration of the latest features in **Next.js 16**, including advanced caching mechanisms and Server Actions, built with a premium, aesthetic UI.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & Custom WebGL (LightRays)
- **Image Management:** [Cloudinary](https://cloudinary.com/)
- **Analytics:** [PostHog](https://posthog.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## ✨ Key Features & Learnings

This project was built to explore and implement cutting-edge Next.js 16 concepts:

### 1. Next.js 16 Caching (`use cache`)

Leveraging the new `use cache` directive and `cacheLife` API to optimize data fetching.

- **Implementation:** See `app/page.tsx` where `cacheLife("hours")` is used to cache event data, reducing database load and improving response times.

### 2. Server Actions

Moving away from traditional API routes for data mutations and fetching.

- **Implementation:** All database interactions (creating events, booking tickets) are handled via Server Actions in `lib/actions/`, ensuring type safety and reduced client-side bundle size.

### 3. Modern Aesthetic UI

- **Glassmorphism & Dark Mode:** A sleek, dark-themed UI with glass effects.
- **Interactive Animations:** Subtle micro-interactions using Framer Motion and a custom WebGL background effect (`LightRays`) that reacts to mouse movement.

### 4. Third-Party Integrations

- **Cloudinary:** For optimized image hosting and delivery.
- **PostHog:** For product analytics and user tracking.

## 🛠️ Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (Local or Atlas)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/dev-events.git
   cd dev-events
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add the following:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
   NEXT_PUBLIC_POSTHOG_HOST=your_posthog_host
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components (Hero, EventList, Navbar, etc.).
- `lib/`: Utility functions, database connection, and Server Actions.
- `database/`: Mongoose models and schemas.
- `public/`: Static assets.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

_Built with ❤️ by Nahid Hasan_
