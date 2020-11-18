import models from '../models';
import 'express-async-errors';
import locationNotFound from '../utils/notFoundRequestError';
import badRequest from '../utils/badRequestError';
import retrieveLocations from '../services/getLocations';

export const getLocations = async (req, res, next) => {
  const page = Number(req.query.page);
  try {
    const locations = await retrieveLocations(page);
    if (!locations) {
      throw new locationNotFound('There are no locations available');
    }
    res.status(200).json({ status: 200, page, locations });
  } catch (error) {
    next(error);
  }
};

export const createLocation = async (req, res, next) => {
  try {
    const location = await models.Location.create(req.body);
    res.status(201).json({ location });
  } catch (error) {
    next(error);
  }
};

export const getOneLocation = async (req, res, next) => {
  const { id } = req.params;
  try {
    const singleLocation = await models.Location.findOne({ where: { id } });
    if (!singleLocation) {
      throw new locationNotFound('Location does not exist');
    }
    res.status(200).json(singleLocation);
  } catch (error) {
    next(error);
  }
};

export const updateLocation = async (req, res, next) => {
  try {
    const locationExist = await models.Location.findOne({ where: { id: req.params.id } });
    if (!locationExist) {
      throw new locationNotFound('Location does not exist');
    }
  } catch (error) {
    next(error);
  }

  try {
    const update = await models.Location.update(req.body, { where: { id: req.params.id } });
    res.status(201).json({ status: 201, message: 'Location successfully updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteLocation = async (req, res, next) => {
  try {
    const locationExist = await models.Location.findOne({ where: { id: req.params.id } });
    if (!locationExist) {
      throw new locationNotFound('Location does not exist');
    }
  } catch (error) {
    next(error);
  }

  try {
    const linkedAccommodation = await models.Accommodation.findOne({ where: { locationID: req.params.id } });
    if (linkedAccommodation) {
      throw new badRequest('This location can not be deleted with linked accomodations.');
    }
  } catch (error) {
    next(error);
  }

  try {
    const dltLocation = await models.Location.destroy({ where: { id: req.params.id } });
    res.status(201).json({ status: 201, message: 'Location has been deleted' });
  } catch (error) {
    next(error);
  }
};
