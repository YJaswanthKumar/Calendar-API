# Kraftshala Assignment Calendar-API

## Calendar booking service
## 1. Objective

### Goal

Build a backend calendar booking service that schedules meetings while preventing overlapping time slots.

### Deliverables

REST API using **Node.js, Express, Sequelize, and SQL** that supports:

* User registration and authentication
* Creating and fetching users
* Creating, listing, updating, and deleting meetings
* Enforcing strict no-overlap booking rules

---

## 2. Technology Stack

* Node.js
* JavaScript
* Express
* Sequelize ORM
* SQL Database (PostgreSQL / MySQL / SQLite)
* JWT Authentication

---

## 3. Database Schema

### Users

| Column    | Type           | Constraints       |
| --------- | -------------- | ----------------- |
| id        | INTEGER / UUID | Primary Key       |
| name      | STRING         | Required          |
| email     | STRING         | Required, Unique  |
| password  | STRING         | Required (hashed) |
| createdAt | DATETIME       | Auto              |
| updatedAt | DATETIME       | Auto              |

---

### Meetings

| Column    | Type           | Constraints   |
| --------- | -------------- | ------------- |
| id        | INTEGER / UUID | Primary Key   |
| userId    | INTEGER / UUID | FK → users.id |
| title     | STRING         | Required      |
| startTime | DATETIME       | Required      |
| endTime   | DATETIME       | Required      |
| createdAt | DATETIME       | Auto          |
| updatedAt | DATETIME       | Auto          |

---

## 4. Relationship

```
User.hasMany(Meeting)
Meeting.belongsTo(User)
```

---

# API Specifications

## API 1 — Register User

**POST /users/register**

### Request

```json
{
  "name": "Alice Johnson",
  "email": "alice@test.com",
  "password": "pass123"
}
```

| Scenario       | Status | Response                 |
| -------------- | ------ | ------------------------ |
| Missing fields | 400    | Required fields missing  |
| Email exists   | 400    | Email already registered |
| Success        | 201    | User object              |

---

## API 2 — Login User

**POST /users/login**

### Request

```json
{
  "email": "alice@test.com",
  "password": "pass123"
}
```

| Scenario            | Status | Response            |
| ------------------- | ------ | ------------------- |
| Missing fields      | 400    | Email/password req. |
| Invalid credentials | 401    | Invalid credentials |
| Success             | 200    | JWT token returned  |

**Success Response Example**

```json
{
  "token": "<JWT_TOKEN>"
}
```

---

## API 3 — Get User

**GET /users/:id**

| Scenario  | Status | Response       |
| --------- | ------ | -------------- |
| Not found | 404    | User not found |
| Success   | 200    | User object    |

---

## API 4 — Create Meeting

**POST /meetings**

### Headers

```
Authorization: Bearer <JWT_TOKEN>
```

### Request

```json
{
  "userId": 1,
  "title": "Interview",
  "startTime": "2026-02-10T10:00:00.000Z",
  "endTime": "2026-02-10T10:30:00.000Z"
}
```

| Scenario     | Status | Response                         |
| ------------ | ------ | -------------------------------- |
| Invalid time | 400    | startTime must be before endTime |
| Conflict     | 400    | Time slot already booked         |
| Success      | 201    | Meeting object                   |

---

## API 5 — List Meetings

**GET /meetings**

### Headers

```
Authorization: Bearer <JWT_TOKEN>
```

Optional query params:

* userId
* startDate
* endDate

**200 Response**

```json
[
  {
    "id": 1,
    "userId": 1,
    "title": "Interview",
    "startTime": "...",
    "endTime": "..."
  }
]
```

---

## API 6 — Get Meeting

**GET /meetings/:id**

| Scenario  | Status | Response          |
| --------- | ------ | ----------------- |
| Not found | 404    | Meeting not found |
| Success   | 200    | Meeting object    |

---

## API 7 — Update Meeting

**PUT /meetings/:id**

### Headers

```
Authorization: Bearer <JWT_TOKEN>
```

### Request

```json
{
  "userId": 1,
  "title": "Updated Meeting",
  "startTime": "2026-02-10T11:00:00.000Z",
  "endTime": "2026-02-10T11:30:00.000Z"
}
```

| Scenario     | Status | Response                         |
| ------------ | ------ | -------------------------------- |
| Not found    | 404    | Meeting not found                |
| Conflict     | 400    | Time slot already booked         |
| Invalid time | 400    | startTime must be before endTime |
| Success      | 200    | Updated meeting object           |

---

## API 8 — Delete Meeting

**DELETE /meetings/:id**

| Scenario  | Status | Response          |
| --------- | ------ | ----------------- |
| Not found | 404    | Meeting not found |
| Success   | 204    | No content        |

---

## 5. Validation Rules

* `startTime` must precede `endTime`
* Required fields enforced
* Conflict checks before create/update
* Auth token required for protected routes

---

## 6. Project Structure

```
src/
  modules/
    meeting/
    user/
  middlewares/
  config/
  utils/
  app.js
  server.js
```

---

## 7. Running Locally

### Install

```
npm install
```

### Environment

```
PORT=3000
DB_URL=<connection_string>
JWT_SECRET=<secret_key>
```

### Migrate

```
npx sequelize-cli db:migrate
```

### Start

```
npm run dev
```
