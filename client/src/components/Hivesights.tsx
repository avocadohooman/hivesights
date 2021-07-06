/* eslint-disable react/prop-types */
// React Libraris
import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, useHistory} from 'react-router-dom';

// Components
import KeyIndicatorsWrapper from './KeyIndicators/KeyIndicatorsWrapper';
import CompaniesWrapper from './Companies/CompaniesWrapper';
import CompanyFilterWrapper from './Filter/companyFilterWrapper';
import CompanyDetailView from './Companies/CompanyDetailView';
import AddReview from './AddReview/AddReview';
import AddCompany from './AddCompany/AddCompany';
import Feedback from './Feedback/Feedback';

// Data models 
import { Company } from '../models/companyModel';
import { KPI, StateKpi } from '../models/kpiModel';
import { User } from '../models/userModel';
import { OnChangeEvent } from '../models/miscModels';
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

    const history = useHistory();

    const [kpi, setKpi] = useState<StateKpi>();
    const [companies, setCompanies] = useState<Company[]>([]);
    const [filteredCompanies, setCompanyFilter] = useState<Company[]>(companies);
    const currentUser: User = {
        id: user.id,
        userName: user.userName,
        imageUrl: user.imageUrl,
        intraUrl: user.intraUrl,
        internshipValidated: user.internshipValidated,
    };

    const getKpi = async() => {
        const cachedKPIs = JSON.parse(localStorage.getItem('KPIs') as string);
        if (!cachedKPIs) {
            try {
                const res: StateKpi = await kpiApi.getKeyKpi();
                setKpi(res);
                localStorage.setItem('KPIs', JSON.stringify(res));
            } catch (error: any) {
                console.log(error);
            }
        } else {
            setKpi(cachedKPIs);
        }
    };

    const getCompanies = async() => {
        const cachedCompanies = JSON.parse(localStorage.getItem('allCompanies') as string);
        if (!cachedCompanies) {
            try {
                const getCompanies: Company[] = await companyApi.getAllCompanies();
                getCompanies.sort((function(a: Company, b: Company) {
                    return a.averageTotalScore < b.averageTotalScore ? 1 : -1; 
                }));
                setCompanies(getCompanies);
                localStorage.setItem('allCompanies', JSON.stringify(getCompanies));
                setCompanyFilter(getCompanies);
            } catch (error: any) {
                console.log(error);
            }
        } else {
            setCompanies(cachedCompanies);
            setCompanyFilter(cachedCompanies);
        }
    };

    useEffect(() => {
        getKpi();
        getCompanies();
        const interval = setInterval(() => {
            updateCacheCompanies();
            updateCacheKpis();
        }, 90000);
        return () => clearInterval(interval);
    }, []);

    const [noData, setNoData] = useState<boolean>(false);

    setTimeout(() => {
        if (companies.length === 0) {
            setNoData(true);
        }
    }, 5000);

    const updateCacheCompanies = async () => {
        try {
            const getCompanies: Company[] = await companyApi.getAllCompanies();
            getCompanies.sort((function(a: Company, b: Company) {
                return a.averageTotalScore < b.averageTotalScore ? 1 : -1; 
            }));
            localStorage.removeItem('allCompanies');
            localStorage.setItem('allCompanies', JSON.stringify(getCompanies));
            setCompanies(getCompanies);
            setCompanyFilter(getCompanies);
        } catch (error: any) {
            console.log(error);
        }
    }

    const updateCacheKpis = async () => {
        try {
            const res: StateKpi = await kpiApi.getKeyKpi();
            setKpi(res);
            localStorage.removeItem('KPIs');
            localStorage.setItem('KPIs', JSON.stringify(res));
        } catch (error: any) {
            console.log(error);
        }
    }

    const handleCompanySearch = (event: OnChangeEvent) => {
        event.preventDefault();
        const value: string = event.target.value.toLowerCase();
        let result: Company[] = [];
        result = companies.filter((data) => {
            return data.companyName.toLowerCase().search(value) != -1;
        });
        setCompanyFilter(result);
    };

    const resetFilter = () => {
        setCompanyFilter(companies);
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
    };

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
                return filteredCompanies.filter((data) => data.averageTotalScore).sort(function(a: Company, b: Company) {
                    if (a.averageTotalScore === null) {
                        return 1;
                    }
                    if (b.averageTotalScore === null) {
                        return -1;
                    }
                    return a.reviews > b.reviews ? 1 : -1;
                });
            case 'review desc':
                return filteredCompanies.filter((data) => data.averageTotalScore).sort(function(a: Company, b: Company) {
                    return a.reviews < b.reviews ? 1 : -1;
                });
            case 'rating asc':
                return filteredCompanies.filter((data) => data.averageTotalScore).sort(function(a: Company, b: Company) {
                    if (a.averageTotalScore === null) {
                        return 1;
                    }
                    if (b.averageTotalScore === null) {
                        return -1;
                    }
                    return a.averageTotalScore > b.averageTotalScore ? 1 : -1;
                });
            case 'rating desc':
                return filteredCompanies.filter((data) => data.averageTotalScore).sort(function(a: Company, b: Company) {
                    return a.averageTotalScore < b.averageTotalScore ? 1 : -1;
                });
            case 'salary asc':
                return filteredCompanies.filter((data) => data.averageTotalScore).sort(function(a: Company, b: Company) {
                    if (a.averageTotalScore === null) {
                        return 1;
                    }
                    if (b.averageTotalScore === null) {
                        return -1;
                    }
                    return a.averageSalaries > b.averageSalaries ? 1 : -1;
                });
            case 'salary desc':
                    return filteredCompanies.filter((data) => data.averageTotalScore).sort(function(a: Company, b: Company) {
                        return a.averageSalaries < b.averageSalaries ? 1 : -1;
                    });
        }
        return result;
    };


    return (
            <Switch>
                <Route exact path="/">
                    <KeyIndicatorsWrapper kpi={kpi} setKpi={setKpi}/>
                    <CompanyFilterWrapper handleCompanySearch={handleCompanySearch} handleCompanySelection={handleCompanySelection}/>
                    <CompaniesWrapper resetFilter={resetFilter} noData={noData} user={user} companies={filteredCompanies} />
                    <Feedback />
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
                <Route path="/newCompany">
                    {user.userName === "gmolin" && <AddCompany />}
                </Route> 
            </Switch>
    );
};

export default Hivesights;