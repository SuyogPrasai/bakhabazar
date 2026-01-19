

<h1 className="text-3xl md:text-4xl font-bold font-sans" align="center">BakhaBazar</h1>
<div align="center">

[![Donate](https://img.shields.io/badge/_-Donate-red.svg?logo=githubsponsors&labelColor=555555&style=for-the-badge)](Collaborators.md#collaborators "Donate")
![GitHub License](https://img.shields.io/github/license/suyogprasai/Bakhabazar?style=for-the-badge&logoColor=white)
[![Commits](https://img.shields.io/github/commit-activity/m/suyogprasai/bakhabazar?label=commits&style=for-the-badge)](https://github.com/suyogprasai/bakhabazar/commits "Commit History")
[![Last Commit](https://img.shields.io/github/last-commit/suyogprasai/bakhabazar/main?label=&style=for-the-badge&display_timestamp=committer)](https://github.com/suyogprasai/bakhabazar/pulse/monthly "Last activity")
</div>
<div align="center">
  
<img 
  src="github_images/logo.jpg" 
  align="center" 
  width="300"
  alt="Bakhabazar Logo"
/>
</div>

## Table of Contents

- [Introduction](#introduction)
- [Installation and Usage](#installation-and-usage)
- [Features](#features)
- [Installation](#installation)
- [Documentation](#documentation)
- [Contribution](#contribution)

## Introduction

**Bakhabazar** is a AI powered automated podcast social media system which allows for people to listen/ make create amazing stories with just a click of a button. We feature an amazing frontend UI built in NextJS + OpenAI powered text to speech, and speech to text features integrated into the system.  

<br><br>
[![Featured Image](github_images/featured_image.png)](https://youtu.be/s3P97ylnI3A)
<p align="center"><i>Click the image for video of the site</i></p>

# Our Features
Bakhabazar's main goal is to protect and conserve the local stories and legends spoken at streets of Kathmandu, focusing mainly on now forgetting lores and stories from different communities. We collect these stories,and we generate AI powered podcasts to broadcast them to the entire world.

## Key Functionalities

- **Human-Like Voice in Podcasts with emotions**  
  Generate expressive, natural-sounding podcasts using emotionally rich voice synthesis for immersive listening experiences.

- **Manual entry of Stories and Legends**  
  Create, edit, and publish original stories and legends with complete creative control and flexibility.

- **Complete Login and SignUp functionality**  
  Securely register, authenticate, and manage user accounts with reliable and seamless access controls.

- **Spotify-like audio control and features**  
  Enjoy intuitive audio playback with play, pause, seek, skip, and queue management features.

- **Social Media platform for interactivity between useres**  
  Facilitate user engagement through likes, comments, shares, follows, and interactive content discovery tools.

## Installation

To properly install Bakhabazar, you first need to download this repo in your computer, and also have npm installed. After doing that you need to clone the frontend repo using the script `./frontend.sh`. 

After which you need to add all the nescessary environemnt variables for the frontend and backend. And finally you need to setup n8n backend along with openAI api keys, and then do `docker compose up -d`

The installation procedure for this next js application is simple. You can follow the steps below to run a sample of this code in your machine. 
<brs>
> **Prerequesites**
> You need to make sure that you have node and npm installed in your local machine for running this, also make sure to have docker installed for running other componemts


  1. **Clone the Repository**
```bash
git clone https://github.com/suyogprasai/bakhabazar
```
2. **Install the Required Dependecies**
```bash
npm install
```
3. **Run the server on your Machine**
```bash
npm run dev
```

There are five things of which you need to be careful about during this installation. First, the two .env files for the Backend. Then the .env file for the frontend. And Finally, the docker_compose.yml and n8n configuration files. Each one of these components must be carefully considered, or you will likely run into an error.


Here is an example for how the .envs and other files are structured
```
.
├── bakhabazar/
│   ├── postgres_keys.env
│   ├── .env
│   └── ...other files
├── frontend/
│   └── .env
├── docker-compose.yml
└── n8n_config.json
```

For Development of frontend you need to turn off the frontend from the docker compose and run the fontend through npm directly. Also, make sure to access it with the webserver ( you may need to modify the docker compose ). We ran into a ton of errors for this one.


## Documentation

Bakhabazar is made primarily as a two server system with next js acting as the main frontend for the website with wordpress as the headless cms for content management of the site. This allows us for using proper management and segregation of the data and the system. 

<br/>

![Featured Image](/github_images/architecture.svg)



> [!IMPORTANT]
> Whether you have feedback on features, have encountered any bugs, or have suggestions for enhancements, we're eager to hear from you. Your insights help us make the Bakhabazar more robust and user-friendly.


## Contribution

You can make pull requests to the repo and you should also follow the proper guidelines of github and the community for making the commits. Make sure to follow the code convention so far. The code will be reiviewed and if does good will be implemented in the system.
