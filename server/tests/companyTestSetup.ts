import  { NewCompany } from '../types/company';
import companyServices from '../services/companyServices';

const companyTable = 'company_test';

const intialCompanies: NewCompany[] = [
    {
        companyName: "Wunderdog",
        companyDescription: "Software Development Agency",
        logoURL: "https://hivesights.s3.eu-central-1.amazonaws.com/company_logos/wunderdog.png",
        companyURL: "https://wunderdog.fi/",
        companyLocation: "Helsinki, Finland"
    },
    {
        companyName: "Futurice",
        companyDescription: "Software Development Agency",
        logoURL: "https://hivesights.s3.eu-central-1.amazonaws.com/company_logos/futurice.png",
        companyURL: "https://futurice.fi/",
        companyLocation: "Helsinki, Finland"
    },
    {
        companyName: "Reaktor",
        companyDescription: "Software Development Agency",
        logoURL: "https://www.reaktor.com/wp-content/uploads/2017/11/default-share-image.png",
        companyURL: "https://reaktor.fi/",
        companyLocation: "Helsinki, Finland"
    },
    {
        companyName: "School Day",
        companyDescription: "EdTech Startup",
        logoURL: "https://hivesights.s3.eu-central-1.amazonaws.com/company_logos/schoolday-logo.jpeg",
        companyURL: "https://schoolday.com/",
        companyLocation: "Helsinki, Finland"
    },
    {
        companyName: "Holvi",
        companyDescription: "Payment Startup",
        logoURL: "https://hivesights.s3.eu-central-1.amazonaws.com/company_logos/holvi_logo.png",
        companyURL: "https://holvi.com/",
        companyLocation: "Helsinki, Finland"
    },
    {
        companyName: "Unity",
        companyDescription: "Game Developer",
        logoURL: "https://hivesights.s3.eu-central-1.amazonaws.com/company_logos/unity.jpeg",
        companyURL: "https://unity.com/",
        companyLocation: "Helsinki, Finland"
    },
    {
        companyName: "F-Secure",
        companyDescription: "Cyber Security",
        logoURL: "https://hivesights.s3.eu-central-1.amazonaws.com/company_logos/f_secure.png",
        companyURL: "https://f-secure.com/",
        companyLocation: "Helsinki, Finland"
    },
    {
        companyName: "Hive Helsinki",
        companyDescription: "Coding School",
        logoURL: "https://hivesights.s3.eu-central-1.amazonaws.com/company_logos/hive.png",
        companyURL: "https://hive.fi/",
        companyLocation: "Helsinki, Finland"
    },
    {
        companyName: "Wunderman Thompson",
        companyDescription: "Consulting Firm",
        logoURL: "https://hivesights.s3.eu-central-1.amazonaws.com/company_logos/wunderman_thompson.jpeg",
        companyURL: "https://wundermanthompson.com/",
        companyLocation: "Helsinki, Finland"
    },
]

const populateTable = async () => {
    for (let i = 0; i < intialCompanies.length; i++) {
        await companyServices.addCompany(intialCompanies[i], companyTable);
    }
}

export default {
    intialCompanies,
    populateTable
}