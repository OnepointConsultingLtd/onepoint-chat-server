import { RelatedTopicsBody, Topics } from '../type/types';
import { MAX_RELATED_TOPICS } from './constants';
import { getServer } from './server';

export function createHeaders() {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJheml6aV9iYW5rIiwibmFtZSI6ImF6aXppX2JhbmsiLCJpYXQiOjE3NDk3NDU4NjUsImVtYWlsIjoibXVydGF6YS5oYXNzYW5pQG9uZXBvaW50bHRkLmNvbSJ9.xvKGivWBWqRc5e4iMSZ18Qls-YnpbCljYDfVF7s0zpiHFEMmOIQHkWOf9tc_cOhP7eKjeKdFE0tgM1g5vvMzfg`,
    },
  };
}

//  Error handling:
async function processError(response: Response) {
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ description: `HTTP error! status: ${response.status}` }));

    throw new Error(errorData.description || `HTTP error! status: ${response.status}`);
  }
}

export async function fetchRelatedTopics(lastSelectedTopic: string, text: string): Promise<Topics> {

  const url = `${getServer()}/project/related_topics?project=onepoint_v1&engine=lightrag`;

  const body: RelatedTopicsBody = {
    samples: 25000,
    path_length: 5,
    restart_prob: 0.15,
    runs: 5,
    limit: MAX_RELATED_TOPICS,
    source: lastSelectedTopic || '',
    text: text || '',
  };

  const response = await fetch(url, {
    method: 'POST',
    ...createHeaders(),
    body: JSON.stringify(body),
  });

  const data = await response.json();
  await processError(response);
  return data;
}
