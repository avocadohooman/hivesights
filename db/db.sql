-- CREATE DATABASE perntodo;

-- Work in progress
CREATE TABLE company (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    companyName VARCHAR (256) NOT NULL,
    companyDescription VARCHAR NOT NULL,
    logoURL VARCHAR NOT NULL,
    companyURL VARCHAR (256) NOT NULL,
    companyLocation VARCHAR (256) NOT NULL,
    averageTotalScore FLOAT,
    averageInterviewScore FLOAT,
    averageOnboardingScore FLOAT,
    averageSupervisionScore FLOAT,
    averageLearningScore FLOAT,
    averageCodingPracticesScore FLOAT,
    averagePerksScore FLOAT,
    averageCultureScore FLOAT,
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
    averageTotalScore FLOAT,
    averageInterviewScore FLOAT,
    averageOnboardingScore FLOAT,
    averageSupervisionScore FLOAT,
    averageLearningScore FLOAT,
    averageCodingPracticesScore FLOAT,
    averagePerksScore FLOAT,
    averageCultureScore FLOAT,
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

SELECT (totalrating, ratingCriteriaInterview, ratingCriteriaOnboarding, ratingCriteriaSupervision),
 AVG (totalrating)::NUMERIC(10,2), 
 AVG (ratingCriteriaInterview)::NUMERIC(10,2), 
 AVG (ratingCriteriaOnboarding)::NUMERIC(10,2), 
 AVG (ratingCriteriaSupervision)::NUMERIC(10,2), 
 AVG (ratingCriteriaCulture)::NUMERIC(10,2) 
 FROM review_test 
 WHERE companyid = 'd33044ec-8f36-4631-ad8c-2d349eb745b8'
 GROUP BY review_test.totalrating, review_test.ratingcriteriainterview, review_test.ratingCriteriaOnboarding, review_test.ratingCriteriaSupervision;

SELECT 
AVG (totalrating)::NUMERIC(10,2)
FROM review_test WHERE companyid = 'd33044ec-8f36-4631-ad8c-2d349eb745b8' GROUP BY;
