## install npm package
`npm install ngbox@latest -i`


##github
[Source Code](https://github.com/mixalistzikas/ngbox)

## app.module.ts

Add the following imports to your app.module.ts

`import { NgBoxModule } from 'ngbox/ngbox.module'`;

`import { NgBoxService } from 'ngbox/ngbox.service'`;

`import { CommonModule } from '@angular/common'`;

Add to imports `NgBoxModule, BrowserModule, CommonModule`

Add to services `NgBoxService`

## app.component.html

Add this at the top `<ngbox></ngbox>` of your root html file.

## ngBox

Add `ng-box` to your image or to your links. The required param is `src` or `href`

## Demo url

[Demo](http://ngmodules.eu/)

## Examples

`<p><a href="http://placehold.it/500x500?text=Image 1.1" [image]="true" title="Image 1.1" ng-box>Image 1.1</a></p>`

`<p><a href="http://placehold.it/500x500?text=Image 1.2" [image]="true" title="Image 1.2" ng-box>Image 1.2</a></p>`

`<p><a href="http://placehold.it/500x500?text=Image 1.3" [image]="true" title="Image 1.3" ng-box>Image 1.3</a></p>`

`<h4>Videos</h4>`
`<p><a href="" ng-box group="videos" href="https://www.youtube.com/embed/L3wKzyIN1yk" title="Video Youtube">Youtube.com</a></p>`

`<p><a href="" ng-box group="videos" src="https://vimeo.com/43338103">Vimeo.com</a></p>`

## Attributes
 `src` or `href` (The source file/video/link as a string)
 
 `[src]` or `[href]` (The source file/video/link as a variable)
 
 
 `group="myGroup"` (grouping as a string)
 
 `[group]="group"` (grouping as a variable)
 
 `[image]="true"` (if the path or the source has .jpg or .png it will open automatically, if not then you need to specify that this source is an image)
 
 `[width]="800" [height]="800"`
 
 `title="This is a title"`
 
 `[cache]="true"` (if you want to preload an image)