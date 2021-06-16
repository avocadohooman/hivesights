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
    averageDuration FLOAT,
    interviews INT,
    reviews INT
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
    averageDuration FLOAT,
    interviews INT,
    reviews INT
);

-- Work in progress
CREATE TABLE review (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    companyId uuid NOT NULL,
    userName VARCHAR (256) NOT NULL,
    userPictureURL VARCHAR (256) NOT NULL,
    pros TEXT,
    cons TEXT,
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
    upVotes INT,
    upVoteUsers TEXT [],
    downVotes INT,
    downVoteUsers TEXT [],
    published_date timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES company(id) ON DELETE CASCADE
);

-- Review table for running tests
CREATE TABLE review_test (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    companyId uuid NOT NULL,
    userName VARCHAR (256) NOT NULL,
    userPictureURL VARCHAR (256) NOT NULL,
    pros TEXT,
    cons TEXT,
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
    upVotes INT,
    upVoteUsers TEXT [],
    downVotes INT,
    downVoteUsers TEXT [],
    published_date timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (companyId) REFERENCES company_test(id) ON DELETE CASCADE
);

SELECT * FROM review_test WHERE companyid = 'e3f9f26a-cd04-419a-b367-84e704adb419';

SELECT id FROM company_test WHERE companyname = 'Wunderdog';

SELECT * FROM review_test WHERE companyid = 'af2e0ee6-a2d0-4fe1-aad4-d183a4528429';

SELECT AVG (duration)::NUMERIC(10,2) FROM review_test WHERE companyid = 'eb8f599a-1479-40cf-9cf1-7fcc9e16de0a';