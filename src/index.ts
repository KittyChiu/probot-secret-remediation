import { Probot } from 'probot'
import { createIssue } from './securityAlertHandler'

export = (app: Probot) => {
  app.log.info("secret_scanning_alert.created detected!");
  app.on('secret_scanning_alert.created', async context => createIssue(context))
}

