// React Libraris
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import AddCompanyFormHeader from './AddCompanyFormHeader';
import AddCompanyField from './AddCompanyField';
import AddCompanyButton from './AddCompanyButton';
import CancelCompany from './CancelCompanyButton';

// Data models 
import { NewCompany } from '../../models/companyModel';
import { OnChangeEvent } from '../../models/miscModels';

// API services

// CSS styles
import '../../styles/addCompany.css';
import companyApi from '../../services/companyApi';
import AddCompanyHeader from './AddReviewHeader';

// UI Libraries


// Assets

// AddCompany component as parent component for creating a new company. Contains all the business logic
const AddCompany = () => {

    const history = useHistory();

    const [newCompany, setNewCompany] = useState<NewCompany | null>();

    const [companyName, setCompanyName] = useState<string>("");
    const [companyDescription, setCompanyDescription] = useState<string>("");
    const [companyLogo, setCompanyLogo] = useState<string>("");
    const [companyWebsite, setCompanyWebsite] = useState<string>("");
    const [companyLocation, setCompanyLocation] = useState<string>("");

    const [btnDisable, setBtnDsiable] = useState<boolean>(false);
    const [postSuccess, setPostSuccess] = useState<boolean>(false);


    // handleNewCompany is triggered when pressing 'Add Company', and accesses all state variables of the form fields
    const handleNewCompany = async () => {
        // deactivates Add Company button to prevent multiple POST requests
        setBtnDsiable(true);
        const company: NewCompany = {
            companyName: companyName,
            companyDescription: companyDescription,
            companyLocation: companyLocation,
            companyURL: companyWebsite,
            logoURL: companyLogo
        };
        setNewCompany(company);
        try {
            await companyApi.createCompany(company);
            // setting post success triggers success alert message
            setPostSuccess(true);
            // removing allCompines and KPIs cache, so we pull latest data
            localStorage.removeItem('allCompanies');
            localStorage.removeItem('KPIs');
            // short delay before pushing to '/' and reloading page
            setTimeout(() => {
                history.push(`/`);
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.log('Error: ', error.response.data.error);
        }
        setBtnDsiable(false);
    };

    const handleCompanyName = (event: OnChangeEvent) => {
        event.preventDefault();
        setCompanyName(event.target.value);
    };

    const handleCompanyDescription = (event: OnChangeEvent) => {
        event.preventDefault();
        setCompanyDescription(event.target.value);
    };
    
    const handleCompanyLogo = (event: OnChangeEvent) => {
        event.preventDefault();
        setCompanyLogo(event.target.value);
    };

    const handleCompanyWebsite = (event: OnChangeEvent) => {
        event.preventDefault();
        setCompanyWebsite(event.target.value);
    };

    const handleCompanyLocation = (event: OnChangeEvent) => {
        event.preventDefault();
        setCompanyLocation(event.target.value);
    };

    return (
        <div className="addCompanyWrapper">
            <div className="addCompanyInnerWrapperForm">
                <AddCompanyHeader />
                <AddCompanyFormHeader header='Company Name' color='#343C44' size='14px'/>
                <AddCompanyField handleCompanyfield={handleCompanyName} />

                <AddCompanyFormHeader header='Company Description' color='#343C44' size='14px'/>
                <AddCompanyField handleCompanyfield={handleCompanyDescription} />

                <AddCompanyFormHeader header='Company Logo URL' color='#343C44' size='14px'/>
                <AddCompanyField handleCompanyfield={handleCompanyLogo} />

                <AddCompanyFormHeader header='Company Website' color='#343C44' size='14px'/>
                <AddCompanyField handleCompanyfield={handleCompanyWebsite} />

                <AddCompanyFormHeader header='Company Location' color='#343C44' size='14px'/>
                <AddCompanyField handleCompanyfield={handleCompanyLocation} />

                <div className="addReviewButtonsWrapper">
                    <CancelCompany />
                    <AddCompanyButton success={postSuccess} btnDisabled={btnDisable} handleNewCompany={handleNewCompany} />
                </div>
            </div>

        </div>
    );
};


export default AddCompany;