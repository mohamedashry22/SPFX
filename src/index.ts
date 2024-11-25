import '@pnp/sp/presets/all';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi, SPFI, SPFx } from '@pnp/sp';

let sp: SPFI;

export const getSP = (context?: WebPartContext): SPFI => {
    console.log("logggggs", context)
  if (sp === undefined && context !== undefined) {
    sp = spfi().using(SPFx(context));
  }
  return sp;
};