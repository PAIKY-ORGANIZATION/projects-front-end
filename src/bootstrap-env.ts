//$ this will get loaded from next.config.ts

//! This needs to be in its own file and imported before anything that will use environment variables.

import dotenv from 'dotenv';

dotenv.config({ path: `config/${process.env.ENVIRONMENT}.env` }); //* Defined in npm script

dotenv.config({path: 'config/shared.env'}) 

const requiredVars = [
    //* These come from ../shared/
    "AWS_BUCKET_REGION",
    "AWS_ACCESS_KEY",
    "AWS_BUCKET_NAME",
    "AWS_SECRET_ACCESS_KEY",
    "REDIS_HOST",
    "REDIS_PORT",
    "BREVO_API_KEY"
];

requiredVars.forEach((varName) => {
	if (!process.env[varName]) {
		throw new Error(`Missing environment variable: ${varName}`);
	}
});