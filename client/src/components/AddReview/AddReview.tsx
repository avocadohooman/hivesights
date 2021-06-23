/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React, { ChangeEvent, useState } from 'react';

// Components
import AddReviewHeader from './AddReviewHeader';
import AddReviewFormHeader from './AddReviewFormHeader';

// Data models 
import { NewReview } from '../../models/reviewModel';
import { Company } from '../../models/companyModel';
import { OnChangeEvent } from '../../models/miscModels';
import { User } from '../../models/userModel';

// API services

// CSS styles
import '../../styles/addReview.css';

// UI Libraries
import { Rating } from '@material-ui/lab';
import AddReviewOverallScore from './AddReviewOverallScore';
import AddReviewSubCategories from './AddReviewSubCategories';

// Assets


const AddReview = ({
        companies,
        currentUser,
        id
    } : {
        companies: Company[],
        currentUser: User,
        id: string
    }): JSX.Element => {

    const [newReview, setNewReview] = useState<NewReview | null>();
    const [overallScore, setOverallScore] = useState<number>(0);
    const [recruitment, setRecruitment] = useState<number>(0);
    const [onboarding, setOnboarding] = useState<number>(0);
    const [mentoring, setMentoring] = useState<number>(0);
    const [learning, setLearning] = useState<number>(0);
    const [perks, setPerks] = useState<number>(0);
    const [culture, setCulture] = useState<number>(0);
    const [codingPractices, setCodingPractices] = useState<number>(0);
    const [overallHeadline, setOverallHeadline] = useState<string>("");
    const [pros, setPros] = useState<string>("");
    const [cons, setCons] = useState<string>("");
    const [duration, setDuration] = useState<number>(0);
    const [salary, setSalary] = useState<number>(0);

    const company = companies.find(company => company.id === id);

    const handleNewReview = () => {
        const review: NewReview = {
            userName: currentUser.userName,
            userPicture: currentUser.imageUrl,
            pros: pros,
            cons: cons,
            overall: overallHeadline,
            totalRating: overallScore,
            ratingCriteriaInterview: recruitment,
            ratingCriteriaOnboarding: onboarding,
            ratingCriteriaSupervision: mentoring,
            ratingCriteriaLearning: learning,
            ratingCriteriaCodingPractices: codingPractices,
            ratingCriteriaPerks: perks,
            ratingCriteriaCulture: culture,
            salary: salary,
            duration: duration,
        }
        setNewReview(review);
    }

    const handleOverallScore = (event: ChangeEvent<{}>, newValue: number | null) => {
        event.preventDefault();
        console.log('In handle overall score', newValue);
        if (newValue) {
            setOverallScore(newValue);
        }
    }

    const handleRecruitment = (event: ChangeEvent<{}>, newValue: number | null) => {
        event.preventDefault();
        console.log('In handle recruitment', newValue);
        if (newValue) {    
            setRecruitment(newValue);
        }
    }

    const handleOnboarding = (event: ChangeEvent<{}>, newValue: number | null) => {
        event.preventDefault();
        if (newValue) {    
            setOnboarding(newValue);
        }
    }

    const handleMentoring = (event: ChangeEvent<{}>, newValue: number | null) => {
        event.preventDefault();
        if (newValue) {    
            setMentoring(newValue);
        }
    }

    const handleLearning = (event: ChangeEvent<{}>, newValue: number | null) => {
        event.preventDefault();
        if (newValue) {    
            setLearning(newValue);
        }
    }

    const handlePerks= (event: ChangeEvent<{}>, newValue: number | null) => {
        event.preventDefault();
        if (newValue) {    
            setPerks(newValue);
        }
    }

    const handleCulture = (event: ChangeEvent<{}>, newValue: number | null) => {
        event.preventDefault();
        if (newValue) {    
            setCulture(newValue);
        }
    }

    const handleCodingPractices = (event: ChangeEvent<{}>, newValue: number | null) => {
        event.preventDefault();
        if (newValue) {    
            setCodingPractices(newValue);
        }
    }

    const handleOverallHeadline = (event: OnChangeEvent) => {
        event.preventDefault();
        setOverallHeadline(event.target.value);
    }

    const handleOverallPros = (event: OnChangeEvent) => {
        event.preventDefault();
        setPros(event.target.value);
    }

    const handleCons = (event: OnChangeEvent) => {
        event.preventDefault();
        setCons(event.target.value);
    }

    const handleDuration = (event: ChangeEvent<{}>, newValue: number | null) => {
        event.preventDefault();
        if (newValue) { 
            setDuration(newValue);
        }
    }

    const handleSalary = (event: ChangeEvent<{}>, newValue: number | null) => {
        event.preventDefault();
        if (newValue) { 
            setSalary(newValue);
        }
    }

    return (
        <div className="addReviewWrapper">
            {company && 
                <div className="addReviewFormWrapper">
                    <AddReviewHeader companyName={company.companyName} />
                    <AddReviewOverallScore value={overallScore} handleOverallScore={handleOverallScore}/>
                    <AddReviewSubCategories 
                        recruitment={recruitment}
                        onboarding={onboarding}
                        mentoring={mentoring}
                        learning={learning}
                        perks={perks}
                        culture={culture}
                        codingPractices={codingPractices}
                        handleRecruitment = {handleRecruitment}
                        handleOnboarding = {handleOnboarding}
                        handleMentoring = {handleMentoring}
                        handleLearning = {handleLearning}
                        handlePerks = {handlePerks}
                        handleCulture = {handleCulture}
                        handleCodingPractices = {handleCodingPractices}
                    />
                </div>
            }
            <div className="addReviewInfoTextWrapper"> 

            </div>
        </div>
    )
}

export default AddReview;