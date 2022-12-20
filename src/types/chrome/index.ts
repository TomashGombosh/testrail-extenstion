/* eslint-disable no-unused-vars */
export enum Sender {
    React,
    Content
}

export interface ChromeMessage {
    from: Sender,
    message: any,
    additional?: string
}
