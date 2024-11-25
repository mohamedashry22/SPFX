var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import ReskillingProgram from './components/ReskillingProgram';
import { getSP } from '../..';
var ReskillingProgramWebPart = /** @class */ (function (_super) {
    __extends(ReskillingProgramWebPart, _super);
    function ReskillingProgramWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReskillingProgramWebPart.prototype.render = function () {
        var element = React.createElement(ReskillingProgram, {
            context: this.context,
        });
        var container = this.domElement;
        ReactDOM.render(element, container);
    };
    ReskillingProgramWebPart.prototype.onDispose = function () {
        ReactDOM.unmountComponentAtNode(this.domElement);
    };
    ReskillingProgramWebPart.prototype.onInit = function () {
        getSP(this.context);
        return _super.prototype.onInit.call(this);
    };
    return ReskillingProgramWebPart;
}(BaseClientSideWebPart));
export default ReskillingProgramWebPart;
//# sourceMappingURL=ReskillingProgramWebPart.js.map