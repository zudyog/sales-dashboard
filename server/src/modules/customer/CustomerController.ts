import { NextFunction, Request, Response } from "express";
import { ResponseModel } from "../../utils/ResponseModel";
import { CustomerConstants } from "../../utils/Constants";
import { CustomerModel } from "./CustomerModel";
import mongoose from "mongoose";

class CustomerController {
    add = async (req: Request, res: Response, next: NextFunction) => {
        const newTask = new CustomerModel(req.body);
        try {
            const result = await newTask.save();
            return res.sendStatus(201);
        } catch (error: any) {
            return next({
                success: false,
                message: error.message,
                StatusCode: 400
            } as ResponseModel);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        let { page, perPage, sortOrder, field } = req.query;
        const pageSize = parseInt(perPage as string) || 5;
        const pageNumber = parseInt(page as string) || 0;

        const fieldName = field === "lastName" ? { lastName: sortOrder } : { firstName: sortOrder }
        try {
            const result = await CustomerModel.find().limit(pageSize || 5).skip(pageSize * pageNumber).sort(fieldName);
            if (result.length === 0) {
                return res.sendStatus(404);
            }
            return res.status(200).send(result);
        } catch (error: any) {
            return next({
                success: false,
                message: error.message,
                StatusCode: 400
            } as ResponseModel);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        const customerId = req.params.customerId;
        if (!mongoose.isValidObjectId(customerId)) {
            return next({
                success: false,
                message: "Please Send Validate Customer ID",
                StatusCode: 400
            } as ResponseModel);
        }
        // Find the matching customer
        const result = await CustomerModel.find({ _id: customerId });
        // If there is no such customer then return NotFound
        if (typeof result !== 'undefined' && result.length === 0) {
            res.sendStatus(404);
        }
        return res.status(200).send({
            success: true,
            data: result
        } as ResponseModel);
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        const customerId = req.params.customerId;
        if (!mongoose.isValidObjectId(customerId)) {
            return next({
                success: false,
                message: "Please Send Validate Customer ID",
                StatusCode: 400
            } as ResponseModel);
        }
        const result = await CustomerModel.findOneAndUpdate({
            _id: customerId
        }, req.body, { new: true });

        if (result === null) {
            return next({
                success: false,
                message: `Customer Not exists with ID: ${customerId}`,
                StatusCode: 400
            } as ResponseModel);
        }
        return res.status(200).send({
            success: true,
            message: CustomerConstants.UPDATE_CUSTOMER_SUCCESS,
            data: result,
            StatusCode: 200
        } as ResponseModel);
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const customerId = req.params.customerId;
            if (!mongoose.isValidObjectId(customerId)) {
                return next({
                    success: false,
                    message: `Not A Valid Customer Id: ${customerId}`,
                    StatusCode: 400
                } as ResponseModel);
            }
            // Find the customer to be deleted in the collection.
            const customer = await CustomerModel.findById({ _id: customerId });
            // If there is no such customer, return an error response
            // with status code 404 (Not Found)
            if (customer === null) {
                return res.sendStatus(404);
            }
            // Remove the customer from the collection
            // The deleteOne method returns, it returns an object with the property 
            // deletedCount indicating how many documents were deleted
            // was successfully deleted
            const result = await CustomerModel.deleteOne({ _id: customerId });
            if (result.deletedCount > 0) {
                // Return a response message with status code 204 (No Content)
                // To indicate that the operation was successful
                return res.sendStatus(204);
            } else {
                // Otherwise return a 400 (Bad Request) error response
                return res.status(400).send({
                    success: false,
                    message: "Customer Not Deleted",
                    StatusCode: 400
                } as ResponseModel);
            }

        } catch (error: any) {
            // If an uncaught exception occurs, return an error response
            // with status code 500 (Internal Server Error)
            return next(error);
        }
    }
}

export default CustomerController;