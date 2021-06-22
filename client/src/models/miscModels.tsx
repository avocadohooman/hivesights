import { SelectionFilter } from './filterModels';
import { NewReview } from './reviewModel';

export type OnChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type HandleCompanySearchFunction = (event: OnChangeEvent) => void;

export type HandleCompanySelectFunction = (event: OnChangeEvent, value: SelectionFilter, label: string) => void;

export type HandleExpandFunction = () => void;

export type HandleVotingFunction = (id: string, updatedReview: NewReview) => void;
