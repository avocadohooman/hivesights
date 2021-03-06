# Hivesights
Hivesights is an open-source platform where Hivers can rate their internship experience, and share it with fellow Hivers.

The goal is to collectively create 'Hivesights' in order to help future Hivers to land their dream internship position, and learn from fellow Hivers. 

It also should help to create more transparency and allow companies to learn as well. However, the reviews are only accessible by Hivers. Companies can request an anonymous report.

Hivers can rate their experience based on certain rating criteria, can share their salary and can share the duration of the internship. 

Hivesights will calculate the averages of all submitted reviews, so Hivers can see at one glance the average total score, salary and durations of all internships.

Hivers can also become contributors and learn through this open-source projcet modern web development skills, to prepare themselves for job applications as web developer.

The overall vision of Hivesights is to tackle the 'valley of death' between completing Hive's inner circle and landing the first internship, by preparing Hivers for the job market. 

## Version 1.0 (release August 2021)

- Key Performance Indicators: 
  - Average Total Score 
  - Average Salary
  - Average Duration
- Hivers can read reviews 
- Hiver can read company profiles
- Hivers can write reviews
- Hivers can delete their own review
- Hivers can up-or downvote reviews

## Future Development Ideas

- Sparring feature for mock-up interviews
- Peer-to-peer CV or resume feedback
- Company represenantatives can access an anonymous report of the reviews
- Semantic data analytics of reviews
- Hiver job profile (tech stack, strengths, projects) that can be easily shared with companies
- ...and hopefully more ideas :-)

## Tech Stack
- **Language:** Typescript
- **Database:** PostgreSQL
- **Frameworks:** NodeJs - Express - React
- **Libraries:** Material UI
- **Internal API:** REST
- **oAuth:** 42

## CI/CD Pipeline
- **Testing:** Jest Backend Integration Testing
- **Deployment:** Heroku Deployment
- **Version Tagging:** github-tag-action

## App Preview (development environment with fake data for testing purposes)
> IMPORTANT: The images below are using fake data used for the development environment and DO NOT represent real reviews/scores. The chosen companies 
> and scores are completely arbitrary and were soly chosen for testing purposes!
### Landing Page With A Sneak Peek (Top Rated Companies)
![landing](./README_assets/hivesights_landing.gif?raw=true)
### Main Page
![main](./README_assets/hivesights_main.gif?raw=true)
### Company Detail View
![detail](./README_assets/hivesights_detail.gif?raw=true)
### Adding A Review
![addReview](./README_assets/hivesights_add_review.gif?raw=true)
### Embedded Feedback Collection
![feedback](./README_assets/hivesights_feedback.gif?raw=true)


