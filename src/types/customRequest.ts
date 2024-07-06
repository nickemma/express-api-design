import { Request } from 'express';

type AuthorizedRequest<T> = Request<never, never, T> & {
  user?: any;
};

export default AuthorizedRequest;