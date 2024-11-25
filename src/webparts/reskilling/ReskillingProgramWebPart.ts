import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import ReskillingProgram from './components/ReskillingProgram';
import { getSP } from '../..';

export default class ReskillingProgramWebPart extends BaseClientSideWebPart<{}> {
  public render(): void {
    const element: React.ReactElement = React.createElement(ReskillingProgram, {
      context: this.context,
    });

    const container: HTMLElement = this.domElement;
    ReactDOM.render(element, container);
  }

  protected onDispose(): void {

    ReactDOM.unmountComponentAtNode(this.domElement);
  }

  protected onInit(): Promise<void> {
    getSP(this.context);
    return super.onInit();
  }
}