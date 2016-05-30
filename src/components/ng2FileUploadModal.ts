import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {MODAL_DIRECTIVES} from 'ng2-bs3-modal/ng2-bs3-modal';
import {FILE_UPLOAD_DIRECTIVES, FileUploader, FileItem} from 'ng2-file-upload/ng2-file-upload';

@Component({
    selector: 'ng2-file-upload-modal',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, MODAL_DIRECTIVES, FILE_UPLOAD_DIRECTIVES],
    template: `
        <a class="uploadButton" (click)="modal.open()">Upload</a>
        <modal #modal [backdrop]="'static'" (onClose)="clear()" (onDismiss)="clear()">
            <modal-header>
                <h4 class="modal-title">{{title}}</h4>
            </modal-header>
            <modal-body>
                <div *ngIf="status >= 400" class="alert alert-danger">
                    <div class="fa fa-times-circle fa-lg alert-icon"></div>
                    <div class="alert-text">Could not upload file.</div>
                </div>
                <div ng2FileDrop *ngIf="status < 400"
                    [ngClass]="{'nv-file-over': hasBaseDropZoneOver}"
                    (fileOver)="fileOverBase($event)"
                    [uploader]="uploader"
                    class="well my-drop-zone text-center">
                        <input type="file" id="upload" name="upload" class="inputFile" ng2FileSelect [uploader]="uploader"/>
                        <label for="upload"><a>Drag and drop files or click here to select</a></label>
                </div>
                <div *ngIf="uploader.queue.length > 0 && status < 400">
                    <div>{{getFile().file.name}}</div>
                    <div class="progress" style="margin-bottom: 0;">
                        <div class="progress-bar" role="progressbar" [ngStyle]="{ 'width': getFile().progress + '%' }"></div>
                    </div>
                </div>
            </modal-body>
            <modal-footer>
                <button type="button" class="btn btn-default" data-dismiss="modal" (click)="cancel()" *ngIf="status == 0">Cancel</button>
                <button type="button" class="btn btn-primary" (click)="getFile().upload()" [disabled]="uploader.queue.length == 0 || uploader.isUploading" *ngIf="status == 0" >Upload</button>
                <button type="button" class="btn btn-primary" (click)="modal.close()" *ngIf="status >= 200">Close</button>
            </modal-footer>
        </modal>
    `,
    styles: [`
        .uploadButton:hover {
            cursor: pointer;
        }

        .inputFile {
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;
        }

        .inputFile + label:hover {
            cursor: pointer;
        }

        .my-drop-zone {
            border: dashed 2px lightgray;
        }

        .nv-file-over {
            border: dashed 2px #e11b22;
        }
    `]
})
export class Ng2FileUploadModal {

    @Input('title') title: String;
    @Input('uploadUrl') uploadUrl: String;
    @Output('uploadStatus') uploadStatus = new EventEmitter();

    private uploader: FileUploader;
    private hasBaseDropZoneOver: boolean = false;
    private status: number = 0;

    ngOnInit() {
        this.title = this.title || 'Upload';

        this.uploader = new FileUploader({
            url: this.uploadUrl
        });

        this.uploader.onSuccessItem = this.uploadCallback.bind(this);
        this.uploader.onErrorItem = this.uploadCallback.bind(this);
    }

    private fileOverBase(e:any): void {
        this.hasBaseDropZoneOver = e;
    }

    private clear() {
        this.uploader.clearQueue();
        this.status = 0;
    }

    private cancel() {
        this.uploader.cancelAll();
    }

    /**
     * Get the current selected fileItem.
     *
     * @returns {any}
     */
    private getFile(): FileItem {
        return this.uploader.queue[this.uploader.queue.length - 1]; // Always use last item in queue
    }

    /**
     * File upload callback. Emit the status of the file upload action to the parent component.
     *
     * @param item
     * @param response
     * @param status
     * @param headers
     */
    private uploadCallback(item: any, response: any, status: any, headers: any): void {
        this.status = status;
        this.uploadStatus.emit({status: status});
    }

}