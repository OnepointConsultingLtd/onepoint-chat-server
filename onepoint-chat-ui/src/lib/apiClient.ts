import { RelatedTopicsBody, Topics } from '../type/types';
import { MAX_RELATED_TOPICS, ONE_TIME_TOKEN } from './constants';
import { getServer } from './server';

export function createHeaders() {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ONE_TIME_TOKEN}`,
    },
  };
}

//  Error handling:
async function processError(response: Response) {
  if (!response.ok) {
    let errorText = `HTTP error! status: ${response.status}`;

    try {
      const errorData = await response.json();
      errorText =
        errorData.description ||
        errorData.error ||
        JSON.stringify(errorData) ||
        errorText;
    } catch (e) {
      console.log('e', e);
    }

    throw new Error(errorText);
  }
}


export async function fetchRelatedTopics(selectedTopic: string, text: string): Promise<Topics> {
  const url = `${getServer()}/project/related_topics?project=onepoint_v1&engine=lightrag`;

  const body: RelatedTopicsBody = {
    samples: 25000,
    path_length: 5,
    restart_prob: 0.15,
    runs: 5,
    limit: MAX_RELATED_TOPICS,
    source: selectedTopic || '',
    text: text.trim() || '',
  };


  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ONE_TIME_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  console.log("the url", url)

  await processError(response);
  const data = await response.json();
  return data;
}
