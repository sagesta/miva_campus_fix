import * as service from './auth.service.js';
import { ok, created } from '../../utils/http.js';

export async function register(req, res, next) {
  try {
    const result = await service.register(req.body);
    created(res, result);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const result = await service.login(req.body);
    ok(res, result);
  } catch (err) {
    next(err);
  }
}

export async function me(req, res, next) {
  try {
    const user = await service.me(req.user.id);
    ok(res, user);
  } catch (err) {
    next(err);
  }
}
