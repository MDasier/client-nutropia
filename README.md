
# NUTROPIA 
## [Abre la app!](https://nutropia.netlify.app)

![App Logo](https://nutropia.netlify.app/assets/logopeque-DDSpl9Xh.png)

## Description
The APP for your nutrition consultation. Manage medical appointments, messages and patient lists quickly and easily.

#### [Client](https://github.com/MDasier/client-nutropia)
#### [Server](https://github.com/MDasier/server-nutropia)

## Technologies & Libraries used

HTML, CSS, Javascript, React, Axios, React Context, Bootstrap, React-Calendar, Cloudinary, Nodemailer, MondoDB, Express, Node, Mongoose...

## Backlog Functionalities

Future tech-funcionability: Implement 'Socket.io' for instant messages.

# Client Structure
## User Stories
- NotFound - 'Tipical 404 - Page not found' 
- HomePage - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- Signup - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- Login - As a user I want to be able to log in on the webpage so that I can get back to my account
- Logout - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- InfoPage - As a user I want to be able to know about the app



## Client Routes
## React Router Routes (React App)

| Path                        | Page               |  Permissions                          | Behavior                                                      |
| --------------------------- | -------------------| ------------------------------------  | ------------------------------------------------------------  |
| `/`                         | Home               |  public                               | Home page                                                     |
| `/signup`                   | Signup             |  public                               | Signup form                                                   |
| `/login`                    | Login              |  public                               | Login form                                                    |
| `/perfil/:userId`           | Profile            |  user only                            | Navigate to login after logout, expire session                |
| `/info`                     | Info               |  public                               | Shows info page                                               |
| `/forget`                   | ForgetPassword     |                                       | Form for get an email to reset password                       |
| `/reset-password/:token`    | ResetPassword      |  user only                            | Form for reset password                                       |
| `/alimentos`                | ListaAlimentos     |  public                               | Serach foods for make diets                                   |
| `/control-pacientes`        | ListaUsuarios      |  Admin or Nutricionistas access only  | List of users to manage premissions                           |
| `/agenda`                   | Citas              |  Nutricionistas or Pacientes          | Shows all dates                                               |
| `/nueva-cita/:pacienteId`   | CrearCita          |  Nutricionistas only                  | Create date                                                   |
| `/mensajes/:id`             | ListaMensajes      |  Pacientes only                       | List of messages                                              |
| `/nuevo-mensaje/:pacienteId`| CrearMensaje       |  Nutricionistas only                  | Create messages                                               |
| `/pacientes/:pacienteId`    | DetallesPaciente   |  Nutricionistas only                  | Shows all details from a patient                              |
| `/*`                        | NotFound           |  public                               | Shows Not found page while an error occurs                    |


  
## Context
- auth.context (All info from a logged user)
  
### Project
[Repository Link Client](https://github.com/MDasier/client-nutropia)
[Repository Link Server](https://github.com/MDasier/server-nutropia)

### Slides
[Slides Link](https://docs.google.com/presentation/d/1Bet4KJOQ9EM7SXLSm5I0N1cHcoJFe-wz4bcz9D3E3Ng/edit?usp=sharing)