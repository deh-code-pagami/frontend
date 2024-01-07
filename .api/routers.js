
// Imports
import * as _0_0 from "//home/rbnflt/documents/pagami/pagami-frontend/src/api/groups/index.js";
import * as _0_1 from "//home/rbnflt/documents/pagami/pagami-frontend/src/api/groups/:id/index.js";
import * as _0_2 from "//home/rbnflt/documents/pagami/pagami-frontend/src/api/groups/:id/transactions/index.js";
import * as _0_3 from "//home/rbnflt/documents/pagami/pagami-frontend/src/api/login.js";
import * as _0_4 from "//home/rbnflt/documents/pagami/pagami-frontend/src/api/test.js";
import * as _0_5 from "//home/rbnflt/documents/pagami/pagami-frontend/src/api/transactions/index.js";
import * as _0_6 from "//home/rbnflt/documents/pagami/pagami-frontend/src/api/transactions/:id/index.js";
import * as _0_7 from "//home/rbnflt/documents/pagami/pagami-frontend/src/api/users/me.js";


export const routeBase = "/api";

const internal  = [
  _0_0.default && {
        source     : "src/api/groups/index.js?fn=default",
        method     : "use",
        route      : "/groups/",
        path       : "/api/groups/",
        url        : "/api/groups/",
        cb         : _0_0.default,
      },
  _0_0.GET && {
        source     : "src/api/groups/index.js?fn=GET",
        method     : "get",
        route      : "/groups/",
        path       : "/api/groups/",
        url        : "/api/groups/",
        cb         : _0_0.GET,
      },
  _0_0.PUT && {
        source     : "src/api/groups/index.js?fn=PUT",
        method     : "put",
        route      : "/groups/",
        path       : "/api/groups/",
        url        : "/api/groups/",
        cb         : _0_0.PUT,
      },
  _0_0.POST && {
        source     : "src/api/groups/index.js?fn=POST",
        method     : "post",
        route      : "/groups/",
        path       : "/api/groups/",
        url        : "/api/groups/",
        cb         : _0_0.POST,
      },
  _0_0.PATCH && {
        source     : "src/api/groups/index.js?fn=PATCH",
        method     : "patch",
        route      : "/groups/",
        path       : "/api/groups/",
        url        : "/api/groups/",
        cb         : _0_0.PATCH,
      },
  _0_0.DELETE && {
        source     : "src/api/groups/index.js?fn=DELETE",
        method     : "delete",
        route      : "/groups/",
        path       : "/api/groups/",
        url        : "/api/groups/",
        cb         : _0_0.DELETE,
      },
  _0_1.default && {
        source     : "src/api/groups/:id/index.js?fn=default",
        method     : "use",
        route      : "/groups/:id/",
        path       : "/api/groups/:id/",
        url        : "/api/groups/:id/",
        cb         : _0_1.default,
      },
  _0_1.GET && {
        source     : "src/api/groups/:id/index.js?fn=GET",
        method     : "get",
        route      : "/groups/:id/",
        path       : "/api/groups/:id/",
        url        : "/api/groups/:id/",
        cb         : _0_1.GET,
      },
  _0_1.PUT && {
        source     : "src/api/groups/:id/index.js?fn=PUT",
        method     : "put",
        route      : "/groups/:id/",
        path       : "/api/groups/:id/",
        url        : "/api/groups/:id/",
        cb         : _0_1.PUT,
      },
  _0_1.POST && {
        source     : "src/api/groups/:id/index.js?fn=POST",
        method     : "post",
        route      : "/groups/:id/",
        path       : "/api/groups/:id/",
        url        : "/api/groups/:id/",
        cb         : _0_1.POST,
      },
  _0_1.PATCH && {
        source     : "src/api/groups/:id/index.js?fn=PATCH",
        method     : "patch",
        route      : "/groups/:id/",
        path       : "/api/groups/:id/",
        url        : "/api/groups/:id/",
        cb         : _0_1.PATCH,
      },
  _0_1.DELETE && {
        source     : "src/api/groups/:id/index.js?fn=DELETE",
        method     : "delete",
        route      : "/groups/:id/",
        path       : "/api/groups/:id/",
        url        : "/api/groups/:id/",
        cb         : _0_1.DELETE,
      },
  _0_2.default && {
        source     : "src/api/groups/:id/transactions/index.js?fn=default",
        method     : "use",
        route      : "/groups/:id/transactions/",
        path       : "/api/groups/:id/transactions/",
        url        : "/api/groups/:id/transactions/",
        cb         : _0_2.default,
      },
  _0_2.GET && {
        source     : "src/api/groups/:id/transactions/index.js?fn=GET",
        method     : "get",
        route      : "/groups/:id/transactions/",
        path       : "/api/groups/:id/transactions/",
        url        : "/api/groups/:id/transactions/",
        cb         : _0_2.GET,
      },
  _0_2.PUT && {
        source     : "src/api/groups/:id/transactions/index.js?fn=PUT",
        method     : "put",
        route      : "/groups/:id/transactions/",
        path       : "/api/groups/:id/transactions/",
        url        : "/api/groups/:id/transactions/",
        cb         : _0_2.PUT,
      },
  _0_2.POST && {
        source     : "src/api/groups/:id/transactions/index.js?fn=POST",
        method     : "post",
        route      : "/groups/:id/transactions/",
        path       : "/api/groups/:id/transactions/",
        url        : "/api/groups/:id/transactions/",
        cb         : _0_2.POST,
      },
  _0_2.PATCH && {
        source     : "src/api/groups/:id/transactions/index.js?fn=PATCH",
        method     : "patch",
        route      : "/groups/:id/transactions/",
        path       : "/api/groups/:id/transactions/",
        url        : "/api/groups/:id/transactions/",
        cb         : _0_2.PATCH,
      },
  _0_2.DELETE && {
        source     : "src/api/groups/:id/transactions/index.js?fn=DELETE",
        method     : "delete",
        route      : "/groups/:id/transactions/",
        path       : "/api/groups/:id/transactions/",
        url        : "/api/groups/:id/transactions/",
        cb         : _0_2.DELETE,
      },
  _0_3.default && {
        source     : "src/api/login.js?fn=default",
        method     : "use",
        route      : "/login",
        path       : "/api/login",
        url        : "/api/login",
        cb         : _0_3.default,
      },
  _0_3.GET && {
        source     : "src/api/login.js?fn=GET",
        method     : "get",
        route      : "/login",
        path       : "/api/login",
        url        : "/api/login",
        cb         : _0_3.GET,
      },
  _0_3.PUT && {
        source     : "src/api/login.js?fn=PUT",
        method     : "put",
        route      : "/login",
        path       : "/api/login",
        url        : "/api/login",
        cb         : _0_3.PUT,
      },
  _0_3.POST && {
        source     : "src/api/login.js?fn=POST",
        method     : "post",
        route      : "/login",
        path       : "/api/login",
        url        : "/api/login",
        cb         : _0_3.POST,
      },
  _0_3.PATCH && {
        source     : "src/api/login.js?fn=PATCH",
        method     : "patch",
        route      : "/login",
        path       : "/api/login",
        url        : "/api/login",
        cb         : _0_3.PATCH,
      },
  _0_3.DELETE && {
        source     : "src/api/login.js?fn=DELETE",
        method     : "delete",
        route      : "/login",
        path       : "/api/login",
        url        : "/api/login",
        cb         : _0_3.DELETE,
      },
  _0_4.default && {
        source     : "src/api/test.js?fn=default",
        method     : "use",
        route      : "/test",
        path       : "/api/test",
        url        : "/api/test",
        cb         : _0_4.default,
      },
  _0_4.GET && {
        source     : "src/api/test.js?fn=GET",
        method     : "get",
        route      : "/test",
        path       : "/api/test",
        url        : "/api/test",
        cb         : _0_4.GET,
      },
  _0_4.PUT && {
        source     : "src/api/test.js?fn=PUT",
        method     : "put",
        route      : "/test",
        path       : "/api/test",
        url        : "/api/test",
        cb         : _0_4.PUT,
      },
  _0_4.POST && {
        source     : "src/api/test.js?fn=POST",
        method     : "post",
        route      : "/test",
        path       : "/api/test",
        url        : "/api/test",
        cb         : _0_4.POST,
      },
  _0_4.PATCH && {
        source     : "src/api/test.js?fn=PATCH",
        method     : "patch",
        route      : "/test",
        path       : "/api/test",
        url        : "/api/test",
        cb         : _0_4.PATCH,
      },
  _0_4.DELETE && {
        source     : "src/api/test.js?fn=DELETE",
        method     : "delete",
        route      : "/test",
        path       : "/api/test",
        url        : "/api/test",
        cb         : _0_4.DELETE,
      },
  _0_5.default && {
        source     : "src/api/transactions/index.js?fn=default",
        method     : "use",
        route      : "/transactions/",
        path       : "/api/transactions/",
        url        : "/api/transactions/",
        cb         : _0_5.default,
      },
  _0_5.GET && {
        source     : "src/api/transactions/index.js?fn=GET",
        method     : "get",
        route      : "/transactions/",
        path       : "/api/transactions/",
        url        : "/api/transactions/",
        cb         : _0_5.GET,
      },
  _0_5.PUT && {
        source     : "src/api/transactions/index.js?fn=PUT",
        method     : "put",
        route      : "/transactions/",
        path       : "/api/transactions/",
        url        : "/api/transactions/",
        cb         : _0_5.PUT,
      },
  _0_5.POST && {
        source     : "src/api/transactions/index.js?fn=POST",
        method     : "post",
        route      : "/transactions/",
        path       : "/api/transactions/",
        url        : "/api/transactions/",
        cb         : _0_5.POST,
      },
  _0_5.PATCH && {
        source     : "src/api/transactions/index.js?fn=PATCH",
        method     : "patch",
        route      : "/transactions/",
        path       : "/api/transactions/",
        url        : "/api/transactions/",
        cb         : _0_5.PATCH,
      },
  _0_5.DELETE && {
        source     : "src/api/transactions/index.js?fn=DELETE",
        method     : "delete",
        route      : "/transactions/",
        path       : "/api/transactions/",
        url        : "/api/transactions/",
        cb         : _0_5.DELETE,
      },
  _0_6.default && {
        source     : "src/api/transactions/:id/index.js?fn=default",
        method     : "use",
        route      : "/transactions/:id/",
        path       : "/api/transactions/:id/",
        url        : "/api/transactions/:id/",
        cb         : _0_6.default,
      },
  _0_6.GET && {
        source     : "src/api/transactions/:id/index.js?fn=GET",
        method     : "get",
        route      : "/transactions/:id/",
        path       : "/api/transactions/:id/",
        url        : "/api/transactions/:id/",
        cb         : _0_6.GET,
      },
  _0_6.PUT && {
        source     : "src/api/transactions/:id/index.js?fn=PUT",
        method     : "put",
        route      : "/transactions/:id/",
        path       : "/api/transactions/:id/",
        url        : "/api/transactions/:id/",
        cb         : _0_6.PUT,
      },
  _0_6.POST && {
        source     : "src/api/transactions/:id/index.js?fn=POST",
        method     : "post",
        route      : "/transactions/:id/",
        path       : "/api/transactions/:id/",
        url        : "/api/transactions/:id/",
        cb         : _0_6.POST,
      },
  _0_6.PATCH && {
        source     : "src/api/transactions/:id/index.js?fn=PATCH",
        method     : "patch",
        route      : "/transactions/:id/",
        path       : "/api/transactions/:id/",
        url        : "/api/transactions/:id/",
        cb         : _0_6.PATCH,
      },
  _0_6.DELETE && {
        source     : "src/api/transactions/:id/index.js?fn=DELETE",
        method     : "delete",
        route      : "/transactions/:id/",
        path       : "/api/transactions/:id/",
        url        : "/api/transactions/:id/",
        cb         : _0_6.DELETE,
      },
  _0_7.default && {
        source     : "src/api/users/me.js?fn=default",
        method     : "use",
        route      : "/users/me",
        path       : "/api/users/me",
        url        : "/api/users/me",
        cb         : _0_7.default,
      },
  _0_7.GET && {
        source     : "src/api/users/me.js?fn=GET",
        method     : "get",
        route      : "/users/me",
        path       : "/api/users/me",
        url        : "/api/users/me",
        cb         : _0_7.GET,
      },
  _0_7.PUT && {
        source     : "src/api/users/me.js?fn=PUT",
        method     : "put",
        route      : "/users/me",
        path       : "/api/users/me",
        url        : "/api/users/me",
        cb         : _0_7.PUT,
      },
  _0_7.POST && {
        source     : "src/api/users/me.js?fn=POST",
        method     : "post",
        route      : "/users/me",
        path       : "/api/users/me",
        url        : "/api/users/me",
        cb         : _0_7.POST,
      },
  _0_7.PATCH && {
        source     : "src/api/users/me.js?fn=PATCH",
        method     : "patch",
        route      : "/users/me",
        path       : "/api/users/me",
        url        : "/api/users/me",
        cb         : _0_7.PATCH,
      },
  _0_7.DELETE && {
        source     : "src/api/users/me.js?fn=DELETE",
        method     : "delete",
        route      : "/users/me",
        path       : "/api/users/me",
        url        : "/api/users/me",
        cb         : _0_7.DELETE,
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
