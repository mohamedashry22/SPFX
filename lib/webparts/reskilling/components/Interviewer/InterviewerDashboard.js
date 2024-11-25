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
import { getSP } from '../../../../index';
import { Config } from '../../config/config';
import InterviewForm from './InterviewForm';
var InterviewerDashboard = function (_a) {
    var context = _a.context;
    var _b = React.useState([]), interviews = _b[0], setInterviews = _b[1];
    var _c = React.useState(true), loading = _c[0], setLoading = _c[1];
    React.useEffect(function () {
        var fetchInterviews = function () { return __awaiter(void 0, void 0, void 0, function () {
            var sp, currentUser, userEmail, INTERVIEWS_LIST, items, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        sp = getSP(context);
                        return [4 /*yield*/, sp.web.currentUser()];
                    case 1:
                        currentUser = _a.sent();
                        userEmail = currentUser.Email;
                        INTERVIEWS_LIST = Config.LIST_NAMES.INTERVIEWS;
                        return [4 /*yield*/, sp.web.lists
                                .getByTitle(INTERVIEWS_LIST)
                                .items
                                .filter("InterviewerEmail eq '".concat(userEmail, "'"))
                                .select('Id', 'ParticipantId', 'ScheduledDate')()];
                    case 2:
                        items = _a.sent();
                        setInterviews(items);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error fetching interviews:', error_1);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchInterviews();
    }, [context]);
    if (loading) {
        return React.createElement("div", null, "Loading interviews...");
    }
    return (React.createElement("div", null,
        React.createElement("h1", null, "Interviewer Dashboard"),
        React.createElement("h2", null, "Your Scheduled Interviews"),
        interviews.length === 0 ? (React.createElement("p", null, "You have no scheduled interviews.")) : (React.createElement("ul", null, interviews.map(function (interview) { return (React.createElement("li", { key: interview.Id },
            "Participant ID: ",
            interview.ParticipantId,
            ", Scheduled Date:",
            ' ',
            new Date(interview.ScheduledDate).toLocaleDateString())); }))),
        React.createElement(InterviewForm, { context: context })));
};
export default InterviewerDashboard;
//# sourceMappingURL=InterviewerDashboard.js.map