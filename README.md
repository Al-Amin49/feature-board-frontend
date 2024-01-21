# Introduction
 Feature Board project, a dynamic platform designed to streamline feature requests and enhance collaboration between users and administrators. The Feature Board serves as a central hub for users to propose, discuss, and vote on new features, allowing the community to actively contribute to the evolution of our product.

**Live Site:** https://feature-board1.netlify.app/

### Features
- **User Authentication :** Secure user authentication to ensure that only authorized users can submit features and access the admin portal.
- **Feture Submission :** Allow users to submit new feature requests with detailed descriptions and they cand edit and delete feature also.
- **Voting System :** Enable users to vote on their favorite features, providing valuable feedback
- **Sorting Option :** Created a different type of sorting option
- **Search option:** Authneticated user can search based on title and description
- **Pagination :** Pagination created for feature board
- **Error Handling :** Robust error handling and validation to maintain data integrity.
- **Admin Portal**
    - **User Management** Admin cand Delete User, Admin also can make admin any user
    - **Admin Home** In admin home will show overview of feature board.
    - **Manage Feature board** Where admin can change the status of the feature and also can delete the feature
### Technologies and Packages
**Technologies**
- Tailwind CSS
- React JS
- NodeJs
- ExpressJs
- MongoDB

**Packages**
- axios
- react-icon
- react-toastify
- react-hook-form
- rechart

### Code Link
Client side: https://github.com/Al-Amin49/feature-board-frontend
Server side: https://github.com/Al-Amin49/feature-board-backend

### Installation and Usage
1. Clone the repository
```bash
git clone https://github.com/Al-Amin49/feature-board-frontend

```
2. Install Dependencies
```bash
cd feature-board-frontend
npm install

```
3. Run the server
```
npm run dev
```

```
4. Create a .env.local file in the root of your project 
```
VITE_APIURL = Your_api_url
```
