export type User = {
    id: string,
    userName: string,
    imageUrl: string,
    intraUrl: string,
    internshipValidated: boolean,
}

export interface StateUser {
    id: string,
    userName: string,
    imageUrl: string,
    intraUrl: string,
    internshipValidated: boolean,
}

export type SetUser = React.Dispatch<React.SetStateAction<StateUser | undefined>>
