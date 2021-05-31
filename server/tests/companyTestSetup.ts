import  { NewCompany } from '../types/company';

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
]


export default {
    intialCompanies,
}