export class FileUpload {

    url: any[];
    url2 = [];
    tab: number;
    selectedGuest;
    image1;
    image2;
    image3;

    onSelectFile1(event) { // called each time file input changes
        if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
            this.url = e.target.result;
            console.log('this.url, this.image1', this.url, this.image1);
        };
        // this.model.cover_image = event.target.files[0];
        reader.readAsDataURL(event.target.files[0]);
        }
    }
}
