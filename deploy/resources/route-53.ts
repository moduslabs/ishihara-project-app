import { Stack } from 'aws-cdk-lib';
import { CloudFrontWebDistribution } from 'aws-cdk-lib/aws-cloudfront';
import { ARecord, HostedZone, IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { getAPPDomain, getCdkConfiguration, getResourceName } from '../utils';

export interface NetworkSchema {
  hostedZone: IHostedZone;
  appARecord: ARecord;
}

export function getHostedZone(stack: Stack): IHostedZone {
  const { zoneName, hostedZoneId } = getCdkConfiguration();
  return HostedZone.fromHostedZoneAttributes(stack, getResourceName('hosted-zone'), {
    zoneName,
    hostedZoneId,
  });
}

export function getHostedZoneRecords(stack: Stack, hostedZone: IHostedZone, distribution: CloudFrontWebDistribution): NetworkSchema {
  const appDomain = getAPPDomain();

  const appARecord = new ARecord(stack, getResourceName('webapp-arecord'), {
    recordName: appDomain,
    target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    zone: hostedZone,
  });

  return {
    hostedZone,
    appARecord,
  };
}
