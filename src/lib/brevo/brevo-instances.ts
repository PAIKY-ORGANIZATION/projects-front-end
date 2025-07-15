import {TransactionalEmailsApi, TransactionalEmailsApiApiKeys, TransactionalSMSApi, TransactionalSMSApiApiKeys} from '@getbrevo/brevo'

export const brevoEmailApiInstance = new TransactionalEmailsApi()
brevoEmailApiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!)

export const brevoSmsApiInstance = new TransactionalSMSApi()
brevoSmsApiInstance.setApiKey(TransactionalSMSApiApiKeys.apiKey, process.env.BREVO_API_KEY!)