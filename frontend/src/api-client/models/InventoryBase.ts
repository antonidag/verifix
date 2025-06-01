/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type InventoryBase = {
    /**
     * ID of the associated solution
     */
    solution_id: string;
    /**
     * Equipment manufacturer (e.g., 'Siemens', 'ABB')
     */
    manufacturer: string;
    /**
     * Model name/number of the equipment
     */
    model_name: string;
    /**
     * Type of component (e.g., 'PLC', 'Robot', 'Drive')
     */
    component_type: string;
    /**
     * Firmware/software version if applicable
     */
    firmware_version?: (string | null);
    /**
     * Technical specifications
     */
    specifications?: (Record<string, any> | null);
    /**
     * Additional metadata like installation date, service history
     */
    metadata?: (Record<string, any> | null);
};

