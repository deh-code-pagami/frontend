
// Imports
import * as _0_0 from "//home/rbnflt/documents/pagami-frontend/src/api/login.js";
import * as _0_1 from "//home/rbnflt/documents/pagami-frontend/src/api/test.js";


export const routeBase = "/api";

const internal  = [
  _0_0.default && {
        source     : "src/api/login.js?fn=default",
        method     : "use",
        route      : "/login",
        path       : "/api/login",
        url        : "/api/login",
        cb         : _0_0.default,
      },
  _0_0.GET && {
        source     : "src/api/login.js?fn=GET",
        method     : "get",
        route      : "/login",
        path       : "/api/login",
        url        : "/api/login",
        cb         : _0_0.GET,
      },
  _0_0.PUT && {
        source     : "src/api/login.js?fn=PUT",
        method     : "put",
        route      : "/login",
        path       : "/api/login",
        url        : "/api/login",
        cb         : _0_0.PUT,
      },
  _0_0.POST && {
        source     : "src/api/login.js?fn=POST",
        method     : "post",
        route      : "/login",
        path       : "/api/login",
        url        : "/api/login",
        cb         : _0_0.POST,
      },
  _0_0.PATCH && {
        source     : "src/api/login.js?fn=PATCH",
        method     : "patch",
        route      : "/login",
        path       : "/api/login",
        url        : "/api/login",
        cb         : _0_0.PATCH,
      },
  _0_0.DELETE && {
        source     : "src/api/login.js?fn=DELETE",
        method     : "delete",
        route      : "/login",
        path       : "/api/login",
        url        : "/api/login",
        cb         : _0_0.DELETE,
      },
  _0_1.default && {
        source     : "src/api/test.js?fn=default",
        method     : "use",
        route      : "/test",
        path       : "/api/test",
        url        : "/api/test",
        cb         : _0_1.default,
      },
  _0_1.GET && {
        source     : "src/api/test.js?fn=GET",
        method     : "get",
        route      : "/test",
        path       : "/api/test",
        url        : "/api/test",
        cb         : _0_1.GET,
      },
  _0_1.PUT && {
        source     : "src/api/test.js?fn=PUT",
        method     : "put",
        route      : "/test",
        path       : "/api/test",
        url        : "/api/test",
        cb         : _0_1.PUT,
      },
  _0_1.POST && {
        source     : "src/api/test.js?fn=POST",
        method     : "post",
        route      : "/test",
        path       : "/api/test",
        url        : "/api/test",
        cb         : _0_1.POST,
      },
  _0_1.PATCH && {
        source     : "src/api/test.js?fn=PATCH",
        method     : "patch",
        route      : "/test",
        path       : "/api/test",
        url        : "/api/test",
        cb         : _0_1.PATCH,
      },
  _0_1.DELETE && {
        source     : "src/api/test.js?fn=DELETE",
        method     : "delete",
        route      : "/test",
        path       : "/api/test",
        url        : "/api/test",
        cb         : _0_1.DELETE,
      }
].filter(it => it);

export const routers = internal.map((it) => { 
  const { method, path, route, url, source} = it;
  return { method, url, path, route, source };
});

export const endpoints = internal.map((it) => it.method?.toUpperCase() + '\t' + it.url);

const FN = (value) => value;

export const applyRouters = (applyRouter, opts = {} ) => {
  const {pre = FN, post = FN, hoc = FN} = opts;
  pre(internal)
    .forEach((it) => {
    it.cb = hoc(it.cb, it);
    applyRouter(it);
  });  
  post(internal);
};
