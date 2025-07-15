import {TransactionalEmailsApi, TransactionalEmailsApiApiKeys} from '@getbrevo/brevo'

export const brevoApiInstance = new TransactionalEmailsApi()

brevoApiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!)