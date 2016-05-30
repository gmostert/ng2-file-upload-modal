import {Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Ng2FileUploadModal} from '/src/components/ng2FileUploadModal.js'; // load directly from src

@Component({
    selector: 'app',
    directives: [Ng2FileUploadModal],
    template: `
        <h1>Example of ng2-file-upload-modal</h1>
        <ng2-file-upload-modal
            title="Upload - Any File"
            [uploadUrl]="restUrl"
            (uploadStatus)="uploadCallback($event)">
        </ng2-file-upload-modal>
    `
})
export class App {

    public restUrl = "http:/localhost:9000/test";

    public uploadCallback(event) {
        console.log(event);
    }
}

bootstrap(App);