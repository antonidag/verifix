/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AskRequestModel } from '../models/AskRequestModel';
import type { AskResponseModel } from '../models/AskResponseModel';
import type { QuestionModel } from '../models/QuestionModel';
import type { SolutionModel } from '../models/SolutionModel';
import type { SolutionRequest } from '../models/SolutionRequest';
import type { SolutionResponseModel } from '../models/SolutionResponseModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DefaultService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Ask a question with manufacturing context
     * Submit a question with optional manufacturing context to find matching solutions
     * @param requestBody
     * @returns AskResponseModel Successful Response
     * @throws ApiError
     */
    public ask(
        requestBody: AskRequestModel,
    ): CancelablePromise<AskResponseModel> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/ask',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Add a new solution
     * Add a new solution with its associated question
     * @param requestBody
     * @returns SolutionResponseModel Successful Response
     * @throws ApiError
     */
    public createSolution(
        requestBody: SolutionRequest,
    ): CancelablePromise<SolutionResponseModel> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/solutions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get solution by ID
     * Retrieve a specific solution by its ID
     * @param solutionId
     * @returns SolutionModel Successful Response
     * @throws ApiError
     */
    public getSolution(
        solutionId: number,
    ): CancelablePromise<SolutionModel> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/solutions/{solution_id}',
            path: {
                'solution_id': solutionId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Start an investigation
     * Initiate a background research task for a given question
     * @param requestBody
     * @returns SolutionResponseModel Successful Response
     * @throws ApiError
     */
    public investigate(
        requestBody: AskRequestModel,
    ): CancelablePromise<SolutionResponseModel> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/investigate',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get all questions
     * Retrieve all questions and their associated solutions from the database
     * @returns QuestionModel Successful Response
     * @throws ApiError
     */
    public listQuestions(): CancelablePromise<Array<QuestionModel>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/questions',
        });
    }
}
