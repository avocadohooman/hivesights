-- CREATE DATABASE perntodo;

-- Work in progress
CREATE TABLE review (
    id SERIAL PRIMARY KEY,
    pros TEXT [],
    cons TEXT[],
    overall VARCHAR NOT NULL,
    totalRating INT,
    ratingCriteriaInterview INT NOT NULL,
    ratingCriteriaOnboarding INT NOT NULL,
    ratingCriteriaSupervision INT NOT NULL,
    ratingCriteriaCodingPractices INT NOT NULL,
    ratingCriteriaPerks INT NOT NULL,
    ratingCriteriaCulture INT NOT NULL,
    salary INT,
    duration INT NOT NULL,
    coverLetter VARCHAR (256),
    cv VARCHAR (256),
    published_date timestamp DEFAULT CURRENT_TIMESTAMP
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE
);

-- Work in progress
CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    companyName VARCHAR (256) NOT NULL,
    logoURL VARCHAR NOT NULL,
    companyURL VARCHER (256) NOT NULL,
    companyLocation VARCHAR (256) NOT NULL,
    averageReviews INT,
    averageSalaries INT,
    interviews INT
);

-- Work in progress
CREATE TABLE user (
 
);