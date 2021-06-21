// React Libraris
import React, { useEffect, useState } from 'react';

// Components
import KeyIndicator from '../KeyIndicators/KeyIndicator';
import CompanySubRatings from './CompanySubRatings';

// Data models 
import { Company } from '../../models/companyModel';
import { Review } from '../../models/reviewModel';

// API services
import companyApi from '../../services/companyApi';
import reviewApi from '../../services/reviewApi';

// CSS styles
import '../../styles/company.css';
import '../../styles/companyDetailView.css'

// UI Libraries

// Assets



const CompanyDetailView = ({
        id
    } : {
        id: string
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
                console.log("Reviews", reviews);
            } catch (error) {
                console.log(error);
            }
        }
        getOneCompany();
        getCompanyReviews();
    }, []);

    return (
        <div>
            {company &&
                <div className="companyDetailViewKeyInfoWrapper">
                    <div className="oneCompanyLogoWrapper">
                        <img className="oneCompanyLogoBig" src={company[0].logoURL}></img>

                        <div className="oneCompanyNameBig">
                            <a href={company[0].companyURL}> {company[0].companyName}</a>
                        </div>
                        <div className="oneCompanyLocation">
                            {company[0].companyLocation}
                        </div>

                    </div>
                    <KeyIndicator keyIndicator={company[0].averageSalaries} label={salaryLabel}/>
                    <KeyIndicator keyIndicator={company[0].averageTotalScore} label={ratingLabel}/>
                    <KeyIndicator keyIndicator={company[0].averageDuration} label={durationLabel}/>
                </div>
            }
            {company && <CompanySubRatings company={company}/>}
        </div>
    )
}

export default CompanyDetailView;