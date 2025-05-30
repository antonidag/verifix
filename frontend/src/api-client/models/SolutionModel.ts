/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
     * Link to related documentation
     */
    document_link?: (string | null);
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
     * Whether the issue has safety implications
     */
    safety_related?: (boolean | null);
    /**
     * Name of the plant
     */
    plant_name?: (string | null);
    /**
     * Department name
     */
    department?: (string | null);
    /**
     * Tags for filtering
     */
    tags?: (Array<string> | null);
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
     * Confidence of the solution
     */
    confidence?: (string | null);
    /**
     * Creation date of the solution
     */
    created_at?: (string | null);
    /**
     * Last update date of the solution
     */
    updated_at?: (string | null);
};

