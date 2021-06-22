// React Libraris
import React, { useEffect, useState } from 'react';

// Components
import KeyIndicator from '../KeyIndicators/KeyIndicator';
import CompanySubRatings from './CompanySubRatings';
import CompanyReviewsWrapper from '../Reviews/CompanyReviewsWrapper';

// Data models 
import { Company } from '../../models/companyModel';
import { NewReview, Review } from '../../models/reviewModel';
import { User } from '../../models/userModel';

// API services
import companyApi from '../../services/companyApi';
import reviewApi from '../../services/reviewApi';

// CSS styles
import '../../styles/company.css';
import '../../styles/companyDetailView.css'

// UI Libraries

// Assets



const CompanyDetailView = ({
        id,
        currentUser
    } : {
        id: string
        currentUser: User
    }): JSX.Element => {

    const [company, setCompany] = useState<Company[]>();
    const [reviews, setReviews] = useState<Review[]>()

    const durationLabel = 'Duration';
    const salaryLabel = 'Salary';
    const ratingLabel = 'Total Score';
    
    useEffect(() => {
        const getOneCompany = async () => {
            try {
                const company: Company[] = await companyApi.getOneCompany(id);
                setCompany(company);
            } catch (error: any) {
                console.log(error);
            }
        }
        const getCompanyReviews = async () => {
            try {
                const reviews: Review[] = await reviewApi.getCompanyReviews(id);
                reviews.sort(function(a: Review, b: Review) {
                    return  new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
                });
                setReviews(reviews);
            } catch (error) {
                console.log(error);
            }
        }
        getOneCompany();
        getCompanyReviews();
    }, []);

    const handleVoting = async (id: string, updatedReview: NewReview) => {
        try {
            const review = await reviewApi.updateReview(id, updatedReview);
            reviews?.find(item => {
                console.log('Found item?', item);
                if (item.id === id) {
                    item.upVoteUsers = updatedReview.upVoteUsers;
                    item.upVotes += 1;
                    item.downVotes = updatedReview.downVotes;
                    item.downVoteUsers = updatedReview.downVoteUsers;
                }
                console.log("Updated review", item);
            });
            console.log('Handle Voting, after PUT call', reviews);
            setReviews(reviews);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {company &&
                <div className="companyDetailViewKeyInfoWrapper">
                    <div className="oneCompanyLogoWrapper">
                        <img className="oneCompanyLogoBig" src={company[0]?.logoURL}></img>

                        <div className="oneCompanyNameBig">
                            <a href={company[0]?.companyURL}> {company[0]?.companyName}</a>
                        </div>
                        <div className="oneCompanyLocation">
                            {company[0]?.companyLocation}
                        </div>

                    </div>
                    <KeyIndicator average={true} keyIndicator={company[0].averageSalaries} label={salaryLabel}/>
                    <KeyIndicator average={true}  keyIndicator={company[0].averageTotalScore} label={ratingLabel}/>
                    <KeyIndicator average={true}  keyIndicator={company[0].averageDuration} label={durationLabel}/>
                </div>
            }
            {company && <CompanySubRatings company={company}/>}
            {reviews && <CompanyReviewsWrapper currentUser={currentUser} handleVoting={handleVoting} reviews={reviews}/>}
        </div>
    )
}

export default CompanyDetailView;