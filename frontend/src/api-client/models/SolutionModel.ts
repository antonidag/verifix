/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DowntimeImpact } from './DowntimeImpact';
import type { ResolutionType } from './ResolutionType';
export type SolutionModel = {
    /**
     * The solution id
     */
    id?: number;
    /**
     * The solution text
     */
    text: string;
    /**
     * Link to related documentation
     */
    document_link: string;
    /**
     * Whether the solution has been verified
     */
    verified: boolean;
    /**
     * Machine/system error code
     */
    error_code?: string;
    /**
     * Name/tag of machine
     */
    machine_name?: string;
    /**
     * Type of machine
     */
    machine_type?: string;
    /**
     * Equipment manufacturer
     */
    manufacturer?: string;
    /**
     * Specific model number
     */
    model_number?: string;
    /**
     * Component involved
     */
    component?: string;
    /**
     * Type of resolution
     */
    resolution_type?: ResolutionType;
    /**
     * Impact on machine downtime
     */
    downtime_impact?: DowntimeImpact;
    /**
     * Whether the issue has safety implications
     */
    safety_related?: boolean;
    /**
     * Name of the plant
     */
    plant_name?: string;
    /**
     * Department name
     */
    department?: string;
    /**
     * Comma-separated tags for filtering
     */
    tags?: string;
};

