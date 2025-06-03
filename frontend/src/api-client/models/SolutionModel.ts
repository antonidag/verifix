/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LinkModel } from './LinkModel';
export type SolutionModel = {
    /**
     * The solution id
     */
    id?: (string | null);
    /**
     * The solution text
     */
    text: string;
    /**
     * Confidence of the solution
     */
    confidence?: (string | null);
    /**
     * Title of the solution
     */
    title?: (string | null);
    /**
     * Description of the solution
     */
    description?: (string | null);
    /**
     * List of solution steps
     */
    solution_steps?: (Array<string> | null);
    /**
     * Current status of the investigation: analyzing, processing, identifying, validating, storing, complete, or error
     */
    status?: (string | null);
    /**
     * Whether the solution has been verified
     */
    verified?: boolean;
    /**
     * Machine/system error code
     */
    error_code?: (string | null);
    /**
     * Name/tag of machine
     */
    machine_name?: (string | null);
    /**
     * Type of machine
     */
    machine_type?: (string | null);
    /**
     * Equipment manufacturer
     */
    manufacturer?: (string | null);
    /**
     * Specific model number
     */
    model_number?: (string | null);
    /**
     * Component involved
     */
    component?: (string | null);
    /**
     * Type of resolution
     */
    resolution_type?: (string | null);
    /**
     * Impact on machine downtime
     */
    downtime_impact?: (string | null);
    /**
     * Tags for filtering
     */
    tags?: (Array<string> | null);
    /**
     * Links to related documentation and resources
     */
    links?: (Array<LinkModel> | null);
    /**
     * ID of the associated inventory item
     */
    inventory_id?: (string | null);
    /**
     * Creation date of the solution
     */
    created_at?: (string | null);
    /**
     * Last update date of the solution
     */
    updated_at?: (string | null);
};

