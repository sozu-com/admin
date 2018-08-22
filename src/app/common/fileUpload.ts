export class FileUpload {

    url: any[];
    image1;

    onSelectFile(event): any { // called each time file input changes
        if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
            this.url = e.target.result;
            console.log('this.url, this.image1', this.url, this.image1);
        };

        reader.onloadend = (e1: any) => {
            console.log('onloadend', this.url);
            return this.url;
        };

        // this.model.cover_image = event.target.files[0];
        reader.readAsDataURL(event.target.files[0]);
        // return this.url;
        }
    }
}
