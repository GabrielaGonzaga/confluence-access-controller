import axios from 'axios';

const DIRECTORY_ID = 'paranoa-team-c74wxch0';
const CONFLUENCE_EMAIL = 'projetos@datawake.com.br'; 
const ATLASSIAN_API_HOST = 'https://api.atlassian.com';
const ATLASSIAN_DOMAIN = 'https://datawake.atlassian.net';

const BEARER_TOKEN = process.env.NEXT_PUBLIC_ATLASSIAN_LIFECYCLE_TOKEN!;
const USER_TOKEN = process.env.NEXT_PUBLIC_ATLASSIAN_USER_TOKEN!;

export const lifecycleApi = axios.create({
  baseURL: ATLASSIAN_API_HOST,
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const scimApi = axios.create({
  baseURL: `${ATLASSIAN_API_HOST}/scim/directory/${DIRECTORY_ID}`,
  headers: {
    Authorization: `Bearer ${USER_TOKEN}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const confluenceApi = axios.create({
  baseURL: `${ATLASSIAN_DOMAIN}/wiki/rest/api`,
  headers: {
    Authorization: `Basic ${Buffer.from(`${CONFLUENCE_EMAIL}:${USER_TOKEN}`).toString('base64')}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
