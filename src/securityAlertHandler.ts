export const labels = 'secret detected'

export async function createIssue(context: any) {
  const alert = context.payload.alert

  if (alert.push_protection_bypassed == true) {

    const repo = context.payload.repository.name
    const repo_fullname = context.payload.repository.full_name
    const owner = context.payload.repository.owner.login
    const title = `Secret detected in ${repo_fullname}`

    const body = `#### Secret detected 
      \n- Type: ${alert.secret_type} 
      \n- Bypassed at: ${alert.push_protection_bypassed_at}
      \n- Bypassed by: @${alert.push_protection_bypassed_by.login}
      \n- ${ alert.html_url }
      \n#### Remediation tasks:
      \n- Revoke the secret and remove from the repository. Ref: [Revoke Secret article](https://docs.github.com/en/github/administering-a-repository/about-secret-scanning#remediation-tasks)`

      await context.octokit.request('POST /repos/{owner}/{repo}/issues', {
      owner: owner,
      repo: repo,
      title: title,
      body: body,
      labels: [ labels ]
    })
  } 
}
