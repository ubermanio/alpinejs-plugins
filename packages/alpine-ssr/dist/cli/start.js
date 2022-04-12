"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.start = void 0;
var isomorphic_unfetch_1 = __importDefault(require("isomorphic-unfetch"));
var path_1 = __importDefault(require("path"));
// import glob from 'fast-glob'
var promises_1 = __importDefault(require("fs/promises"));
var jsdom_1 = require("jsdom");
var start = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var routesDir, index, alpine, html, dom;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('starting in', process.cwd(), 'with', options);
                routesDir = path_1["default"].join(process.cwd(), 'routes');
                return [4 /*yield*/, promises_1["default"].readFile(path_1["default"].join(routesDir, 'index.html'))];
            case 1:
                index = _a.sent();
                return [4 /*yield*/, promises_1["default"].readFile(path_1["default"].join(__dirname, '..', '..', 'alpine@3.9.5.min.js'))];
            case 2:
                alpine = _a.sent();
                html = "<!DOCTYPE html>\n  <head>\n    <script defer>".concat(alpine, "</script>\n  </head>\n  ").concat(index, "\n  ");
                dom = new jsdom_1.JSDOM(html, {
                    runScripts: 'dangerously',
                    resources: 'usable',
                    beforeParse: function (window) {
                        window.fetch = isomorphic_unfetch_1["default"];
                    }
                });
                console.time('domload');
                console.time('alpine');
                console.time('nexttick');
                dom.window.document.addEventListener('DOMContentLoaded', function () {
                    // console.log('loaded')
                    console.timeEnd('domload');
                    // setTimeout(() => {
                    //   console.log(dom.window.document.body.innerHTML)
                    // }, 5000)
                });
                dom.window.document.addEventListener('alpine:initialized', function () {
                    // console.log('initialized')
                    console.timeEnd('alpine');
                    dom.window.Alpine.nextTick(function () {
                        console.timeEnd('nexttick');
                        console.log(dom.window.document.body.innerHTML);
                    });
                });
                return [2 /*return*/];
        }
    });
}); };
exports.start = start;
/**
  routes = [
    ['index', []],
  ]


 */
// export default (options: CliOptions) => {
//   console.log('starting in', process.cwd())
// }
