// Here I created variables for DB queries related to reviews
// Easier to maintain

const reviewColumns = `(
    companyid, 
    username, 
    userpictureurl, 
    pros, 
    cons, 
    overall, 
    totalrating, 
    ratingcriteriainterview, 
    ratingcriteriaonboarding, 
    ratingcriteriasupervision, 
    ratingcriterialearning, 
    ratingcriteriacodingpractices, 
    ratingcriteriaperks, 
    ratingcriteriaculture, 
    salary, 
    duration, 
    coverletter, 
    cv,
    upvotes,
    upvoteusers,
    downvotes,
    downvoteusers)`;

const updateScoreColumns = `averageTotalScore = ($1),
averageinterviewscore = ($2),
averageonboardingscore = ($3),
averagesupervisionscore = ($4),
averagelearningscore = ($5),
averagecodingpracticesscore = ($6),
averageperksscore = ($7),
averageculturescore = ($8)`;

const updateReviewColumns = `
userName = ($1),
userPictureURL = ($2),
pros = ($3),
cons = ($4),
overall =  ($5),
totalRating = ($6),
ratingCriteriaInterview = ($7),
ratingCriteriaOnboarding = ($8),
ratingCriteriaSupervision = ($9),
ratingCriteriaLearning = ($10),
ratingCriteriaCodingPractices = ($11),
ratingCriteriaPerks = ($12),
ratingCriteriaCulture = ($13),
salary = ($14),
duration = ($15),
coverLetter =($16),
cv = ($17),
upvotes = ($18),
upvoteusers = ($19),
downvotes = ($20),
downvoteusers = ($21)`;

export default {
        reviewColumns,
        updateScoreColumns,
        updateReviewColumns
};