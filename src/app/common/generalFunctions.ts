export class GeneralFunctions {

  generateRandomString() {
    const min = 1111111111;
    const max = 9999999999;
    const date3 = new Date();
    return 'img_' + date3.getUTCMilliseconds() + Math.floor(Math.random() * (max - min + 1) + min);
  }

}

