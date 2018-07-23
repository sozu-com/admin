import { Http } from '@angular/http';
import * as CryptoJS from 'crypto-js';

export class S3Config {
    bucket: string;
    accessKey: string;
    secretAccessKey: string;
    region: string;
    folder: string;
}

export class S3Uploader {
    loading: boolean;
    private config: S3Config;
    private http: Http;

    init(http: Http, config: S3Config) {
      this.http = http;
      this.config = config;
    }

    upload(file: any, fileName): Promise<any> {
      const date = this.generateTimestamp();
      const datetime = date + 'T000000Z';

      this.config.bucket = 'hyrit';
      this.config.accessKey = 'AKIAIJJH4YRJ4VJUEM2Q';
      this.config.secretAccessKey = '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';
      this.config.region = 'ap-southeast-2';

      // this.config.bucket = 'cbdevs3';
      // this.config.accessKey = 'AKIAJNMP5L4BZ6S4LSFQ';
      // this.config.secretAccessKey = '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';
      // this.config.region = 'us-west-2';

      const credential = `${this.config.accessKey}/${date}/${this.config.region}/s3/aws4_request`;


      const policy = JSON.stringify({
        'expiration': (new Date(Date.now() + 100000)).toISOString(),
        'conditions': [
          {'bucket': this.config.bucket},
          ['starts-with', '$key', ''],
          {'acl': 'public-read'},
          ['starts-with', '$Content-Type', ''],
          {'x-amz-credential': credential},
          {'x-amz-algorithm': 'AWS4-HMAC-SHA256'},
          {'x-amz-date': datetime}
        ]
      });

      const policyBase64 = window.btoa(policy);
      const signatureKey = this.generateSignatureKey(this.config.secretAccessKey, date, this.config.region, 's3');
      const signature = CryptoJS.HmacSHA256(policyBase64, signatureKey).toString(CryptoJS.enc.Hex);
      const formData = new FormData();

      formData.append('acl', 'public-read');
      formData.append('Content-Type', file.type);
      formData.append('X-Amz-Date', datetime);
      formData.append('X-Amz-Algorithm', 'AWS4-HMAC-SHA256');
      formData.append('X-Amz-Credential', credential);
      formData.append('X-Amz-Signature', signature);
      formData.append('Policy', policyBase64);
      formData.append('key', fileName);
      formData.append('file', file);

      return new Promise((resolve, reject) => {
        this.http.post(`https://s3-ap-southeast-2.amazonaws.com/${this.config.bucket}/`, formData).subscribe(x => {
        console.log('sucesss');
        resolve(x.headers.get('Location'));

        }, x => {
          console.log('error');
          reject();
        });
      });
    }

    generateSignatureKey(key, dateStamp, regionName, serviceName) {
      const kDate = CryptoJS.HmacSHA256(dateStamp, 'AWS4' + key);
      const kRegion = CryptoJS.HmacSHA256(regionName, kDate);
      const kService = CryptoJS.HmacSHA256(serviceName, kRegion);
      const kSigning = CryptoJS.HmacSHA256('aws4_request', kService);

      return kSigning;
    }

    generateTimestamp() {
      const date = new Date();
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return year + month + day;
    }
}
