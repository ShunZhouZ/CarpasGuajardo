"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/contacts";
exports.ids = ["pages/api/contacts"];
exports.modules = {

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "(api)/./lib/mongodb.js":
/*!************************!*\
  !*** ./lib/mongodb.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n// mongodb.js\n\nconst uri = \"mongodb+srv://carpasguajardo:carpasguajardo2023@clustercarpasguajardo.ox4p5wc.mongodb.net/carpas-guajardo-db?retryWrites=true&w=majority\";\nconst options = {\n    useUnifiedTopology: true,\n    useNewUrlParser: true\n};\nlet client;\nlet clientPromise;\nif (!uri) {\n    throw new Error(\"Add Mongo URI to .env.local\");\n}\nif (true) {\n    if (!global._mongoClientPromise) {\n        client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri, options);\n        global._mongoClientPromise = client.connect();\n    }\n    clientPromise = global._mongoClientPromise;\n} else {}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clientPromise);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvbW9uZ29kYi5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxhQUFhO0FBRXlCO0FBRXRDLE1BQU1DLE1BQU07QUFDWixNQUFNQyxVQUFVO0lBQ2ZDLG9CQUFvQixJQUFJO0lBQ3hCQyxpQkFBaUIsSUFBSTtBQUN0QjtBQUVBLElBQUlDO0FBQ0osSUFBSUM7QUFFSixJQUFJLENBQUNMLEtBQUs7SUFDVCxNQUFNLElBQUlNLE1BQU0sK0JBQStCO0FBQ2hELENBQUM7QUFFRCxJQUFJQyxJQUFzQyxFQUFFO0lBQzNDLElBQUksQ0FBQ0MsT0FBT0MsbUJBQW1CLEVBQUU7UUFDaENMLFNBQVMsSUFBSUwsZ0RBQVdBLENBQUNDLEtBQUtDO1FBQzlCTyxPQUFPQyxtQkFBbUIsR0FBR0wsT0FBT00sT0FBTztJQUM1QyxDQUFDO0lBRURMLGdCQUFnQkcsT0FBT0MsbUJBQW1CO0FBQzNDLE9BQU8sRUFHTjtBQUVELGlFQUFlSixhQUFhQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWlvLWNwLy4vbGliL21vbmdvZGIuanM/ZDkyMCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtb25nb2RiLmpzXG5cbmltcG9ydCB7IE1vbmdvQ2xpZW50IH0gZnJvbSBcIm1vbmdvZGJcIjtcblxuY29uc3QgdXJpID0gXCJtb25nb2RiK3NydjovL2NhcnBhc2d1YWphcmRvOmNhcnBhc2d1YWphcmRvMjAyM0BjbHVzdGVyY2FycGFzZ3VhamFyZG8ub3g0cDV3Yy5tb25nb2RiLm5ldC9jYXJwYXMtZ3VhamFyZG8tZGI/cmV0cnlXcml0ZXM9dHJ1ZSZ3PW1ham9yaXR5XCI7XG5jb25zdCBvcHRpb25zID0ge1xuXHR1c2VVbmlmaWVkVG9wb2xvZ3k6IHRydWUsXG5cdHVzZU5ld1VybFBhcnNlcjogdHJ1ZVxufTtcblxubGV0IGNsaWVudDtcbmxldCBjbGllbnRQcm9taXNlO1xuXG5pZiAoIXVyaSkge1xuXHR0aHJvdyBuZXcgRXJyb3IoXCJBZGQgTW9uZ28gVVJJIHRvIC5lbnYubG9jYWxcIik7XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiKSB7XG5cdGlmICghZ2xvYmFsLl9tb25nb0NsaWVudFByb21pc2UpIHtcblx0XHRjbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodXJpLCBvcHRpb25zKTtcblx0XHRnbG9iYWwuX21vbmdvQ2xpZW50UHJvbWlzZSA9IGNsaWVudC5jb25uZWN0KCk7XG5cdH1cblxuXHRjbGllbnRQcm9taXNlID0gZ2xvYmFsLl9tb25nb0NsaWVudFByb21pc2U7XG59IGVsc2Uge1xuXHRjbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodXJpLCBvcHRpb25zKTtcblx0Y2xpZW50UHJvbWlzZSA9IGNsaWVudC5jb25uZWN0KCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsaWVudFByb21pc2U7XG4iXSwibmFtZXMiOlsiTW9uZ29DbGllbnQiLCJ1cmkiLCJvcHRpb25zIiwidXNlVW5pZmllZFRvcG9sb2d5IiwidXNlTmV3VXJsUGFyc2VyIiwiY2xpZW50IiwiY2xpZW50UHJvbWlzZSIsIkVycm9yIiwicHJvY2VzcyIsImdsb2JhbCIsIl9tb25nb0NsaWVudFByb21pc2UiLCJjb25uZWN0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/mongodb.js\n");

/***/ }),

