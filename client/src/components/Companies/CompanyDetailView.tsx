// React Libraris
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import KeyIndicator from '../KeyIndicators/KeyIndicator';
import CompanySubRatings from './CompanySubRatings';
import CompanyReviewsWrapper from '../Reviews/CompanyReviewsWrapper';
import CreateReviewButton from '../Reviews/CreateReviewButton';
import CreateFirstReview from '../Reviews/CreateFirstReview';

// Data models 
import { Company } from '../../models/companyModel';
import { NewReview, Review, UpdatedReview } from '../../models/reviewModel';
import { User } from '../../models/userModel';

// API services
import companyApi from '../../services/companyApi';
import reviewApi from '../../services/reviewApi';

// CSS styles
import '../../styles/company.css';
import '../../styles/companyDetailView.css';

// UI Libraries
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { Alert, Skeleton } from '@material-ui/lab';

// Assets



const CompanyDetailView = ({
        id,
        currentUser
    } : {
        id: string
        currentUser: User
    }): JSX.Element => {

    const [company, setCompany] = useState<Company[]>();
    const [reviews, setReviews] = useState<Review[]>();

    const durationLabel = 'Duration';
    const salaryLabel = 'Salary';
    const ratingLabel = 'Total Score';
    
    const history = useHistory();

    const getOneCompany = async () => {
        const cachedCompany = JSON.parse(localStorage.getItem(`company-${id}`) as string);
        if (!cachedCompany) {
            try {
                const company: Company[] = await companyApi.getOneCompany(id);
                setCompany(company);
                localStorage.setItem(`company-${id}`, JSON.stringify(company));
            } catch (error: any) {
                console.log(error);
            }
        } else {
            setCompany(cachedCompany);
        }

    };

    const getCompanyReviews = async () => {
        const cachedCompanyReview = JSON.parse(localStorage.getItem(`companyReview-${id}`) as string);
        if (!cachedCompanyReview) {
            try {
                const reviews: Review[] = await reviewApi.getCompanyReviews(id);
                reviews.sort(function(a: Review, b: Review) {
                    return  new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
                });
                setReviews(reviews);
                localStorage.setItem(`companyReview-${id}`, JSON.stringify(reviews));
            } catch (error) {
                console.log(error);
            }
        } else {
            setReviews(cachedCompanyReview);
        }
    };

    useEffect(() => {
        getOneCompany();
        getCompanyReviews();
        const intervalId = setInterval(() => {
            updateCacheCompany();
            updateCacheCompanyReview();
        }, 90000)
        return () => clearInterval(intervalId);
    }, []);


    const updateCacheCompany = async () => {
        try {
            const company: Company[] = await companyApi.getOneCompany(id);
            setCompany(company);
            localStorage.removeItem(`company-${id}`);
            localStorage.setItem(`company-${id}`, JSON.stringify(company));
        } catch (error: any) {
            console.log(error);
        }
    }

    const updateCacheCompanyReview = async () => {
        try {
            const reviews: Review[] = await reviewApi.getCompanyReviews(id);
            reviews.sort(function(a: Review, b: Review) {
                return  new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
            });
            setReviews(reviews);
            localStorage.removeItem(`companyReview-${id}`);
            localStorage.setItem(`companyReview-${id}`, JSON.stringify(reviews));
        } catch (error) {
            console.log(error);
        }
    }

    const handleVoting = async (id: string, updatedReview: UpdatedReview) => {
        try {
            const res = await reviewApi.updateReview(id, updatedReview);
            reviews?.find(item => {
                if (item.id === id) {
                    item.upVoteUsers = updatedReview.upVoteUsers;
                    item.upVotes = updatedReview.upVoteUsers.length;
                    item.downVotes = updatedReview.downVoteUsers.length;
                    item.downVoteUsers = updatedReview.downVoteUsers;
                }
            });
            setReviews(reviews);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () =>{
        try {
            await companyApi.deleteCompany(id);
            localStorage.removeItem(`company-${id}`);
            localStorage.removeItem(`companyReview-${id}`);
            localStorage.removeItem('allCompanies');
            localStorage.removeItem('KPIs');
            history.push('/');
            window.location.reload();
        } catch (error: any) {
            console.log("Error", error.response.data.message);
        }
    };

    const handleReviewDelete = async (reviewId: string) => {
        try {
            await reviewApi.deleteReview(reviewId);
            const updatedReviews = reviews?.filter(review => review.id !== reviewId);
            localStorage.removeItem(`company-${id}`);
            localStorage.removeItem(`companyReview-${id}`);
            localStorage.removeItem('allCompanies');
            localStorage.removeItem('KPIs');
            window.location.reload();
        } catch (error: any) {
            console.log("Error", error.response.data.message);
        }
    };
    
    const reviewDisabledLabel = "You need to have 'Company Mid Evaluation' validated in order to write a review";

    return (
        <div>
            {company &&
                <div className="companyDetailViewKeyInfoWrapper">
                    <div className="oneCompanyLogoWrapper">
                        <img className="oneCompanyLogoBig" src={company[0]?.logoURL}></img>

                        <div className="oneCompanyNameBig">
                            <a href={company[0].companyURL}> {company[0]?.companyName}</a>
                            {currentUser.userName === 'gmolin' && 
                            <div className="companyDelete">
                                <IconButton onClick={handleDelete} aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        }
                        </div>
                        <div className="oneCompanyLocation">
                            {company[0]?.companyLocation}
                        </div>

                    </div>
                    <KeyIndicator average={true}  keyIndicator={company[0].averageSalaries} label={salaryLabel}/>
                    <KeyIndicator average={true}  keyIndicator={company[0].averageTotalScore} label={ratingLabel}/>
                    <KeyIndicator average={true}  keyIndicator={company[0].averageDuration} label={durationLabel}/>
                </div>
            }
            {!company &&
                <div className="companyDetailViewKeyInfoWrapper">
                    <div>
                        <Skeleton variant="rect" width={100} height={100} /> 
                    </div>

                    <div> 
                        <Skeleton variant="circle" width={100} height={100} /> 
                        <Skeleton variant="text" />
                    </div>

                    <div> 
                        <Skeleton variant="circle" width={100} height={100} /> 
                        <Skeleton variant="text" />
                    </div>

                    <div> 
                        <Skeleton variant="circle" width={100} height={100} /> 
                        <Skeleton variant="text" />
                    </div>
                </div>
            }
            {company && <CompanySubRatings company={company}/>}
            {company && reviews && reviews.length > 0 && <CreateReviewButton currentUser={currentUser} companyId={company[0].id} />}
            {!currentUser.internshipValidated && <Alert severity="info">{reviewDisabledLabel}</Alert>}
            {company && reviews && reviews.length === 0 && <CreateFirstReview currentUser={currentUser} companyId={company[0].id} />}
            {reviews && reviews.length > 0  && <CompanyReviewsWrapper handleReviewDelete={handleReviewDelete} currentUser={currentUser} handleVoting={handleVoting} reviews={reviews}/>}
            {!reviews && 
                <div className="skeletonReview">
                    <Skeleton variant="rect" width={1280} height={400}/> 
                </div>
            }
        </div>
    );
};

export default CompanyDetailView;
