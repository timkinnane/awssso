# AWSSSO

Fetch short-term credentials for AWS SSO profiles, with simple account switching.

---

## Purpose

Some Node libraries like [Serverless Framework](https://www.serverless.com/) authenticate AWS SSO
accounts by loading from the Shared Credentials
File](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html)
and setting the active profile with environment variables. This is something of a legacy approach
compared to the AWS CLI which authenticates sessions with a simple `--profile` flag.

This package provides a process to leverage the AWS CLI to fetch short term credentials for all your
named SSO profiles, making it simple to switch between them and provide them to any NodeJS process.

## Credit

This is a NodeJS port of the Python utility [AWS SSO
Credentials](https://github.com/NeilJed/aws-sso-credentials) by [Neil
Jedrzejewski](https://github.com/NeilJed)

## Usage

TBC. Currently incomplete and not bundled as a binary for execution. Just use `yarn dev`.
