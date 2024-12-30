import { Injectable } from '@angular/core';

// Declare MathJax as a global variable so that it can be used in this TypeScript file
declare global {
    interface Window {
        MathJax: {
            typesetPromise: () => void;
            startup: {
                promise: Promise<any>;
            };
        };
    }
}

@Injectable({
    providedIn: 'root'
})
export class MathJaxService {

    // A variable to check if MathJax was successfully loaded
    private mathJaxLoaded: Promise<void>;

    // Configure which MathJax version we want
    private mathJax: any = {
        source: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js',
    }

    constructor() {
        // TODO isn't this a kind of duplicate for later code?
        this.mathJaxLoaded = this.loadMathJax()
            .then(() => {
                console.log('MathJax loaded');
            })
            .catch((err) => {
                console.log('MathJax failed to load', err);
                // Fallback strategy in case the load doesn't succeed, e.g. load from local file
            });
    }

    // This method is used by the MathJaxDirective to check if MathJax is loaded
    public getMathJaxLoadedPromise(): Promise<void> {
        return this.mathJaxLoaded;
    }

    private async loadMathJax(): Promise<any> {
        return new Promise((resolve, reject) => {
            const script: HTMLScriptElement = document.createElement('script');
            script.type = 'text/javascript';
            script.src = this.mathJax.source;
            script.async = true;

            // Once the script is loaded, resolve the promise
            script.onload = () => {
                resolve("MathJax loaded")
            };

            // If there's an error, reject the promise
            script.onerror = () => {
                reject("Error loading MathJax");
            }

            document.head.appendChild(script); // Append the script to start loading it
        });
    }

    render() {
        /*
        * This method is used to render the math inside an element
         */
        window.MathJax.startup.promise.then(() => {

            // console.log('Typesetting LaTex');

            window.MathJax.typesetPromise();
        });
    }
}