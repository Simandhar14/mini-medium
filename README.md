# Mini Medium

This project effectively replicates a **mini Medium-like blogging platform**, featuring authentication, blog posting functionality, loading skeletons for improved user experience, and a robust tech stack optimized for modern web development.

## Website Preview

## Features of the Project

- **User Interface:**
  - Users can browse available blog posts, view details, and create new posts.
  - The interface features a clean and minimalistic design for seamless reading and writing experiences.
  - Users must log in to access the platform, and new users can sign up for an account.
  - The interface incorporates user authentication.
  - Loading skeletons enhance the user experience by providing visual feedback during content loading.

## Tech Stack

- **PostgreSQL:**
  - PostgreSQL serves as the database management system, storing various data related to blog posts, such as titles, content, timestamps, and user details. Its relational database structure ensures efficient querying and management of structured data.

- **React:**
  - React is utilized for building the frontend of the blog platform. It enables the creation of an interactive user interface, allowing users to seamlessly browse through available blog posts, read content, and interact with the platform’s features. React's component-based architecture facilitates the development of reusable UI components, ensuring consistency and efficiency across the website.

- **TypeScript:**
  - TypeScript enhances the development process by providing static type checking, making the code more robust and maintainable. It helps catch potential errors during development, improving the overall reliability of the project.

- **Hono:**
  - Hono is used as a lightweight and high-performance web framework for handling backend logic. It provides efficient API endpoints for frontend-backend interaction, ensuring a fast and responsive experience for users.

- **Cloudflare Workers:**
  - Cloudflare Workers are used for deploying the project, ensuring scalability and global accessibility. By leveraging Cloudflare’s edge computing capabilities, the platform benefits from reduced latency and enhanced performance.

## Contribute to the Project

- Take a look at the existing [Issues]<!--(https://github.com/Simandhar14/mini-medium)--> or [create a new issue]<!--(https://github.com/Simandhar14/mini-medium/issues/new/choose)-->!
- [Fork the Repo]<!--(https://github.com/Simandhar14/mini-medium/fork)-->, create a branch for any issue that you are working on and commit your work.
- Create a **[Pull Request]<!--(https://github.com/Simandhar14/mini-medium/compare)-->** (_PR_), which will be promptly reviewed and given suggestions for improvements by the community.
- Add screenshots or screen captures to your Pull Request to help us understand the effects of the changes that are included in your commits.
## How to Contribute ?

**1.** Start by making a fork of the [**mini-medium**]<!--(https://github.com/Simandhar14/mini-medium)--> repository. Click on the fork  symbol at the top right corner.

**2.** Clone your new fork of the repository:

```bash
git clone https://github.com/<your-github-username>/mini-medium
```

**3.** Set upstream command:

```bash
git remote add upstream https://github.com/Simandhar14/mini-medium.git
```

**4.** Navigate to the new project directory:

```bash
cd mini-medium
```

**5.** Create a new branch:

```bash
git checkout -b YourBranchName
```

**6.** Sync your fork or local repository with the origin repository:

- In your forked repository click on "Fetch upstream"
- Click "Fetch and merge".

### Alternatively, Git CLI way to Sync forked repository with origin repository:

```bash
git fetch upstream
```

```bash
git merge upstream/main
```

### [Github Docs](https://docs.github.com/en/github/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github) for Syncing

**7.** Make your changes to the source code.

**8.** Stage your changes and commit:

```bash
git add .
```

```bash
git commit -m "<your_commit_message>"
```

**9.** Push your local commits to the remote repository:

```bash
git push origin YourBranchName
```

**10.** Create a [Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)!

**11.** **Congratulations!** You've made your first contribution! 🙌🏼
