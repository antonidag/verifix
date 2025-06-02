/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AskRequestModel } from '../models/AskRequestModel';
import type { AskResponseModel } from '../models/AskResponseModel';
import type { ChatResponseModel } from '../models/ChatResponseModel';
import type { InventoryBase } from '../models/InventoryBase';
import type { QuestionModel } from '../models/QuestionModel';
import type { SolutionModel } from '../models/SolutionModel';
import type { SolutionResponseModel } from '../models/SolutionResponseModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DefaultService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Health Check
     * @returns any Successful Response
     * @throws ApiError
     */
    public healthCheckHealthGet(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/health',
        });
    }
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
     * Get solution by ID
     * Retrieve a specific solution by its ID
     * @param solutionId
     * @returns SolutionModel Successful Response
     * @throws ApiError
     */
    public getSolution(
        solutionId: string,
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
     * Get all solutions
     * Retrieve all solutions from the database
     * @returns SolutionModel Successful Response
     * @throws ApiError
     */
    public listSolutions(): CancelablePromise<Array<SolutionModel>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/solutions',
        });
    }
    /**
     * Get all questions
     * Retrieve all questions from the database
     * @returns QuestionModel Successful Response
     * @throws ApiError
     */
    public listQuestions(): CancelablePromise<Array<QuestionModel>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/questions',
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
     * Chat with the solution
     * Chat with the solution
     * @param requestBody
     * @returns ChatResponseModel Successful Response
     * @throws ApiError
     */
    public chat(
        requestBody: AskRequestModel,
    ): CancelablePromise<ChatResponseModel> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/chat',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get inventory information for a solution
     * Retrieve inventory data associated with a solution
     * @param solutionId
     * @returns InventoryBase Successful Response
     * @throws ApiError
     */
    public getSolutionInventory(
        solutionId: string,
    ): CancelablePromise<InventoryBase> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/solutions/{solution_id}/inventory',
            path: {
                'solution_id': solutionId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Solution Status
     * Get solution status via Server-Sent Events.
     * @param solutionId
     * @returns any Successful Response
     * @throws ApiError
     */
    public solutionStatusApiV1SolutionsSolutionIdStatusGet(
        solutionId: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/solutions/{solution_id}/status',
            path: {
                'solution_id': solutionId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Spa Fallback
     * @param fullPath
     * @returns any Successful Response
     * @throws ApiError
     */
    public spaFallbackFullPathGet(
        fullPath: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/{full_path}',
            path: {
                'full_path': fullPath,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
