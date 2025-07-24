import { Topics } from '../type/types';
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

//   Error handling:
async function processError(response: Response) {
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ description: `HTTP error! status: ${response.status}` }));

    throw new Error(errorData.description || `HTTP error! status: ${response.status}`);
  }
}

// TODO: Remove this function later.
export async function fetchTopics(topic: string, limit: number = 4): Promise<Topics> {
  const params = new URLSearchParams();
  params.set('project', 'onepoint_v1');
  params.set('engine', 'lightrag');
  params.set('limit', `${limit}`);
  params.set('add_questions', 'false');
  params.set('entity_type_filter', 'category');
  params.set('topic', topic);
  const response = await fetch(
    `${getServer()}/project/topics?${params.toString()}`,
    createHeaders()
  );
  await processError(response);
  return (await response.json()) as Topics;
}

export async function fetchRelatedTopics(lastSelectedTopic: string, text: string): Promise<Topics> {
  // Query params
  const url = `${getServer()}/project/related_topics?project=onepoint_v1&engine=lightrag`;

  type RelatedTopicsBody = {
    samples: number;
    path_length: number;
    restart_prob: number;
    runs: number;
    limit: number;
    source?: string;
    text?: string;
  };

  // Body params
  const body: RelatedTopicsBody = {
    samples: 25000,
    path_length: 5,
    restart_prob: 0.15,
    runs: 5,
    limit: MAX_RELATED_TOPICS,
    source: lastSelectedTopic || '',
    text: text || '',
  };

  console.log('fetchRelatedTopics POST', { url, body });

  const response = await fetch(url, {
    method: 'POST',
    ...createHeaders(),
    body: JSON.stringify(body),
  });

  const data = await response.json();
  console.log('The data is ->: ', data);
  await processError(response);
  return data;
}
