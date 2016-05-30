# ng2-file-upload-modal

This angular 2 component adds a link to your html, that when clicked displays a modal with a file upload component.
It uses the [ng2-file-upload](https://github.com/valor-software/ng2-file-upload) component thats then added to the [ng2-bs3-modal](https://github.com/dougludlow/ng2-bs3-modal) component.
Even though the ng2-file-upload supports multiple files, this component is designed to cater for single file upload.

## Install

Install dependencies:

    npm install --save ng2-bs3-modal
    npm install --save ng2-file-upload
    
Install app:

    npm install --save ng2-file-upload-modal

## Usage

ng2-bs3-modal depends on bootstrap which depends on jquery, you'll need to include both scripts:

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.js"></script>

If you're using [SystemJS](https://github.com/systemjs/systemjs), add the below mappings for all the required dependencies.
For a production app these libraries needs to be loaded from a cdn location.

    System.config({
        defaultJSExtensions: true,
        map: {
            'ng2-bs3-modal': 'node_modules/ng2-bs3-modal',
            'ng2-file-upload': 'node_modules/ng2-file-upload',
            'ng2-file-upload-modal': 'node_modules/ng2-file-upload-modal'
        }
    });

Then import and include in your component:

    import {Ng2FileUploadModal} from 'ng2-file-upload-modal/ng2-file-upload-modal';

    @Component({
        directives: [Ng2FileUploadModal]
    })
    export class MyComponent {
        ...
    }

Add the directive to your html with the specified bindings:

    <ng2-file-upload-modal
        title="Your title"
        [uploadUrl]="yourRestUrl"
        (uploadStatus)="yourCallback($event)">
    </ng2-file-upload-modal>

## Config

The link that's added to your html can be styled using the 'uploadButton' css selector.

## Build

This component uses gulp to build itself. Run the 'build' task to build it locally.
The source is build in place, meaning that the typescript compiler produces js & d.ts files alongside the original ts files.
The 'bundle' task then outputs everything into a single js file located in bundles folder.

## Run

The 'play' task starts up a webserver and opens the app in your default browser.