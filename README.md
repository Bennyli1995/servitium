# Servitium

## Simplifying home services for senior citizens

### Inspiration
Our inspiration for Servitium comes from a deep commitment to enhancing the lives of senior citizens by providing a centralized hub for essential services tailored to their unique needs.

### What it does
Servitium serves as a comprehensive service hub specifically designed for senior citizens. It streamlines access to various services, making daily tasks and support more accessible and efficient.

Demo link: https://www.youtube.com/watch?v=zf_Y6b9uc1c&ab_channel=Kai

Users are provided with a user-friendly interface for finding services that fit their needs. The application also supports the use of natural language to find services (e.g., users can enter "I would like to find an affordable plumber" in the home search bar).

Users can also leave reviews for service providers, making it easier for other users to find the service providers that best suit their needs.

### How we built it
Our platform integrates user-friendly interfaces and secure backend systems to ensure a seamless experience for both users and service providers.

- **Front-end:** React
- **Back-end:** Node.js, MongoDB
- **Authentication:** Auth0
- **APIs used:** OpenAI, Google Maps, Google Places, Nodemailer, Twilio

### Challenges we ran into
- Integrating OpenAI's API to the client-side of the application
- Integrating Nodemailer into the back-end of the application

### Accomplishments that we're proud of
- Integrating AI into our stack - users can use natural language to find services
- Connecting back-end and front-end of our application
- Making use of Auth0 to provide authentication
- Introducing real-time texting and emailing notification features

### What we learned
- Using third-party APIs
- Full-stack development (working on both the server and the client side)
- How to set up and leverage MongoDB

### What's next for Servitium
- Setting up the service provider side of the application since the application currently only supports the client-side
- Retrieving more data on the service provider side (e.g., geolocation)

---

## Installation and Setup Instructions

### Backend
1. Navigate to the `backend` folder.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the server.

### Frontend
1. Navigate to the `frontend` folder.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to launch the application.

Once both the backend and frontend servers are running, you can access the application at `localhost:5173`.

## Contact

- Nariman Muldashev - muldashev11@gmail.com
- Benny Li - chengqi1@ualberta.ca
- Kai Groden-Gilchrist - kaigg@live.ca

Devpost Link: https://devpost.com/software/servitium?ref_content=my-projects-tab&ref_feature=my_projects


