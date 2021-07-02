/* eslint-disable react/prop-types */
// React Libraris
import React, { useState, useEffect, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import KeyIndicatorsWrapper from './KeyIndicators/KeyIndicatorsWrapper';
import CompaniesWrapper from './Companies/CompaniesWrapper';
import CompanyFilterWrapper from './Filter/companyFilterWrapper';
import CompanyDetailView from './Companies/CompanyDetailView';
import AddReview from './AddReview/AddReview';
import AddCompany from './AddCompany/AddCompany';
import ReviewHeaders from './Reviews/ReviewHeader';

// Data models 
import { Company } from '../models/companyModel';
import { KPI, StateKpi } from '../models/kpiModel';
import { User } from '../models/userModel';
import { OnChangeEvent } from '../models/miscModels'
import { SelectionFilter } from '../models/filterModels';

// API services
import kpiApi from '../services/kpiApi';
import companyApi from '../services/companyApi';
import { Container } from '@material-ui/core';

// CSS styles

// UI Libraries

// Assets

const Hivesights = ({
        user
    }: {
        user: User
    }): JSX.Element=> {

    const [kpi, setKpi] = useState<StateKpi>();
    const [companies, setCompanies] = useState<Company[]>([]);
    const [filteredCompanies, setCompanyFilter] = useState<Company[]>(companies);
    const currentUser: User = {
        id: user.id,
        userName: user.userName,
        imageUrl: user.imageUrl,
        intraUrl: user.intraUrl,
        internshipValidated: user.internshipValidated,
    }
    
    useEffect(() => {
        const getKpi = async() => {
            try {
                const res: StateKpi = await kpiApi.getKeyKpi();
                setKpi(res);
            } catch (error: any) {
                console.log(error);
            }
        }
        const getCompanies = async() => {
            try {
                const getCompanies: Company[] = await companyApi.getAllCompanies();
                getCompanies.sort((function(a: Company, b: Company) {
                    return a.companyName > b.companyName ? 1 : -1; 
                }));
                setCompanies(getCompanies);
                setCompanyFilter(getCompanies);
            } catch (error: any) {
                console.log(error);
            }
        }
        getKpi();
        getCompanies();
    }, []);

    const [noData, setNoData] = useState<boolean>(false);

    setTimeout(() => {
        if (companies.length === 0) {
            setNoData(true);
        }
    }, 5000);

    const handleCompanySearch = (event: OnChangeEvent) => {
        event.preventDefault();
        const value: string = event.target.value.toLowerCase();
        let result: Company[] = [];
        result = companies.filter((data) => {
            return data.companyName.toLowerCase().search(value) != -1;
        });
        setCompanyFilter(result);
    }

    const handleCompanySelection = (event: OnChangeEvent, value: SelectionFilter, label: string) => {
        event.preventDefault();
        if (!value) {
            setCompanyFilter(companies);
            return ;
        }
        let result: Company[] = [];
        if (label === 'Scores') {
            result = companies.filter((data) => data.averageTotalScore >= value.value);
        } else if (label === 'Salary') {
            result = companies.filter((data) => data.averageSalaries >= value.value);
        } else if (label === 'Sort') {
            result = handleSorting(value);
        }        
        setCompanyFilter(result);
    }

    const handleSorting = (value: SelectionFilter):Company[] => {
        const result: Company[] = filteredCompanies;
        switch (value.value) {
            case 'name asc':
                return filteredCompanies.slice().sort(function(a: Company, b: Company) {
                    return a.companyName > b.companyName ? 1 : -1;
                });
            case 'name desc': 
                return filteredCompanies.slice().sort(function(a: Company, b: Company) {
                    return a.companyName < b.companyName ? 1 : -1;
                });
            case 'review asc':
                return filteredCompanies.slice().sort(function(a: Company, b: Company) {
                    return a.reviews > b.reviews ? 1 : -1;
                });
            case 'review desc':
                return filteredCompanies.slice().sort(function(a: Company, b: Company) {
                    return a.reviews < b.reviews ? 1 : -1;
                });
            case 'rating asc':
                return filteredCompanies.slice().sort(function(a: Company, b: Company) {
                    return a.averageTotalScore > b.averageTotalScore ? 1 : -1;
                });
            case 'rating desc':
                return filteredCompanies.slice().sort(function(a: Company, b: Company) {
                    return a.averageTotalScore < b.averageTotalScore ? 1 : -1;
                });
        }
        return result;
    }


    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <KeyIndicatorsWrapper kpi={kpi} setKpi={setKpi}/>
                    <CompanyFilterWrapper handleCompanySearch={handleCompanySearch} handleCompanySelection={handleCompanySelection}/>
                    <CompaniesWrapper noData={noData} user={user} companies={filteredCompanies} />
                </Route>
                <Route path="/company/:id" render={(props) => (
                    <CompanyDetailView currentUser={currentUser} id={props.match.params.id}/>
                    )}>
                </Route>
                <Route path="/review/:id" render={(props) => (
                    <Container maxWidth="md">
                        <AddReview companies={companies} currentUser={currentUser} id={props.match.params.id} />
                    </Container>
                )}>
                </Route>
                <Route path="/newCompany/">
                    {user.userName === "gmolin" && <AddCompany />}
                </Route> 
            </Switch>
        </div>
    );
}

export default Hivesights;