/***/ "(api)/./pages/api/contacts.js":
/*!*******************************!*\
  !*** ./pages/api/contacts.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/mongodb */ \"(api)/./lib/mongodb.js\");\n\n\nasync function handler(req, res) {\n    const client = await _lib_mongodb__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n    const db = client.db(\"carpas-guajardo-db\");\n    switch(req.method){\n        case \"POST\":\n            let bodyObject = req.body;\n            let miEvento = await db.collection(\"contacts\").insertOne(bodyObject);\n            res.json(miEvento);\n            break;\n        case \"GET\":\n            const allEventos = await db.collection(\"contacts\").find({}).toArray();\n            res.json({\n                status: 200,\n                data: allEventos\n            });\n            break;\n        case \"DELETE\":\n            const { id  } = req.query;\n            if (!id) {\n                return res.status(200).send({\n                    message: \"El id del objeto es obligatorio\"\n                });\n            }\n            const deleteEvento = await db.collection(\"contacts\").deleteOne({\n                _id: new mongodb__WEBPACK_IMPORTED_MODULE_0__.ObjectId(id.toString())\n            });\n            return res.status(200).send({\n                message: \"Elemento eliminado exitosamente\",\n                query: id,\n                response: deleteEvento\n            });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvY29udGFjdHMuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFtQztBQUNXO0FBRS9CLGVBQWVFLFFBQVFDLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQzVDLE1BQU1DLFNBQVMsTUFBTUosb0RBQWFBO0lBQ2xDLE1BQU1LLEtBQUtELE9BQU9DLEVBQUUsQ0FBQztJQUNyQixPQUFRSCxJQUFJSSxNQUFNO1FBQ2QsS0FBSztZQUNELElBQUlDLGFBQWFMLElBQUlNLElBQUk7WUFDekIsSUFBSUMsV0FBVyxNQUFNSixHQUFHSyxVQUFVLENBQUMsWUFBWUMsU0FBUyxDQUFDSjtZQUN6REosSUFBSVMsSUFBSSxDQUFDSDtZQUNULEtBQU07UUFDVixLQUFLO1lBQ0QsTUFBTUksYUFBYSxNQUFNUixHQUFHSyxVQUFVLENBQUMsWUFBWUksSUFBSSxDQUFDLENBQUMsR0FBR0MsT0FBTztZQUNuRVosSUFBSVMsSUFBSSxDQUFDO2dCQUFFSSxRQUFRO2dCQUFLQyxNQUFNSjtZQUFXO1lBQ3pDLEtBQU07UUFDVixLQUFLO1lBQ0QsTUFBTSxFQUFFSyxHQUFFLEVBQUUsR0FBR2hCLElBQUlpQixLQUFLO1lBRXhCLElBQUcsQ0FBQ0QsSUFBRztnQkFDSCxPQUFPZixJQUFJYSxNQUFNLENBQUMsS0FBS0ksSUFBSSxDQUFDO29CQUN4QkMsU0FBUztnQkFDYjtZQUNKLENBQUM7WUFFRCxNQUFNQyxlQUFlLE1BQU1qQixHQUFHSyxVQUFVLENBQUMsWUFBWWEsU0FBUyxDQUFDO2dCQUFDQyxLQUFLLElBQUl6Qiw2Q0FBUUEsQ0FBQ21CLEdBQUdPLFFBQVE7WUFBRztZQUVoRyxPQUFPdEIsSUFBSWEsTUFBTSxDQUFDLEtBQUtJLElBQUksQ0FBQztnQkFDeEJDLFNBQVM7Z0JBQ1RGLE9BQU9EO2dCQUNQUSxVQUFVSjtZQUNkO0lBQ1I7QUFDSixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWlvLWNwLy4vcGFnZXMvYXBpL2NvbnRhY3RzLmpzPzQxMGMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JqZWN0SWQgfSBmcm9tIFwibW9uZ29kYlwiO1xuaW1wb3J0IGNsaWVudFByb21pc2UgZnJvbSBcIi4uLy4uL2xpYi9tb25nb2RiXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBjbGllbnRQcm9taXNlO1xuICAgIGNvbnN0IGRiID0gY2xpZW50LmRiKFwiY2FycGFzLWd1YWphcmRvLWRiXCIpO1xuICAgIHN3aXRjaCAocmVxLm1ldGhvZCkge1xuICAgICAgICBjYXNlIFwiUE9TVFwiOlxuICAgICAgICAgICAgbGV0IGJvZHlPYmplY3QgPSByZXEuYm9keTtcbiAgICAgICAgICAgIGxldCBtaUV2ZW50byA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJjb250YWN0c1wiKS5pbnNlcnRPbmUoYm9keU9iamVjdCk7XG4gICAgICAgICAgICByZXMuanNvbihtaUV2ZW50byk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkdFVFwiOlxuICAgICAgICAgICAgY29uc3QgYWxsRXZlbnRvcyA9IGF3YWl0IGRiLmNvbGxlY3Rpb24oXCJjb250YWN0c1wiKS5maW5kKHt9KS50b0FycmF5KCk7XG4gICAgICAgICAgICByZXMuanNvbih7IHN0YXR1czogMjAwLCBkYXRhOiBhbGxFdmVudG9zIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJERUxFVEVcIjpcbiAgICAgICAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5xdWVyeVxuXG4gICAgICAgICAgICBpZighaWQpe1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdFbCBpZCBkZWwgb2JqZXRvIGVzIG9ibGlnYXRvcmlvJyxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBkZWxldGVFdmVudG8gPSBhd2FpdCBkYi5jb2xsZWN0aW9uKFwiY29udGFjdHNcIikuZGVsZXRlT25lKHtfaWQ6IG5ldyBPYmplY3RJZChpZC50b1N0cmluZygpKX0pXG5cbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuc2VuZCh7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ0VsZW1lbnRvIGVsaW1pbmFkbyBleGl0b3NhbWVudGUnLFxuICAgICAgICAgICAgICAgIHF1ZXJ5OiBpZCxcbiAgICAgICAgICAgICAgICByZXNwb25zZTogZGVsZXRlRXZlbnRvXG4gICAgICAgICAgICB9KVxuICAgIH1cbn0iXSwibmFtZXMiOlsiT2JqZWN0SWQiLCJjbGllbnRQcm9taXNlIiwiaGFuZGxlciIsInJlcSIsInJlcyIsImNsaWVudCIsImRiIiwibWV0aG9kIiwiYm9keU9iamVjdCIsImJvZHkiLCJtaUV2ZW50byIsImNvbGxlY3Rpb24iLCJpbnNlcnRPbmUiLCJqc29uIiwiYWxsRXZlbnRvcyIsImZpbmQiLCJ0b0FycmF5Iiwic3RhdHVzIiwiZGF0YSIsImlkIiwicXVlcnkiLCJzZW5kIiwibWVzc2FnZSIsImRlbGV0ZUV2ZW50byIsImRlbGV0ZU9uZSIsIl9pZCIsInRvU3RyaW5nIiwicmVzcG9uc2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/contacts.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/contacts.js"));
module.exports = __webpack_exports__;

})();