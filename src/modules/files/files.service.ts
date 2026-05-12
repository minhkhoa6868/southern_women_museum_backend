import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class FilesService {
  private s3: S3Client;
  private bucket: string;

  constructor() {
    const region =
      process.env.AWS_REGION ??
      process.env.AWS_DEFAULT_REGION ??
      process.env.S3_REGION ??
      'ap-southeast-1';
    this.bucket =
      process.env.S3_BUCKET_NAME ??
      process.env.S3_BUCKET ??
      process.env.AWS_BUCKET ??
      '';

    this.s3 = new S3Client({ region });
  }

  async getPresignedUrl(key: string, expiresIn = 3600): Promise<string> {
    if (!this.bucket) {
      throw new Error('S3 bucket not configured (S3_BUCKET_NAME)');
    }

    const cmd = new GetObjectCommand({ Bucket: this.bucket, Key: key });
    return getSignedUrl(this.s3, cmd, { expiresIn });
  }

  async getPresignedUrlForObject(
    obj?: string,
    expiresIn = 3600,
  ): Promise<string | undefined> {
    if (!obj || !this.bucket) return undefined;

    let key = obj;
    try {
      if (obj.startsWith('http')) {
        const u = new URL(obj);
        // S3 virtual-hosted URLs: {bucket}.s3.{region}.amazonaws.com/{key}
        // pathname is just "/{key}"
        key = u.pathname.replace(/^\//, '');
      }
    } catch {
      // leave key as provided
    }

    try {
      return await this.getPresignedUrl(key, expiresIn);
    } catch {
      return undefined;
    }
  }
}
