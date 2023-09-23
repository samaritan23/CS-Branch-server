# cs-branch-server
Backend for Branch International's customer messaging web app

## 🖥️ Tech Stack

**Backend:**

![Node JS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)&nbsp;
![HTML5](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)&nbsp;
![JWT](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink)&nbsp;
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)&nbsp;

**Database:**

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)&nbsp;

## 📖 Prerequisites

In order to run the project you need `node>=16` and `npm>=8` installed on your machine.

## 🚩 Getting Started

### 1. Clone the `cs-branch-server` repository:

```bash
git clone https://github.com/samaritan23/cs-branch-server.git
```

### 2. Navigate into repo:
```bash
cd cs-branch-server
```

### 3. Rename `.env_example` into `.env` and put all credentials:

```bash
PORT=5000
MONGO_URI="YOUR_MONGO_CONNECTION_URL"
JWT_SECRET="YOUR_JWT_SECRET"
JWT_EXPIRE=2d
```

### 4. Install package dependencies (node>=16 and npm>=8 needed):
Run the following command once in the server and client directories to install the necessary dependencies

```bash
npm install # Server dependencies
```

### 4. Run project:
In the `cs-branch-server` directory, open a terminal session and run:

```bash
npm run server
```
