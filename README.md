# School Timetable

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Running with Docker Compose

The easiest way to run this project is using Docker Compose:

1. Make sure you have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your system.

2. Clone this repository:
```bash
git clone <repository-url>
cd school-timetable
```

3. Copy the `.env.example` file to create your `.env` file and add your Gemini API key:
```bash
cp .env.example .env
```

Then edit the `.env` file and replace `your-gemini-api-key-here` with your actual Gemini API key:
```bash
GOOGLE_API_KEY=your-gemini-api-key-here
```

4. Build and start the containers using Docker Compose:
```bash
docker compose up --build
```

This command will:
- Build the Docker image for the application
- Start the container
- Map port 3000 on your host to port 3000 in the container
- Mount the project directory into the container for live development

5. Access the application:
Once the containers are running, you can access the application at:
```
http://localhost:3000
```

6. To stop the application:
```bash
docker compose down
```

### Development with Docker Compose

The Docker setup includes volume mounting, which means any changes you make to the source code will be reflected in the running container. The Next.js development server will automatically reload when you make changes.
