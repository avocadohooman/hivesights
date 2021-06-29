// React Libraris
import React from 'react';

// Components
import CreateReviewButton from '../Reviews/CreateReviewButton';

// Data models 
import { Company } from '../../models/companyModel';
import { NewReview, Review, UpdatedReview } from '../../models/reviewModel';
import { User } from '../../models/userModel';

// API services
import companyApi from '../../services/companyApi';
import reviewApi from '../../services/reviewApi';

// CSS styles
import '../../styles/companyDetailView.css'

// UI Libraries
import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import { Alert } from '@material-ui/lab';

// Assets

const CreateFirstReview = ({ 
        companyId,
        currentUser
    } : { 
        companyId: string,
        currentUser: User
    }): JSX.Element => {

    const callToAction = "Seems like you could be the first one to write a review for this company. What are you waiting for? :)";
    const reviewDisabledLabel = "You need to have 'Company Mid Evaluation' validated in order to write a review";
    return (
        <div className="createFirstReviewWrapper">
            <div> 
                <EmojiNatureIcon className="createFirstReviewIcon" />
            </div>
            {currentUser.internshipValidated && 
                <div className="createFirstReviewText">
                        {callToAction}
                </div>
            }
            <CreateReviewButton currentUser={currentUser} companyId={companyId} />
            {!currentUser.internshipValidated && <Alert severity="info">{reviewDisabledLabel}</Alert>}
        </div>
    )
}

export default CreateFirstReview;