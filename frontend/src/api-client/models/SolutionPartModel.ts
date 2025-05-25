/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SolutionPartModel = {
    /**
     * Name/tag of machine (e.g., 'Press #3')
     */
    machine_name?: (string | null);
    /**
     * Type of machine (e.g., 'Press', 'Conveyor', 'Robot Arm')
     */
    machine_type?: (string | null);
    /**
     * Equipment manufacturer (e.g., 'Siemens', 'ABB', 'KUKA')
     */
    manufacturer?: (string | null);
    /**
     * Specific model number of the equipment
     */
    model_number?: (string | null);
    /**
     * Specific component involved (e.g., 'Motor', 'PLC', 'Sensor')
     */
    component?: (string | null);
    /**
     * Machine/system error code
     */
    error_code?: (string | null);
};

