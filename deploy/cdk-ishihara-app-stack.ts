import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { capitalize, getNamespace } from "./utils";
import { getHTTPSCertificate } from "./resources/certificate-dns";
import { getHostedZone, getHostedZoneRecords } from "./resources/route-53";
import { getWebappResources } from "./resources/cloud-front-distribution";

export class CdkIshiharaAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const hostedZone = getHostedZone(this);
    const certificate = getHTTPSCertificate(this, hostedZone);
    const { cloudFrontDistribution } = getWebappResources(this, certificate);
    getHostedZoneRecords(this, hostedZone, cloudFrontDistribution);
  }
}

const app = new cdk.App();

new CdkIshiharaAppStack(app, `CdkIshiharaAppStack${capitalize(getNamespace())}`, {
  synthesizer: new cdk.DefaultStackSynthesizer({
    qualifier: process.env.QUALIFIER || 'local',
  }),
});
