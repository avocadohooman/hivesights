-- CREATE DATABASE perntodo;

-- Work in progress
CREATE TABLE company (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    companyName VARCHAR (256) NOT NULL,
    companyDescription VARCHAR NOT NULL,
    logoURL VARCHAR NOT NULL,
    companyURL VARCHAR (256) NOT NULL,
    companyLocation VARCHAR (256) NOT NULL,
    averageReviews FLOAT,
    averageSalaries FLOAT,
    interviews INT
);

-- Company table for running tests
CREATE TABLE company_test (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    companyName VARCHAR (256) NOT NULL,
    companyDescription VARCHAR NOT NULL,
    logoURL VARCHAR NOT NULL,
    companyURL VARCHAR (256) NOT NULL,
    companyLocation VARCHAR (256) NOT NULL,
    averageReviews FLOAT,
    averageSalaries FLOAT,
    interviews INT
);

-- Work in progress
CREATE TABLE review (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    companyId uuid NOT NULL,
    userName VARCHAR (256) NOT NULL,
    userPictureURL VARCHAR (256) NOT NULL,
    pros TEXT [],
    cons TEXT [],
    overall VARCHAR NOT NULL,
    totalRating FLOAT,
    ratingCriteriaInterview FLOAT NOT NULL,
    ratingCriteriaOnboarding FLOAT NOT NULL,
    ratingCriteriaSupervision FLOAT NOT NULL,
    ratingCriteriaLearning FLOAT NOT NULL,
    ratingCriteriaCodingPractices FLOAT NOT NULL,
    ratingCriteriaPerks FLOAT NOT NULL,
    ratingCriteriaCulture FLOAT NOT NULL,
    salary FLOAT,
    duration FLOAT NOT NULL,
    coverLetter VARCHAR (256),
    cv VARCHAR (256),
    published_date timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES company(id) ON DELETE CASCADE
);

-- Review table for running tests
CREATE TABLE review_test (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    companyId uuid NOT NULL,
    userName VARCHAR (256) NOT NULL,
    userPictureURL VARCHAR (256) NOT NULL,
    pros TEXT [],
    cons TEXT [],
    overall VARCHAR NOT NULL,
    totalRating FLOAT,
    ratingCriteriaInterview FLOAT NOT NULL,
    ratingCriteriaOnboarding FLOAT NOT NULL,
    ratingCriteriaSupervision FLOAT NOT NULL,
    ratingCriteriaLearning FLOAT NOT NULL,
    ratingCriteriaCodingPractices FLOAT NOT NULL,
    ratingCriteriaPerks FLOAT NOT NULL,
    ratingCriteriaCulture FLOAT NOT NULL,
    salary FLOAT,
    duration FLOAT NOT NULL,
    coverLetter VARCHAR (256),
    cv VARCHAR (256),
    published_date timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES company_test(id) ON DELETE CASCADE
);