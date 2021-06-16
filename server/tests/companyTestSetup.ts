import  { NewCompany } from '../types/company';
import companyServices from '../services/companyServices';

const companyTable = 'company_test';

const intialCompanies: NewCompany[] = [
    {
        companyName: "Wunderdog",
        companyDescription: "Software Development Agency",
        logoURL: "https://www.itewiki.fi/thumb.php?src=https://www.itewiki.fi/write/logos/wunderdog.png&size=x100",
        companyURL: "https://wunderdog.fi/",
        companyLocation: "Helsinki, Finland"
    },
    {
        companyName: "Futurice",
        companyDescription: "Software Development Agency",
        logoURL: "https://mb.cision.com/Public/15075/3030667/be2c1c70d27b5cfd_org.png",
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
        logoURL: "https://www.schoolday.com/images/2019/02/25/schoolday-logo.jpg",
        companyURL: "https://schoolday.com/",
        companyLocation: "Helsinki, Finland"
    },
    {
        companyName: "Holvi",
        companyDescription: "Payment Startup",
        logoURL: "https://theme.zdassets.com/theme_assets/129677/051049ceaf14b1f18e9eba7791231233d227ec7f.png",
        companyURL: "https://holvi.com/",
        companyLocation: "Helsinki, Finland"
    },
    {
        companyName: "Unity",
        companyDescription: "Game Developer",
        logoURL: "https://img.favpng.com/5/12/9/unity-technologies-finland-oy-technology-video-game-png-favpng-7H4uC2D0e5dCMkr1uxeNj6xye.jpg",
        companyURL: "https://unity.com/",
        companyLocation: "Helsinki, Finland"
    },
    {
        companyName: "F-Secure",
        companyDescription: "Cyber Security",
        logoURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/F-Secure_Logo.png/1200px-F-Secure_Logo.png",
        companyURL: "https://f-secure.com/",
        companyLocation: "Helsinki, Finland"
    },
    {
        companyName: "Hive Helsinki",
        companyDescription: "Coding School",
        logoURL: "https://cdn.xboxdev.com/wp-content/uploads/2018/12/05001727/Hive-Helsinki-Logo-Xboxdev.com_.png",
        companyURL: "https://hive.fi/",
        companyLocation: "Helsinki, Finland"
    },
    {
        companyName: "Wunderman Thompson",
        companyDescription: "Consulting Firm",
        logoURL: "https://www.wundermanthompson.com/img/wt-logo-seo-1x1.jpg",
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