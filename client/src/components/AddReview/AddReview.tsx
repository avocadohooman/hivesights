/* eslint-disable react/no-unescaped-entities */
// React Libraris
import React, { useState } from 'react';

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
import TextField from '@material-ui/core/TextField';

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
    const handleOverallScore = (event: OnChangeEvent) => {
        event.preventDefault();
        setOverallScore(event.target.valueAsNumber);
    }

    const handleRecruitment = (event: OnChangeEvent) => {
        event.preventDefault();
        setRecruitment(event.target.valueAsNumber);
    }

    const handleOnboarding = (event: OnChangeEvent) => {
        event.preventDefault();
        setOnboarding(event.target.valueAsNumber);
    }

    const handleMentoring = (event: OnChangeEvent) => {
        event.preventDefault();
        setMentoring(event.target.valueAsNumber);
    }

    const handleLearning = (event: OnChangeEvent) => {
        event.preventDefault();
        setLearning(event.target.valueAsNumber);
    }

    const handlePerks= (event: OnChangeEvent) => {
        event.preventDefault();
        setPerks(event.target.valueAsNumber);
    }

    const handleCulture = (event: OnChangeEvent) => {
        event.preventDefault();
        setCulture(event.target.valueAsNumber);
    }

    const handleCodingPractices = (event: OnChangeEvent) => {
        event.preventDefault();
        setCodingPractices(event.target.valueAsNumber);
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

    const handleDuration = (event: OnChangeEvent) => {
        event.preventDefault();
        setDuration(event.target.valueAsNumber);
    }

    const handleSalary = (event: OnChangeEvent) => {
        event.preventDefault();
        setSalary(event.target.valueAsNumber);
    }

    return (
        <div className="addReviewWrapper">
            {company && 
                <div className="addReviewFormWrapper">
                    <AddReviewHeader companyName={company.companyName} />

                </div>
            }
            <div className="addReviewInfoTextWrapper"> 

            </div>
        </div>
    )
}

export default AddReview;