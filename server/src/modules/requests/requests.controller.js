import * as service from './requests.service.js';
import { ok, created } from '../../utils/http.js';

export async function create(req, res, next) {
  try {
    const request = await service.createRequest(req.user, req.body);
    created(res, request);
  } catch (err) {
    next(err);
  }
}

export async function list(req, res, next) {
  try {
    const { data, meta } = await service.listRequests(req.user, req.query);
    ok(res, data, meta);
  } catch (err) {
    next(err);
  }
}

export async function detail(req, res, next) {
  try {
    const request = await service.getRequest(req.user, Number(req.params.id));
    ok(res, request);
  } catch (err) {
    next(err);
  }
}

export async function cancel(req, res, next) {
  try {
    const request = await service.cancelRequest(req.user, Number(req.params.id));
    ok(res, request);
  } catch (err) {
    next(err);
  }
}

export async function assign(req, res, next) {
  try {
    const request = await service.assignOfficer(req.user, Number(req.params.id), req.body);
    ok(res, request);
  } catch (err) {
    next(err);
  }
}

export async function updateStatus(req, res, next) {
  try {
    const request = await service.transitionStatus(
      req.user,
      Number(req.params.id),
      req.body.newStatus,
      req.body.comment
    );
    ok(res, request);
  } catch (err) {
    next(err);
  }
}
