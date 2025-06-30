<div align="center">
  <br />
    <a href="https://sarojbartaula.com" target="_blank">
      <img src="https://github.com/user-attachments/assets/427fbdad-f63e-44f5-a350-87c98a33bb49" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Sanity.io-red?style=for-the-badge&logoColor=white&logo=sanity&color=f77769" alt="sanity.io" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>

  <h3 align="center">Saroj's Personal Blog</h3>

  <div align="center">
   A personal blog website to showcase the blogs written by Saroj Bartaula. Built this project as an open-source for whoever wants to fork and build their blog website from this repo.
  </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">🤖 Introduction</a>

Built with Next.js for handling the user interface, Sanity.io for dynamic content, EmailJS for handling the emails, and styled with TailwindCSS, this blog website demonstrates the developer's skills in a unique manner that creates a lasting impact. The website has light and dark theme which further enhances the beauty and design of the website.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- Email JS
- Next Themes
- Tailwind CSS
- Sanity.io

## <a name="features">🔋 Features</a>

👉 **Hero Section**: Introduced the author of the blogs for this website.

👉 **Highlighted Blogs**: Prominent display of some of the most highlighted blogs ever written.

👉 **Recent Blogs**: A few list of recent blogs and separate blog section where all the blogs are listed and the explore categories options to display the blogs based on their categories.

👉 **Sanity.io Implementation**: Utilized headless CMS of sanity.io to deliver the blogs and categories to the frontend dynamically.

👉 **Responsiveness**: Seamless adaptability across all devices, ensuring optimal viewing experience for every user.

and many more, including code architecture and reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/ujstha/saroj-blog.git
cd saroj-blog
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
NEXT_PUBLIC_RECIPIENT_NAME=your_name_to_send_email
NEXT_PUBLIC_RECIPIENT_EMAIL=your_email_used_to_send_email
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=your_sanity_dataset
```

Replace the placeholder values with your EmailJS, Sanity, and Sentry credentials. You can obtain EmailJS credentials by signing up on the [EmailJS website](https://www.emailjs.com/).
You can obtain Sanity credentials by signing up on the [Sanity website](https://www.sanity.io/).

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## Stripe Setup

Create a `.env` file in your project root with the following:

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_BASE_URL=https://yourdomain.com  # or http://localhost:3000 for local
```

Replace `sk_test_...` with your Stripe secret key. The base URL should match your deployment or local dev URL.
