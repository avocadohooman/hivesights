-- CREATE DATABASE perntodo;

-- Work in progress
CREATE TABLE review (
    id SERIAL PRIMARY KEY,
    companyId int NOT NULL,
    userName VARCHAR (256) NOT NULL,
    userPictureURL VARCHAR (256) NOT NULL,
    pros TEXT [],
    cons TEXT [],
    overall VARCHAR NOT NULL,
    totalRating INT,
    ratingCriteriaInterview INT NOT NULL,
    ratingCriteriaOnboarding INT NOT NULL,
    ratingCriteriaSupervision INT NOT NULL,
    ratingCriteriaLearning INT NOT NULL,
    ratingCriteriaCodingPractices INT NOT NULL,
    ratingCriteriaPerks INT NOT NULL,
    ratingCriteriaCulture INT NOT NULL,
    salary INT,
    duration INT NOT NULL,
    coverLetter VARCHAR (256),
    cv VARCHAR (256),
    published_date timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES company(id) ON DELETE CASCADE
);

-- Review table for running tests
CREATE TABLE review_test (
    id SERIAL PRIMARY KEY,
    companyId int NOT NULL,
    userName VARCHAR (256) NOT NULL,
    userPictureURL VARCHAR (256) NOT NULL,
    pros TEXT [],
    cons TEXT [],
    overall VARCHAR NOT NULL,
    totalRating INT,
    ratingCriteriaInterview INT NOT NULL,
    ratingCriteriaOnboarding INT NOT NULL,
    ratingCriteriaSupervision INT NOT NULL,
    ratingCriteriaLearning INT NOT NULL,
    ratingCriteriaCodingPractices INT NOT NULL,
    ratingCriteriaPerks INT NOT NULL,
    ratingCriteriaCulture INT NOT NULL,
    salary INT,
    duration INT NOT NULL,
    coverLetter VARCHAR (256),
    cv VARCHAR (256),
    published_date timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES company(id) ON DELETE CASCADE
);

-- Work in progress
CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    companyName VARCHAR (256) NOT NULL,
    companyDescription VARCHAR NOT NULL,
    logoURL VARCHAR NOT NULL,
    companyURL VARCHAR (256) NOT NULL,
    companyLocation VARCHAR (256) NOT NULL,
    averageReviews INT,
    averageSalaries INT,
    interviews INT
);

-- Company table for running tests
CREATE TABLE company_test (
    id SERIAL PRIMARY KEY,
    companyName VARCHAR (256) NOT NULL,
    companyDescription VARCHAR NOT NULL,
    logoURL VARCHAR NOT NULL,
    companyURL VARCHAR (256) NOT NULL,
    companyLocation VARCHAR (256) NOT NULL,
    averageReviews INT,
    averageSalaries INT,
    interviews INT
);