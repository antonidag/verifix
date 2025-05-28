/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SolutionPartModel } from './SolutionPartModel';
export type AskRequestModel = {
    /**
     * The main question or issue to be resolved
     */
    question: string;
    /**
     * Optional solution details
     */
    solution?: (SolutionPartModel | null);
    /**
     * Optional base64 encoded image data
     */
    image_data?: (string | null);
};

