import '@pnp/sp/presets/all';
import { spfi, SPFx } from '@pnp/sp';
var sp;
export var getSP = function (context) {
    console.log("logggggs", context);
    if (sp === undefined && context !== undefined) {
        sp = spfi().using(SPFx(context));
    }
    return sp;
};
//# sourceMappingURL=index.js.map