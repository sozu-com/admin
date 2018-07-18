export class GeneralFunctions {

  generateRandomString(){
    var min = 1111111111;
    var max = 9999999999;
    let date3 = new Date();
    return 'img_'+date3.getUTCMilliseconds()+Math.floor(Math.random()*(max-min+1)+min);
  }
  
}