/* eslint-disable @typescript-eslint/ban-types */
import { ChangeEvent } from 'react';
import { SelectionFilter } from './filterModels';
import { NewReview, UpdatedReview } from './reviewModel';

export type OnChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type OnChangeEventSelect = React.ChangeEvent<{ name?: string | undefined; value: unknown; }>;

export type HandleCompanySearchFunction = (event: OnChangeEvent) => void;

export type HandleCompanySelectFunction = (event: OnChangeEvent, value: SelectionFilter, label: string) => void;

export type HandleExpandFunction = () => void;

export type HandleAddReviewFunction = () => void;

export type HandleAddCompanyunction = () => void;


export type HandleVotingFunction = (id: string, updatedReview: UpdatedReview) => void;
export type HandleReviewDeleteFunction = (reviewId: string) => void;


export type HandleNewScores = (event: ChangeEvent<{}>, newValue: number | null) => void;

export type HandleNewDuration= ( value: unknown, name?: string | undefined ) => void;

export type HandleNewFields = (event: OnChangeEvent) => void;

export type HandleFilterReset = () => void;
