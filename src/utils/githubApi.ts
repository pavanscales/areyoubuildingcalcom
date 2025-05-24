// utils/githubApi.ts

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

async function fetchWithAuth(url: string) {
  const res = await fetch(url, {
    headers: {
      Authorization: GITHUB_TOKEN ? `token ${GITHUB_TOKEN}` : '',
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch from ${url}: ${res.status}`);
  return res.json();
}

export async function fetchCalcomPRs() {
  return fetchWithAuth('https://api.github.com/repos/calcom/cal.com/pulls?state=all&per_page=10');
}

export async function fetchCalcomIssues() {
  return fetchWithAuth('https://api.github.com/repos/calcom/cal.com/issues?state=all&per_page=10');
}

export async function fetchCalcomCommits() {
  return fetchWithAuth('https://api.github.com/repos/calcom/cal.com/commits?per_page=10');
}
