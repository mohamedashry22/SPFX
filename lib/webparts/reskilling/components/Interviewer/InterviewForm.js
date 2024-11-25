var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { getSP } from '../../../../index';
import { Config } from '../../config/config';
var InterviewForm = function (_a) {
    var context = _a.context;
    var _b = useForm(), register = _b.register, handleSubmit = _b.handleSubmit, reset = _b.reset;
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var sp, currentUser, userEmail, INTERVIEWS_LIST, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    sp = getSP(context);
                    return [4 /*yield*/, sp.web.currentUser()];
                case 1:
                    currentUser = _a.sent();
                    userEmail = currentUser.Email;
                    INTERVIEWS_LIST = Config.LIST_NAMES.INTERVIEWS;
                    return [4 /*yield*/, sp.web.lists.getByTitle(INTERVIEWS_LIST).items.add({
                            ParticipantId: data.ParticipantId,
                            InterviewerEmail: userEmail,
                            ScheduledDate: data.ScheduledDate,
                            Outcome: data.Outcome,
                            Comments: data.Comments,
                        })];
                case 2:
                    _a.sent();
                    alert('Interview record added');
                    reset();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error adding interview:', error_1);
                    alert('Error adding interview');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", null,
        React.createElement("h2", null, "Add Interview Outcome"),
        React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
            React.createElement("div", null,
                React.createElement("label", null, "Participant ID"),
                React.createElement("input", __assign({ type: "number" }, register('ParticipantId', { required: true })))),
            React.createElement("div", null,
                React.createElement("label", null, "Scheduled Date"),
                React.createElement("input", __assign({ type: "date" }, register('ScheduledDate', { required: true })))),
            React.createElement("div", null,
                React.createElement("label", null, "Outcome"),
                React.createElement("select", __assign({}, register('Outcome', { required: true })),
                    React.createElement("option", { value: "" }, "Select"),
                    React.createElement("option", { value: "Passed" }, "Passed"),
                    React.createElement("option", { value: "Rejected" }, "Rejected"))),
            React.createElement("div", null,
                React.createElement("label", null, "Comments"),
                React.createElement("textarea", __assign({}, register('Comments')))),
            React.createElement("button", { type: "submit" }, "Submit Outcome"))));
};
export default InterviewForm;
//# sourceMappingURL=InterviewForm.js.map